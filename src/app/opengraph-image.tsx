import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Idaara.tn — AI Copilot & Démarches Administratives';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '72px', fontWeight: 900, color: '#00C07F' }}>
          Idaara.tn
        </div>
        <div style={{ fontSize: '28px', color: '#F5F4F0', textAlign: 'center' }}>
          Le copilote citoyen intelligent de la Tunisie
        </div>
        <div style={{ fontSize: '20px', color: '#9A9DA6' }}>
          Passeport · CIN · Timbres Fiscaux · Concours 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
