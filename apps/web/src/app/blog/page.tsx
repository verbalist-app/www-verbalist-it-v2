import { PostCard } from '@/components/blog/post-card'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { getAllPosts } from '@/lib/posts'

const HUBSPOT_DEMO = 'https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh'

export const metadata = {
  title: 'Blog',
  description:
    'Articoli e guide su SEO, GEO, AI e contenuti. Cose pratiche che puoi applicare subito.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <HeroSimpleLeftAligned
        eyebrow={<Eyebrow>Blog</Eyebrow>}
        headline="Articoli e guide"
        subheadline={
          <p>SEO, GEO, AI e contenuti. Cose pratiche che puoi applicare subito.</p>
        }
      />

      <Section>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </ul>
      </Section>

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
