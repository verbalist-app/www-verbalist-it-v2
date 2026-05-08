import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard } from '@/components/blog/post-card'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Document } from '@/components/elements/document'
import { Wallpaper } from '@/components/elements/wallpaper'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import {
  categoryLabels,
  categoryWallpaper,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from '@/lib/posts'

const HUBSPOT_DEMO = 'https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(post.frontmatter.publishedAt).toISOString(),
      authors: [post.frontmatter.author ?? 'Team Verbalist'],
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const allPosts = await getAllPosts()
  const related = getRelatedPosts(allPosts, slug, post.frontmatter.category)
  const wallpaperColor = categoryWallpaper[post.frontmatter.category]
  const dateNumeric = new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(new Date(post.frontmatter.publishedAt))
    .replace(/\//g, '.')

  const SITE_URL = 'https://www.verbalist.it'
  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        datePublished: new Date(post.frontmatter.publishedAt).toISOString(),
        dateModified: new Date(post.frontmatter.publishedAt).toISOString(),
        image: `${canonicalUrl}/opengraph-image`,
        inLanguage: 'it-IT',
        author: {
          '@type': 'Organization',
          name: post.frontmatter.author ?? 'Team Verbalist',
          url: SITE_URL,
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        articleSection: categoryLabels[post.frontmatter.category] ?? post.frontmatter.category,
        keywords: post.frontmatter.tags?.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.frontmatter.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero wallpaper a tutta larghezza */}
      <section className="relative">
        <Wallpaper color={wallpaperColor} className="min-h-[480px]">
          <Container className="flex min-h-[480px] flex-col justify-end gap-6 py-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm/7">
                <li>
                  <Link
                    href="/blog"
                    className="text-white/70 hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  /
                </li>
                <li
                  aria-current="page"
                  className="font-semibold text-white/90"
                >
                  {categoryLabels[post.frontmatter.category] ?? post.frontmatter.category}
                </li>
              </ol>
            </nav>
            <h1 className="max-w-3xl font-display text-4xl/12 font-medium tracking-[-0.03em] text-balance text-white sm:text-5xl/14">
              {post.frontmatter.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/90">
              {post.frontmatter.description}
            </p>
            <span className="text-sm text-white/70">{dateNumeric}</span>
          </Container>
        </Wallpaper>
      </section>

      {/* Corpo articolo centrato */}
      <article className="py-16">
        <Container className="max-w-3xl lg:max-w-3xl">
          {post.frontmatter.summary && (
            <aside className="mt-8 border-l-2 border-mist-300 pl-6 dark:border-mist-700">
              <p className="text-sm/7 font-semibold text-mist-700 dark:text-mist-400">
                TL;DR
              </p>
              <p className="mt-2 text-base text-mist-800 dark:text-mist-200">
                {post.frontmatter.summary}
              </p>
            </aside>
          )}

          <Document
            className="mt-12"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </article>

      {/* Articoli correlati */}
      {related.length > 0 && (
        <section className="border-t border-mist-200 py-16 dark:border-mist-800">
          <Container className="flex flex-col gap-8">
            <h2 className="font-display text-3xl/9 font-medium tracking-[-0.03em] text-mist-950 sm:text-4xl/10 dark:text-white">
              Articoli correlati
            </h2>
            <ul role="list" className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CallToActionSimple
        id="call-to-action"
        headline="Sii visibile su Google e nelle risposte AI"
        subheadline={
          <p>
            1 mese di prova con 15 contenuti e accesso completo a tutte le
            funzionalità. Nessun pagamento anticipato.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/signup" size="lg">
              Inizia la prova
            </ButtonLink>
            <PlainButtonLink href={HUBSPOT_DEMO} size="lg">
              Prenota una demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
