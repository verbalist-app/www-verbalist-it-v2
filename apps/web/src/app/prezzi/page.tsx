import Image from 'next/image'

import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Text } from '@/components/elements/text'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { Plan } from '@/components/sections/pricing-hero-multi-tier'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'

export const metadata = {
  title: 'Prezzi',
  description:
    'Pacchetti a consumo, niente abbonamento. Crediti validi 12 mesi. Free trial 1 mese, 15 contenuti.',
  alternates: { canonical: '/prezzi' },
}

const HUBSPOT_DEMO = 'https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh'

export default function PrezziPage() {
  return (
    <>
      {/* Hero + plans */}
      <section className="py-16">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6">
            <Heading>Prezzi</Heading>
            <Text size="lg" className="flex max-w-2xl flex-col gap-4 text-center">
              <p>
                Niente abbonamento. Compri un pacchetto di contenuti, lo usi
                quando ti serve. I crediti restano validi 12 mesi.
              </p>
            </Text>
            <p className="text-sm/7 text-mist-700 dark:text-mist-400">
              La prova gratuita dura 1 mese e include 15 contenuti, senza carta di credito.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            <Plan
              name="Starter"
              price="€270"
              period="una tantum"
              subheadline={
                <p>Per iniziare a produrre contenuti SEO con un volume sostenibile.</p>
              }
              features={[
                '30 contenuti',
                'Crediti validi 12 mesi',
                'Analisi SERP, scraping e ottimizzazione',
                'Multi-lingua e multi-mercato',
                'Brand & tone of voice (1 brand)',
                '1 utente del team',
                'Supporto via email',
              ]}
              cta={
                <SoftButtonLink href="/signup" size="lg">
                  Inizia la prova
                </SoftButtonLink>
              }
            />
            <Plan
              name="Pro"
              price="€500"
              period="una tantum"
              badge="Consigliato"
              subheadline={<p>Per team marketing che producono contenuti su scala.</p>}
              features={[
                '70 contenuti',
                'Crediti validi 12 mesi',
                'Tutto il piano Starter',
                'Brand & tone of voice (più brand)',
                'Fino a 5 utenti del team',
              ]}
              cta={
                <ButtonLink href="/signup" size="lg">
                  Inizia la prova
                </ButtonLink>
              }
            />
            <Plan
              name="Custom"
              price="Su richiesta"
              subheadline={
                <p>Per aziende con volumi alti o esigenze custom su brand e workflow.</p>
              }
              features={[
                'Volume di contenuti su misura',
                'Tutto il piano Pro',
                'Utenti del team illimitati',
                'Account manager dedicato',
                'Onboarding white-glove',
              ]}
              cta={
                <SoftButtonLink href={HUBSPOT_DEMO} size="lg">
                  Contattaci
                </SoftButtonLink>
              }
            />
          </div>

          <LogoGrid>
            <Logo>
              <Image src="/img/logos/rentokil.svg" alt="Rentokil" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
            <Logo>
              <Image src="/img/logos/pompea.svg" alt="Pompea" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
            <Logo>
              <Image src="/img/logos/meccanotecnica.svg" alt="Meccanotecnica" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
            <Logo>
              <Image src="/img/logos/plastisac.svg" alt="Plastisac" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
            <Logo>
              <Image src="/img/logos/sogese.svg" alt="Sogese" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
            <Logo>
              <Image src="/img/logos/jurny.svg" alt="Jurny" width={100} height={32} className="brightness-0 dark:invert" />
            </Logo>
          </LogoGrid>
        </Container>
      </section>

      {/* Plan comparison table */}
      <PlanComparisonTable
        id="comparison"
        plans={['Starter', 'Pro', 'Custom']}
        features={[
          {
            title: 'Generazione contenuti',
            features: [
              { name: 'Contenuti inclusi', value: { Starter: '30', Pro: '70', Custom: 'Su misura' } },
              { name: 'Validità crediti', value: { Starter: '12 mesi', Pro: '12 mesi', Custom: '12 mesi' } },
              { name: 'Tipi di contenuto', value: { Starter: '4 formati', Pro: '4 formati', Custom: '4 + custom' } },
              { name: 'Multi-lingua e multi-mercato', value: true },
            ],
          },
          {
            title: 'Analisi e ricerca',
            features: [
              { name: 'Analisi SERP', value: true },
              { name: 'Scraping competitor', value: true },
              { name: 'Ottimizzazione contenuti pubblicati', value: true },
            ],
          },
          {
            title: 'Brand & Team',
            features: [
              { name: 'Brand & tone of voice', value: { Starter: '1 brand', Pro: 'Più brand', Custom: 'Illimitati' } },
              { name: 'Documenti di riferimento', value: { Starter: 'Fino a 3 PDF', Pro: 'Fino a 3 PDF', Custom: 'Illimitati' } },
              { name: 'Utenti del team', value: { Starter: '1', Pro: '5', Custom: 'Illimitati' } },
            ],
          },
          {
            title: 'Supporto',
            features: [
              { name: 'Email', value: true },
              { name: 'Account manager dedicato', value: { Starter: false, Pro: false, Custom: true } },
              { name: 'Onboarding', value: { Starter: false, Pro: false, Custom: 'White-glove' } },
            ],
          },
        ]}
      />

      {/* Testimonial */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            Con Verbalist abbiamo ridotto drasticamente il tempo per produrre articoli SEO multilingua, mantenendo la coerenza editoriale tra i mercati.
          </p>
        }
        img={
          <Image
            src="/img/customers/rentokil.webp"
            alt="Tecnico Rentokil al lavoro"
            width={1400}
            height={1000}
          />
        }
        name="Rentokil"
        byline="Pest control e hygiene · 56.000+ dipendenti"
      />

      {/* FAQ */}
      <FAQsAccordion id="faqs" headline="Domande e risposte">
        <Faq
          id="faq-1"
          question="È un abbonamento?"
          answer="No. Acquisti un pacchetto di contenuti e lo consumi quando ti serve. Niente rinnovi automatici, niente carte da gestire mese per mese."
        />
        <Faq
          id="faq-2"
          question="Quando scadono i crediti?"
          answer="I crediti restano validi 12 mesi dalla data di acquisto. Dopo 12 mesi senza utilizzo, l'account viene disattivato automaticamente: ricevi un avviso prima della scadenza."
        />
        <Faq
          id="faq-3"
          question="Come funziona il free trial?"
          answer="Hai 1 mese di prova con 15 contenuti e accesso completo a tutte le funzionalità. Nessun pagamento anticipato."
        />
        <Faq
          id="faq-4"
          question="Cosa succede quando finisco i contenuti?"
          answer="Ricompri il pacchetto Starter o Pro, o passi a uno più capiente. Niente vincoli, niente upgrade forzati."
        />
        <Faq
          id="faq-5"
          question="Serve la carta di credito per provarlo?"
          answer="No. Il free trial parte senza inserire metodi di pagamento. La carta si aggiunge solo all'acquisto del primo pacchetto."
        />
        <Faq
          id="faq-6"
          question="In cosa è diverso da ChatGPT o Gemini?"
          answer="ChatGPT e Gemini scrivono a partire da un prompt. Verbalist parte da una pipeline di analisi: SERP della keyword, scraping dei competitor, brief strutturato. Il testo arriva sopra dati reali, non sull'addestramento generico del modello."
        />
      </FAQsAccordion>

      {/* CTA finale */}
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
