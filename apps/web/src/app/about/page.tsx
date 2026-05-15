import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { Stat, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'
import { TeamFourColumnGrid, TeamMember } from '@/components/sections/team-four-column-grid'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { HUBSPOT_DEMO_URL } from '@/lib/constants'
import { CTA_HEADLINE, CTA_SUBHEADLINE } from '@/lib/cta'

const SITE_URL = 'https://www.verbalist.it'

export const metadata = {
  title: 'Chi siamo',
  description:
    "Verbalist è il software di content engineering di NUR Digital Marketing. 430+ clienti dal 1999. La stessa metodologia SEO enterprise, ora in piattaforma per agenzie e team marketing in-house.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Chi siamo — Verbalist',
    description:
      "Verbalist è il software di content engineering di NUR Digital Marketing. 430+ clienti dal 1999.",
    url: `${SITE_URL}/about`,
    type: 'website',
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: 'Chi siamo — Verbalist',
  description:
    "Verbalist è il software di content engineering di NUR Digital Marketing. 430+ clienti dal 1999.",
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'it-IT',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Chi siamo', item: `${SITE_URL}/about` },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <HeroSimpleCentered
        id="hero"
        headlineSize="md"
        headline="25 anni di SEO enterprise, ora una piattaforma"
        subheadline={
          <p>
            Verbalist è il prodotto di NUR Digital Marketing. 430+ clienti dal 1999. La stessa
            metodologia è ora disponibile per agenzie SEO e team marketing in-house.
          </p>
        }
      />

      {/* Stats */}
      <StatsThreeColumnWithDescription
        id="stats"
        heading="NUR Digital Marketing"
        description={
          <>
            <p>
              Dal 1999 lavoriamo con clienti come EY, Mercedes-Benz, LVMH e SDA Bocconi. Abbiamo
              pubblicato il{' '}
              <a
                href="https://www.amazon.it/-/en/Rinaldo-Zambello-ebook/dp/B0FPBTC7WV"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-mist-950 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
              >
                primo libro italiano sulla Generative Engine Optimization
              </a>
              . Siamo HubSpot Partner Platinum.
            </p>
            <p>
              Abbiamo messo assieme le nostre conoscenze su SEO, content e GEO in un solo
              software. Cinque agenti specializzati che coprono ogni passaggio del flusso
              editoriale, dalla keyword al contenuto pronto per il CMS.
            </p>
            <p>
              Verbalist automatizza le metodologie che usiamo ogni giorno con i nostri clienti
              enterprise. Ogni funzionalità nasce da un pattern testato su migliaia di campagne
              reali.
            </p>
            <p>
              Le stesse tecniche, ora anche per agenzie SEO e team marketing in-house. Non solo
              per chi ha budget enterprise.
            </p>
          </>
        }
      >
        <Stat stat="25 anni" text="SEO enterprise per clienti come EY, Mercedes-Benz, LVMH." />
        <Stat stat="TOP 3%" text="Agenzie Google Premier Partner in Italia." />
        <Stat
          stat="4 partnership"
          text="Google Premier, HubSpot Platinum, Microsoft, Semrush."
        />
      </StatsThreeColumnWithDescription>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            Con Verbalist le nostre schede prodotto e gli articoli del blog escono più rapidamente,
            senza perdere il tone of voice del brand.
          </p>
        }
        img={
          <div className="flex items-center justify-center px-2">
            <Image
              src="/img/logos/pompea.svg"
              alt="Pompea"
              width={100}
              height={32}
              className="h-auto w-full"
            />
          </div>
        }
        name="Pompea"
        byline="E-commerce moda · 200+ dipendenti"
      />

      {/* Team */}
      <TeamFourColumnGrid
        id="team"
        headline="Chi ha contribuito a Verbalist"
        subheadline={
          <p>
            Il team che ha costruito Verbalist, tra le sedi di Mantova e Milano.
          </p>
        }
      >
        <TeamMember
          img={
            <Image
              src="/img/avatars/1-h-1000-w-800.webp"
              alt=""
              className="bg-white/75"
              width={800}
              height={1000}
            />
          }
          name="Rinaldo Zambello"
          byline="CEO"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/2-h-1000-w-800.webp"
              alt=""
              className="bg-white/75"
              width={800}
              height={1000}
            />
          }
          name="Filippo Danesi"
          byline="Product Owner"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/4-h-1000-w-800.webp"
              alt=""
              className="bg-white/75"
              width={800}
              height={1000}
            />
          }
          name="Niccolò Guiducci"
          byline="Backend Developer"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/5-h-1000-w-800.webp"
              alt=""
              className="bg-white/75"
              width={800}
              height={1000}
            />
          }
          name="Giulia Fiorini"
          byline="Frontend Developer"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/6-h-1000-w-800.webp"
              alt=""
              className="bg-white/75"
              width={800}
              height={1000}
            />
          }
          name="Gino Cappelli"
          byline="Senior Web Developer / Tech Lead"
        />
      </TeamFourColumnGrid>

      {/* Call To Action */}
      <CallToActionSimpleCentered
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
