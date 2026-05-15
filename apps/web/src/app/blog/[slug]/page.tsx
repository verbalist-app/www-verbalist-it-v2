import { notFound } from 'next/navigation'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { LongFormDocument } from '@/components/blog/long-form-document'
import { PostCard } from '@/components/blog/post-card'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HUBSPOT_DEMO_URL } from '@/lib/constants'
import { CTA_HEADLINE, CTA_SUBHEADLINE } from '@/lib/cta'
import { authorSchema, getAuthor } from '@/lib/authors'
import { categoryLabels, categoryWallpaper, getAllPosts, getPost, getRelatedPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

const SITE_URL = 'https://www.verbalist.it'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
      modifiedTime: new Date(
        post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
      ).toISOString(),
      authors: [post.frontmatter.author ?? 'Team Verbalist'],
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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

  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const author = getAuthor(post.frontmatter.author)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        datePublished: new Date(post.frontmatter.publishedAt).toISOString(),
        dateModified: new Date(
          post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
        ).toISOString(),
        inLanguage: 'it-IT',
        author: authorSchema(author),
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        articleSection: categoryLabels[post.frontmatter.category] ?? post.frontmatter.category,
        keywords: post.frontmatter.tags?.join(','),
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

      <section className="relative">
        <Wallpaper color={wallpaperColor} className="min-h-[clamp(360px,60svh,480px)]">
          <Container className="flex min-h-[clamp(360px,60svh,480px)] flex-col justify-end gap-6 py-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm/7">
                <li>
                  <a href="/blog" className="text-white/90 hover:text-white">
                    Blog
                  </a>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  /
                </li>
                <li aria-current="page" className="font-semibold text-white/90">
                  {categoryLabels[post.frontmatter.category] ?? post.frontmatter.category}
                </li>
              </ol>
            </nav>
            <Heading color="light" size="md" className="max-w-3xl">
              {post.frontmatter.title}
            </Heading>
            <p className="max-w-2xl text-lg/8 text-white/90">{post.frontmatter.description}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm/7 text-white/90">
              <span className="font-medium">{author.name}</span>
              {author.jobTitle && (
                <>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span className="text-white/80">{author.jobTitle}</span>
                </>
              )}
              <span aria-hidden="true" className="text-white/40">·</span>
              <span className="tabular-nums">{dateNumeric}</span>
            </div>
          </Container>
        </Wallpaper>
      </section>

      <article className="py-16">
        <Container className="max-w-3xl lg:max-w-3xl">
          {post.frontmatter.summary && (
            <aside className="mt-8 flex flex-col gap-2 border-l border-mist-950/10 pl-6">
              <Eyebrow>TL;DR</Eyebrow>
              <Text>{post.frontmatter.summary}</Text>
            </aside>
          )}

          <LongFormDocument className="mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Author bio — minimal footer */}
          <aside className="mt-16 border-t border-mist-200 pt-6">
            <Eyebrow>Scritto da</Eyebrow>
            <div className="mt-3 flex flex-col gap-3 text-sm/7 text-mist-700">
              <p>
                <span className="font-medium text-mist-950">{author.name}</span>
                {author.jobTitle && <>, {author.jobTitle}</>}
              </p>
              <p>{author.bio}</p>
              {author.sameAs && author.sameAs.length > 0 && (
                <p>
                  {author.sameAs.map((url, i) => (
                    <span key={url}>
                      {i > 0 && '·'}
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-mist-950 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
                      >
                        {new URL(url).hostname.replace(/^www\./, '')}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </aside>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-mist-950/10 py-16">
          <Container className="flex flex-col gap-8">
            <Subheading>Articoli correlati</Subheading>
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
        headline={CTA_HEADLINE}
        subheadline={<p>{CTA_SUBHEADLINE}</p>}
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/signup" size="lg">
              Prova gratis 1 mese
            </ButtonLink>
            <PlainButtonLink href={HUBSPOT_DEMO_URL} size="lg">
              Prenota una demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
