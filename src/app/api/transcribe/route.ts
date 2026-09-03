import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

// Maximum audio file size: 25 MB
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

/**
 * Validate audio binary header for accepted formats:
 * WebM/MKV (1a45dfa3), Ogg (4f676753), MP3 (494433 / fffb / fffa), WAV (RIFF: 52494646), M4A/MP4 (ftyp: 66747970), FLAC (664c6143)
 */
export function isValidAudioMagicBytes(headerBytes: Uint8Array): boolean {
  if (headerBytes.length < 4) return false;
  const hex = Array.from(headerBytes.slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toLowerCase();

  return (
    hex.startsWith('1a45dfa3') || // WebM / MKV
    hex.startsWith('4f676753') || // OggS
    hex.startsWith('494433') ||   // MP3 ID3
    hex.startsWith('fffb') ||     // MP3 frame sync
    hex.startsWith('fffa') ||     // MP3 frame sync
    hex.startsWith('52494646') || // RIFF (WAV)
    hex.startsWith('664c6143') || // FLAC ('fLaC')
    hex.includes('66747970')      // MP4 / M4A (ftyp)
  );
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check (max 30 transcription requests per minute per IP)
    const ip = getClientIp(req);
    if (!await checkRateLimit(ip, 30)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const formData = await req.formData();
    const rawFile = formData.get('file');

    if (!rawFile || typeof rawFile === 'string' || !(rawFile instanceof File)) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    const audioFile = rawFile;

    // ── Size guard ───────────────────────────────────────────────────────────
    if (audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25 MB.' },
        { status: 413 }
      );
    }

    // ── Audio Magic Bytes Validation ──────────────────────────────────────────
    const sliceBuf = await audioFile.slice(0, 16).arrayBuffer();
    if (!isValidAudioMagicBytes(new Uint8Array(sliceBuf))) {
      return NextResponse.json(
        { error: 'Invalid audio format. Supported formats: WebM, OGG, MP3, WAV, M4A, FLAC.' },
        { status: 415 }
      );
    }

    const apiKey = (process.env.GROQ_API_KEY || '').trim();
    if (!apiKey) {
      return NextResponse.json({ error: 'Transcription service not configured' }, { status: 503 });
    }

    // ── Forward to Groq Whisper ───────────────────────────────────────────────
    const groqFormData = new FormData();
    groqFormData.append('file', audioFile, 'recording.webm');
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('response_format', 'json');
    groqFormData.append(
      'prompt',
      'Idaara.tn, Tunisian administration, Derja, Français, Arabic, Passeport, Carte Grise, CIN, Timbres, Concours.'
    );

    // 30-second abort timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}` },
      body: groqFormData,
    });
    clearTimeout(timeoutId);

    if (!groqRes.ok) {
      console.error('[Transcribe] Groq error:', groqRes.status);
      return NextResponse.json(
        { error: 'Audio transcription failed at upstream service.' },
        { status: groqRes.status >= 500 ? 502 : groqRes.status }
      );
    }

    const data = await groqRes.json();
    return NextResponse.json({ text: data.text || '' });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Audio processing timed out.' }, { status: 504 });
    }
    console.error('[Transcribe API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
