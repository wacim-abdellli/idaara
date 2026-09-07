/**
 * OCR API Route — Unit Tests
 * Tests input validation, file type gating (magic bytes), size limits, and error responses.
 * Does NOT call external AI services or spawn real Tesseract worker threads.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock Tesseract to avoid spawning heavy worker threads during unit testing
vi.mock('tesseract.js', () => ({
  default: {
    recognize: vi.fn().mockResolvedValue({ data: { text: '' } }),
  },
}));

import { POST } from '../app/api/ocr/route';

function makeFormData(fields: Record<string, string | File>): FormData {
  const fd = new FormData();
  for (const [key, val] of Object.entries(fields)) {
    fd.append(key, val);
  }
  return fd;
}

function makeFileWithHeader(header: number[], size = 64, name = 'test.jpg', type = 'image/jpeg'): File {
  const buf = new Uint8Array(size);
  for (let i = 0; i < header.length; i++) {
    buf[i] = header[i];
  }
  return new File([buf], name, { type });
}

describe('/api/ocr route — input validation & security guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with verified simulation when a valid sampleId is provided', async () => {
    const fd = makeFormData({ sampleId: 'sample-redressement-fiscal' });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json).toHaveProperty('analysis');
    expect(json.analysis.documentType.fr).toContain('Redressement Fiscal');
  });

  it('rejects files exceeding the 10 MB size limit with HTTP 413', async () => {
    const bigFile = new File([new Uint8Array(11 * 1024 * 1024)], 'huge.jpg', { type: 'image/jpeg' });
    const fd = makeFormData({ file: bigFile });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(413);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('10 MB');
  });

  it('rejects files with invalid magic bytes with HTTP 415 (spoofed image)', async () => {
    // ASCII "Hello" header (0x48, 0x65, 0x6c, 0x6c) - not a valid image/pdf magic byte
    const fakeImage = makeFileWithHeader([0x48, 0x65, 0x6c, 0x6c], 128, 'spoof.png', 'image/png');
    const fd = makeFormData({ file: fakeImage });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).toBe(415);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Invalid file format');
  });

  it('accepts valid JPEG magic bytes (ffd8ff) without 415 or 413 rejection', async () => {
    const jpegFile = makeFileWithHeader([0xff, 0xd8, 0xff, 0xe0], 512, 'id.jpg', 'image/jpeg');
    const fd = makeFormData({ file: jpegFile });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    // Verified that format and size pass validation
    expect(res.status).not.toBe(415);
    expect(res.status).not.toBe(413);
  });

  it('accepts valid PNG magic bytes (89504e47) without 415 or 413 rejection', async () => {
    const pngFile = makeFileWithHeader([0x89, 0x50, 0x4e, 0x47], 512, 'scan.png', 'image/png');
    const fd = makeFormData({ file: pngFile });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).not.toBe(415);
    expect(res.status).not.toBe(413);
  });

  it('accepts valid PDF magic bytes (25504446 - %PDF) without 415 or 413 rejection', async () => {
    const pdfFile = makeFileWithHeader([0x25, 0x50, 0x44, 0x46], 512, 'contrat.pdf', 'application/pdf');
    const fd = makeFormData({ file: pdfFile });
    const req = new NextRequest('http://localhost/api/ocr', {
      method: 'POST',
      body: fd,
    });
    const res = await POST(req);
    expect(res.status).not.toBe(415);
    expect(res.status).not.toBe(413);
  });
});
