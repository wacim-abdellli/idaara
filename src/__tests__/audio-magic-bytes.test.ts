import { describe, it, expect } from 'vitest';
import { isValidAudioMagicBytes } from '../app/api/transcribe/route';

describe('isValidAudioMagicBytes() — Audio Binary Validation', () => {
  it('accepts valid WebM / Matroska audio streams (1a45dfa3)', () => {
    const webmHeader = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x9f, 0x42, 0x86, 0x81]);
    expect(isValidAudioMagicBytes(webmHeader)).toBe(true);
  });

  it('accepts valid Ogg Vorbis/Opus audio streams (4f676753)', () => {
    const oggHeader = new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0x00, 0x02, 0x00, 0x00]);
    expect(isValidAudioMagicBytes(oggHeader)).toBe(true);
  });

  it('accepts valid MP3 with ID3 tag (494433)', () => {
    const mp3Id3Header = new Uint8Array([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00]);
    expect(isValidAudioMagicBytes(mp3Id3Header)).toBe(true);
  });

  it('accepts valid WAV audio file with RIFF container (52494646)', () => {
    const wavHeader = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x24, 0x08, 0x00, 0x00]);
    expect(isValidAudioMagicBytes(wavHeader)).toBe(true);
  });

  it('accepts valid M4A/MP4 audio with ftyp box', () => {
    // 00 00 00 20 'ftyp' 'M4A '
    const m4aHeader = new Uint8Array([
      0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x4d, 0x34, 0x41, 0x20,
    ]);
    expect(isValidAudioMagicBytes(m4aHeader)).toBe(true);
  });

  it('rejects non-audio binary formats (PDF, executable, text)', () => {
    const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]); // %PDF
    const exeHeader = new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]); // MZ
    const textHeader = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f]); // "Hello Wo"

    expect(isValidAudioMagicBytes(pdfHeader)).toBe(false);
    expect(isValidAudioMagicBytes(exeHeader)).toBe(false);
    expect(isValidAudioMagicBytes(textHeader)).toBe(false);
  });

  it('rejects empty or truncated byte arrays', () => {
    expect(isValidAudioMagicBytes(new Uint8Array([]))).toBe(false);
    expect(isValidAudioMagicBytes(new Uint8Array([0x1a, 0x45]))).toBe(false);
  });
});
