import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/siteConfig';

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.descriptorFull}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Imagem de compartilhamento (WhatsApp, Instagram, Facebook), gerada no build. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#110e0d',
          color: '#e4c7b6',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 120, letterSpacing: -6, lineHeight: 1 }}>{siteConfig.brand.monogram}</div>
        <div style={{ marginTop: 28, fontSize: 76, letterSpacing: 10, textTransform: 'uppercase' }}>
          {siteConfig.brand.name}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 24,
            letterSpacing: 10,
            textTransform: 'uppercase',
            color: '#b3a79c',
          }}
        >
          {siteConfig.brand.descriptorFull}
        </div>
      </div>
    ),
    size,
  );
}
