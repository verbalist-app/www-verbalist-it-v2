import { PostCard } from '@/components/blog/post-card'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Section } from '@/components/elements/section'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { HUBSPOT_DEMO_URL } from '@/lib/constants'
import { CTA_HEADLINE, CTA_SUBHEADLINE } from '@/lib/cta'
import { getAllPosts } from '@/lib/posts'

const SITE_URL = 'https://www.verbalist.it'

export const metadata = {
  title: 'Blog',
  description:
    'Articoli e guide su SEO, GEO, AI search e content engineering. Pattern, struttura e dati: cose pratiche da applicare subito al tuo workflow.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Verbalist',
    description:
      'Articoli e guide su SEO, GEO, AI search e content engineering.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: 'Blog — Verbalist',
    description:
      'Articoli e guide su SEO, GEO, AI search e content engineering.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'it-IT',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.frontmatter.publishedAt,
      dateModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroSimpleLeftAligned
        headlineSize="md"
        headline="Risorse pratiche su SEO, GEO ed AI search"
        subheadline={
          <p>
            Pattern, dati e processi che applichiamo ogni giorno con clienti enterprise.
          </p>
        }
      />

      <Section>
        <ul role="list" className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </ul>
      </Section>

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
