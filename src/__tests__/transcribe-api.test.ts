/**
 * Transcribe API Route — Unit Tests
 * Tests audio file validation, magic byte gating, size limits, and Groq upstream handling.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/transcribe/route';

function makeAudioFileWithHeader(header: number[], size = 256, name = 'audio.webm', type = 'audio/webm'): File {
  const buf = new Uint8Array(size);
  for (let i = 0; i < header.length; i++) {
    buf[i] = header[i];
  }
  return new File([buf], name, { type });
}

describe('/api/transcribe route — audio input validation & pipeline', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('rejects request with no file attached with HTTP 400', async () => {
    const fd = new FormData();
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('Audio file is required');
  });

  it('rejects string payload instead of File with HTTP 400', async () => {
    const fd = new FormData();
    fd.append('file', 'not-a-file-just-a-string');
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('Audio file is required');
  });

  it('rejects files exceeding 25 MB limit with HTTP 413', async () => {
    // 26 MB file
    const hugeFile = new File([new Uint8Array(26 * 1024 * 1024)], 'huge.webm', { type: 'audio/webm' });
    const fd = new FormData();
    fd.append('file', hugeFile);
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(413);
    const json = await res.json();
    expect(json.error).toContain('25 MB');
  });

  it('rejects invalid audio format / bad magic bytes with HTTP 415', async () => {
    // Text file header disguised as audio
    const badFile = makeAudioFileWithHeader([0x48, 0x65, 0x6c, 0x6c], 128, 'bad.webm', 'audio/webm');
    const fd = new FormData();
    fd.append('file', badFile);
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(415);
    const json = await res.json();
    expect(json.error).toContain('Invalid audio format');
  });

  it('validates audio magic bytes and returns 503 if GROQ_API_KEY is not configured', async () => {
    delete process.env.GROQ_API_KEY;
    // WebM magic bytes: 0x1a, 0x45, 0xdf, 0xa3
    const webmFile = makeAudioFileWithHeader([0x1a, 0x45, 0xdf, 0xa3], 128, 'rec.webm', 'audio/webm');
    const fd = new FormData();
    fd.append('file', webmFile);
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    // Size & magic byte validation passed; failed only at unconfigured upstream key
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toContain('Transcription service not configured');
  });

  it('transcribes valid audio stream when GROQ_API_KEY is present and service responds', async () => {
    process.env.GROQ_API_KEY = 'gsk_test_fake_key_12345';

    // Mock global fetch for Groq Whisper endpoint
    const mockGroqResponse = { text: 'Billehi n7eb na3ref chnowa wra9 el passeport' };
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockGroqResponse,
    } as Response);

    // WebM magic bytes: 0x1a, 0x45, 0xdf, 0xa3
    const webmFile = makeAudioFileWithHeader([0x1a, 0x45, 0xdf, 0xa3], 256, 'voice.webm', 'audio/webm');
    const fd = new FormData();
    fd.append('file', webmFile);
    const req = new NextRequest('http://localhost/api/transcribe', {
      method: 'POST',
      body: fd,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.text).toBe('Billehi n7eb na3ref chnowa wra9 el passeport');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
