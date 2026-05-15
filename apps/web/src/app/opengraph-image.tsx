import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'

export const alt =
  'Verbalist — software di content engineering per Generative Experience Optimization e SEO'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const logoPath = path.join(process.cwd(), 'public/img/logos/verbalist-logotype-light.svg')
  const logoBuffer = await readFile(logoPath)
  const logoDataUrl = `data:image/svg+xml;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #5a7280 0%, #6b7d92 50%, #8b6f80 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={logoDataUrl}
          alt="Verbalist"
          width={200}
          height={58}
          style={{ display: 'block' }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: -3.5,
              color: '#ffffff',
              maxWidth: 1040,
            }}
          >
            Content engineering per Google e i motori AI.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 48,
                height: 1,
                background: 'rgba(255, 255, 255, 0.5)',
              }}
            />
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              Generative Experience Optimization e SEO
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
