import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const alt = 'Verbalist — Contenuti SEO a partire dai dati di ricerca'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadFont(): Promise<ArrayBuffer> {
  const buf = await readFile(join(process.cwd(), 'src', 'app', '_fonts', 'FamiljenGrotesk-Medium.ttf'))
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

async function loadLogo(): Promise<string> {
  const buf = await readFile(join(process.cwd(), 'public', 'img', 'brand', 'verbalist-logotype-light.svg'))
  return `data:image/svg+xml;base64,${buf.toString('base64')}`
}

export default async function OpenGraphImage() {
  const [fontData, logo] = await Promise.all([loadFont(), loadLogo()])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(180deg, #637c86 0%, #778599 100%)',
        }}
      >
        <img src={logo} alt="Verbalist" width={220} height={64} />
        <div
          style={{
            color: 'white',
            fontFamily: 'Familjen Grotesk',
            fontWeight: 500,
            fontSize: 72,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Contenuti SEO a partire dai dati di ricerca
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Familjen Grotesk', data: fontData, weight: 500, style: 'normal' }],
    },
  )
}
