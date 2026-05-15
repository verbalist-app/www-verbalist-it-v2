import Image from 'next/image'

import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { CustomerLogosGrid } from '@/components/sections/customer-logos'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { Plan } from '@/components/sections/pricing-multi-tier'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { CTA_HEADLINE, CTA_SUBHEADLINE } from '@/lib/cta'
import { HUBSPOT_DEMO_URL } from '@/lib/constants'

export const metadata = {
  title: 'Prezzi',
  description:
    'Pacchetti a consumo, niente abbonamento. Starter €270/30 contenuti, Pro €500/70 contenuti, Custom su richiesta. Crediti validi 12 mesi, free trial.',
  alternates: { canonical: '/pricing' },
}

const faqs = [
  {
    id: 'faq-1',
    question: 'È un abbonamento?',
    answer:
      'No. Acquisti un pacchetto di contenuti e lo consumi quando ti serve. Niente rinnovi automatici, niente carte da gestire mese per mese.',
  },
  {
    id: 'faq-2',
    question: 'Quando scadono i crediti?',
    answer:
      "I crediti restano validi 12 mesi dalla data di acquisto. Dopo 12 mesi senza utilizzo, l'account viene disattivato automaticamente: ricevi un avviso prima della scadenza.",
  },
  {
    id: 'faq-3',
    question: 'Come funziona il free trial?',
    answer:
      'Hai 1 mese di prova con 15 contenuti e accesso completo a tutte le funzionalità. Nessun pagamento anticipato.',
  },
  {
    id: 'faq-4',
    question: 'Cosa succede quando finisco i contenuti?',
    answer:
      'Ricompri il pacchetto Starter o Pro, o passi a uno più capiente. Niente vincoli, niente upgrade forzati.',
  },
  {
    id: 'faq-5',
    question: 'Serve la carta di credito per provarlo?',
    answer:
      "No. Il free trial parte senza inserire metodi di pagamento. La carta si aggiunge solo all'acquisto del primo pacchetto.",
  },
  {
    id: 'faq-6',
    question: 'In cosa è diverso da ChatGPT o Gemini?',
    answer:
      "ChatGPT e Gemini scrivono a partire da un prompt. Verbalist parte da un'analisi strutturata: top 10 di Google sulla keyword, estrazione dei competitor, brief. Il testo arriva sopra dati reali, non sull'addestramento generico del modello.",
  },
]

const SITE_URL = 'https://www.verbalist.it'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/pricing#product`,
  name: 'Verbalist',
  description:
    'Software SEO con AI per content engineering. Pacchetti di contenuti a consumo, niente abbonamento, crediti validi 12 mesi.',
  brand: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}/pricing`,
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '270',
      priceCurrency: 'EUR',
      url: `${SITE_URL}/signup?plan=starter`,
      availability: 'https://schema.org/InStock',
      description: '30 contenuti, crediti validi 12 mesi.',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '500',
      priceCurrency: 'EUR',
      url: `${SITE_URL}/signup?plan=pro`,
      availability: 'https://schema.org/InStock',
      description: '70 contenuti, crediti validi 12 mesi.',
    },
    {
      '@type': 'Offer',
      name: 'Custom',
      priceCurrency: 'EUR',
      url: HUBSPOT_DEMO_URL,
      availability: 'https://schema.org/InStock',
      description: 'Volumi enterprise, su richiesta.',
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Prezzi', item: `${SITE_URL}/pricing` },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-16">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6">
            <Heading size="md">Prezzi a consumo, niente abbonamento</Heading>
            <Text size="lg" className="flex max-w-2xl flex-col gap-4 text-center">
              <p>
                Acquisti il volume di contenuti che ti serve. Lo consumi quando vuoi, con crediti
                validi 12 mesi.
              </p>
            </Text>
            <p className="text-sm/7 text-mist-700">
              La prova gratuita dura 1 mese e include 15 contenuti, senza carta di credito.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            <Plan
              name="Starter"
              price="€270"
              period="una tantum"
              subheadline={<p>Per iniziare. 30 contenuti, circa 2-3 al mese sui 12 mesi.</p>}
              features={[
                '30 contenuti',
                'Crediti validi 12 mesi',
                'Analisi SERP, estrazione competitor e ottimizzazione',
                'Multi-lingua e multi-mercato',
                'Brand & tone of voice (1 brand)',
                '1 utente del team',
                'Supporto via email',
              ]}
              cta={
                <SoftButtonLink href="/signup" size="lg">
                  Prova gratis 1 mese
                </SoftButtonLink>
              }
            />
            <Plan
              name="Pro"
              price="€500"
              period="una tantum"
              badge="Consigliato"
              subheadline={<p>Per team che pubblicano su scala. 70 contenuti, circa 6 al mese.</p>}
              features={[
                '70 contenuti',
                'Crediti validi 12 mesi',
                'Tutto il piano Starter',
                'Brand & tone of voice (più brand)',
                'Fino a 5 utenti del team',
              ]}
              cta={
                <ButtonLink href="/signup" size="lg">
                  Prova gratis 1 mese
                </ButtonLink>
              }
            />
            <Plan
              name="Custom"
              price="Su richiesta"
              subheadline={<p>Per aziende con volumi alti o esigenze custom su brand e workflow.</p>}
              features={[
                'Volume di contenuti su misura',
                'Tutto il piano Pro',
                'Utenti del team illimitati',
                'Account manager dedicato',
                'Onboarding white-glove',
              ]}
              cta={
                <SoftButtonLink href={HUBSPOT_DEMO_URL} size="lg">
                  Contattaci
                </SoftButtonLink>
              }
            />
          </div>

          <div className="flex justify-center">
            <a
              href="#comparison"
              className="text-sm/7 font-medium text-mist-700 underline decoration-mist-700/30 underline-offset-4 hover:text-mist-950 hover:decoration-mist-950"
            >
              Confronta tutte le funzionalità ↓
            </a>
          </div>

          <CustomerLogosGrid />
        </Container>
      </section>

      <PlanComparisonTable
        id="comparison"
        plans={['Starter', 'Pro', 'Custom']}
        features={[
          {
            title: 'Generazione contenuti',
            features: [
              { name: 'Prova gratuita', value: { Starter: '1 mese / 15 contenuti', Pro: '1 mese / 15 contenuti', Custom: 'Su richiesta' } },
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
              { name: 'Estrazione contenuti competitor', value: true },
              { name: 'Ottimizzazione contenuti pubblicati', value: true },
            ],
          },
          {
            title: 'Brand & Team',
            features: [
              { name: 'Brand, tono e pubblico target', value: { Starter: '1 brand', Pro: 'Più brand', Custom: 'Illimitati' } },
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

      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            Con Verbalist abbiamo ridotto drasticamente il tempo per produrre articoli SEO
            multilingua, mantenendo la coerenza editoriale tra i mercati.
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

      <FAQsAccordion id="faqs" headline="Domande e risposte">
        {faqs.map((f) => (
          <Faq key={f.id} id={f.id} question={f.question} answer={f.answer} />
        ))}
      </FAQsAccordion>

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
