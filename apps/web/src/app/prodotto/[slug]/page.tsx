import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { features, getFeature, getOtherFeatures } from '../_data/features'

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = getFeature(slug)
  if (!feature) return {}
  return {
    title: feature.name,
    description: feature.description,
    alternates: { canonical: `/prodotto/${slug}` },
    openGraph: {
      title: `${feature.name} — Verbalist`,
      description: feature.description,
      url: `/prodotto/${slug}`,
      type: 'website',
    },
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = getFeature(slug)
  if (!feature) notFound()

  const others = getOtherFeatures(slug)

  return (
    <>
      {/* Hero */}
      <HeroSimpleLeftAligned
        eyebrow={<Eyebrow>{feature.category}</Eyebrow>}
        headline={feature.name}
        subheadline={<p>{feature.description}</p>}
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/signup" size="lg">
              Inizia la prova
            </ButtonLink>
            <PlainButtonLink href="#" size="lg">
              Prenota una demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />

      {/* Capabilities overview + 4 cards (pattern Clearscope-light) */}
      <Section
        eyebrow="Capacità"
        headline={feature.overviewHeadline}
        subheadline={<p>{feature.overviewBody}</p>}
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {feature.capabilities.map((cap) => (
            <li
              key={cap.headline}
              className="flex flex-col gap-3 rounded-xl bg-mist-950/2.5 p-6 dark:bg-white/5"
            >
              <h3 className="font-display text-lg/7 font-medium tracking-tight text-mist-950 dark:text-white">
                {cap.headline}
              </h3>
              <p className="text-sm/6 text-mist-700 dark:text-mist-400">{cap.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Other features */}
      <Section eyebrow="Esplora" headline="Le altre funzionalità">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/prodotto/${o.slug}`}
                className="group flex h-full flex-col gap-3 rounded-xl bg-mist-950/2.5 p-6 transition-colors hover:bg-mist-950/5 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <p className="text-xs/6 font-medium text-mist-700 uppercase tracking-wide dark:text-mist-400">
                  {o.category}
                </p>
                <p className="font-display text-xl/7 font-medium tracking-tight text-mist-950 dark:text-white">
                  {o.name}
                </p>
                <p className="text-sm/6 text-mist-700 dark:text-mist-400">{o.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm/6 font-medium text-mist-950 dark:text-white">
                  Scopri <ArrowNarrowRightIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA finale (riuso identico alla home) */}
      <CallToActionSimple
        id="call-to-action"
        headline="Sii visibile su Google e nelle risposte AI."
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
            <PlainButtonLink href="https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh" size="lg">
              Prenota una demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
