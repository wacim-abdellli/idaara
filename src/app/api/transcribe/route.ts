import { NextRequest, NextResponse } from 'next/server';

// Maximum audio file size: 25 MB
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawFile = formData.get('file');

    if (!rawFile || typeof rawFile === 'string') {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    const audioFile = rawFile as File;

    // ── Size guard ───────────────────────────────────────────────────────────
    if (audioFile.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25 MB.' },
        { status: 413 }
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
      return NextResponse.json({ error: 'Transcription failed. Please try again.' }, { status: groqRes.status });
    }

    const data = await groqRes.json();
    return NextResponse.json({ success: true, text: data.text || '' });
  } catch (error: unknown) {
    const isAbort = error instanceof Error && error.name === 'AbortError';
    console.error('[Transcribe] Fatal:', error);
    return NextResponse.json(
      { error: isAbort ? 'Transcription timed out. Try a shorter recording.' : 'Internal transcription error.' },
      { status: 500 }
    );
  }
}
