import { ImageResponse } from 'next/og'

/** The share-card image for the site and for each page: a white card with the mark and a soft-blue headline panel. */
export function renderOg(title: string, eyebrow = 'Groviatech') {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: 64,
          color: '#141414',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="76" height="66" viewBox="52 203 123 106" fill="none" stroke="#141414" strokeWidth="6">
            <path d="M113.06 255.91L113.06 209.12M125.23 209.12L100.89 209.12" />
            <path d="M114.49 252.79L68.39 292.52M60.44 283.30L76.34 301.74" />
            <path d="M111.63 252.79L158.81 293.39M150.87 302.61L166.75 284.17" />
          </svg>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 700 }}>Groviatech</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#e6eef7',
            borderRadius: 48,
            padding: '52px 60px',
          }}
        >
          <div style={{ display: 'flex', fontSize: 28, color: '#5c5c5c' }}>{eyebrow}</div>
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 700, lineHeight: 1.05, marginTop: 14 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#5c5c5c' }}>Trustworthy. Transparent. Talented.</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
