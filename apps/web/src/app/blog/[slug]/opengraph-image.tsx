import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { categoryLabels, getPost } from '@/lib/posts'

export const alt = 'Verbalist — Articolo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const categoryGradient: Record<string, [string, string]> = {
  'ai-automation': ['#637c86', '#778599'],
  seo: ['#7b627d', '#8f6976'],
  guide: ['#9ca88f', '#596352'],
  'content-marketing': ['#8d7359', '#765959'],
  news: ['#637c86', '#778599'],
}

async function loadFont(): Promise<ArrayBuffer> {
  const buf = await readFile(join(process.cwd(), 'src', 'app', '_fonts', 'FamiljenGrotesk-Medium.ttf'))
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

async function loadLogo(): Promise<string> {
  const buf = await readFile(join(process.cwd(), 'public', 'img', 'brand', 'verbalist-logotype-light.svg'))
  return `data:image/svg+xml;base64,${buf.toString('base64')}`
}

export default async function BlogOG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, fontData, logo] = await Promise.all([
    getPost(slug),
    loadFont(),
    loadLogo(),
  ])

  const title = post?.frontmatter.title ?? 'Verbalist'
  const category = post
    ? categoryLabels[post.frontmatter.category] ?? post.frontmatter.category
    : 'Blog'
  const [from, to] =
    categoryGradient[post?.frontmatter.category ?? 'ai-automation'] ?? ['#637c86', '#778599']

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
          background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logo} alt="Verbalist" width={180} height={52} />
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'Familjen Grotesk',
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            color: 'white',
            fontFamily: 'Familjen Grotesk',
            fontWeight: 500,
            fontSize: 64,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Familjen Grotesk', data: fontData, weight: 500, style: 'normal' }],
    },
  )
}
