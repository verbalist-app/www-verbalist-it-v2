import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { BrandCard, BrandsCardsMultiColumn } from '@/components/sections/brands-cards-multi-column'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { customers } from './_data/customers'

export const metadata = {
  title: 'Clienti',
  description: 'Team marketing, agenzie e aziende italiane che producono contenuti SEO multilingua su scala con Verbalist. Casi reali di content engineering applicato.',
  alternates: { canonical: '/clienti' },
}

export default function CustomersPage() {
  return (
    <>
      <HeroSimpleLeftAligned
        eyebrow={<Eyebrow>Clienti</Eyebrow>}
        headline="Esperienze di chi usa Verbalist ogni giorno"
        subheadline={
          <p>
            Team marketing, agenzie e aziende che producono contenuti SEO su scala con Verbalist.
          </p>
        }
      />

      <BrandsCardsMultiColumn>
        {customers.map((c) => (
          <BrandCard
            key={c.slug}
            logo={
              <Image
                src={c.logo.src}
                alt={c.name}
                width={c.logo.width}
                height={c.logo.height}
                className="h-8 w-auto brightness-0 dark:invert"
              />
            }
            text={c.testimonial}
            footnote={c.cardFootnote}
          />
        ))}
      </BrandsCardsMultiColumn>

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
            <PlainButtonLink href="https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh" size="lg">
              Prenota una demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
