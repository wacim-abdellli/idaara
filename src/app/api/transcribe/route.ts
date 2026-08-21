import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getGroqKey(): string {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim()) {
    return process.env.GROQ_API_KEY.trim();
  }
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/GROQ_API_KEY=["']?([^"'\r\n]+)/);
      if (match && match[1]) return match[1].trim();
    }
  } catch {}
  return '';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('file') as Blob | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    const apiKey = getGroqKey();
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    // Build FormData to send to Groq Whisper endpoint
    const groqFormData = new FormData();
    groqFormData.append('file', audioFile, 'recording.webm');
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('response_format', 'json');
    groqFormData.append('language', 'ar'); // Supports Arabic and Tunisian Derja seamlessly

    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: groqFormData,
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn('Groq Whisper API error:', groqRes.status, errText);
      return NextResponse.json({ error: 'Transcription failed', details: errText }, { status: groqRes.status });
    }

    const data = await groqRes.json();
    return NextResponse.json({
      success: true,
      text: data.text || '',
    });
  } catch (error) {
    console.error('Transcription route exception:', error);
    return NextResponse.json({ error: 'Internal transcription error', details: String(error) }, { status: 500 });
  }
}
