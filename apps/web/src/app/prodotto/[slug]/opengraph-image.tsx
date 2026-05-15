import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'

import { features, getFeature } from '../_data/features'

export const alt = 'Verbalist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }))
}

const gradients: Record<string, string> = {
  purple: 'linear-gradient(135deg, #4b3a6e 0%, #6b5b8e 50%, #8b6f80 100%)',
  blue: 'linear-gradient(135deg, #2f4a6e 0%, #4f6e92 50%, #6b8aae 100%)',
  green: 'linear-gradient(135deg, #2f5040 0%, #4d7059 50%, #6b8c75 100%)',
  brown: 'linear-gradient(135deg, #5e3a22 0%, #7c5634 50%, #9d7a52 100%)',
}

const colorBySlug: Record<string, keyof typeof gradients> = {
  'analisi-serp': 'purple',
  'generazione-contenuti': 'blue',
  'ottimizzazione-contenuti': 'green',
  'brand-tone-of-voice': 'brown',
  'multi-lingua': 'purple',
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = getFeature(slug)

  const logoPath = path.join(process.cwd(), 'public/img/logos/verbalist-logotype-light.svg')
  const logoBuffer = await readFile(logoPath)
  const logoDataUrl = `data:image/svg+xml;base64,${logoBuffer.toString('base64')}`

  const background = gradients[colorBySlug[slug] ?? 'purple']
  const eyebrow = feature?.shortName ?? 'Verbalist'
  const headline = feature?.name ?? 'Content engineering per Google e i motori AI.'

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
          background,
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
              {eyebrow}
            </span>
          </div>

          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              color: '#ffffff',
              maxWidth: 1040,
            }}
          >
            {headline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
