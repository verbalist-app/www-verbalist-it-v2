import Image from 'next/image'

import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { AnalisiSerpVisual } from '@/components/elements/analisi-serp-visual'
import { DashboardVisual } from '@/components/elements/dashboard-visual'
import { GenerazioneContenutiVisual } from '@/components/elements/generazione-contenuti-visual'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { CustomerLogosGrid } from '@/components/sections/customer-logos'
import { HUBSPOT_DEMO_URL } from '@/lib/constants'
import { CTA_HEADLINE, CTA_SUBHEADLINE } from '@/lib/cta'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

const faqs = [
  {
    id: 'faq-1',
    question: 'Cos\'è la GEO e perché serve oggi?',
    answer:
      "La GEO (Generative Engine Optimization) è la pratica di ottimizzare i contenuti perché vengano citati nelle risposte di ChatGPT, Perplexity, Google AI Overview e Gemini. La SEO classica punta al click dal motore di ricerca. La GEO punta alla citazione nella risposta AI. Verbalist applica entrambe nello stesso flusso editoriale. Abbiamo una guida completa nel blog post Cos'è la GEO.",
    answerNode: (
      <p>
        La GEO (Generative Engine Optimization) è la pratica di ottimizzare i contenuti
        perché vengano citati nelle risposte di ChatGPT, Perplexity, Google AI Overview e
        Gemini. La SEO classica punta al click dal motore di ricerca. La GEO punta alla
        citazione nella risposta AI. Verbalist applica entrambe nello stesso flusso
        editoriale. Abbiamo una guida completa nel blog post{' '}
        <Link href="/blog/cos-e-la-geo">Cos&apos;è la GEO</Link>.
      </p>
    ),
  },
  {
    id: 'faq-2',
    question: 'Serve la carta di credito per provarlo?',
    answer:
      'No. Il free trial parte senza inserire metodi di pagamento. La carta si aggiunge solo al passaggio a un piano a pagamento.',
  },
  {
    id: 'faq-3',
    question: 'In cosa è diverso da ChatGPT o Gemini?',
    answer:
      "ChatGPT e Gemini scrivono a partire da un prompt generico. Verbalist parte da un'analisi SEO strutturata: top 10 di Google sulla keyword, estrazione dei competitor, brief operativo. Il testo arriva sopra dati di ricerca reali. Risultato: pagine pensate per posizionarsi su Google e per farsi citare nelle risposte AI di Perplexity, ChatGPT e AI Overview.",
  },
  {
    id: 'faq-4',
    question: 'Posso usare i contenuti nel mio CMS?',
    answer:
      "Sì. L'output esce in Markdown o HTML pulito, pronto per copia-incolla in WordPress, Webflow, Shopify o nel tuo CMS di riferimento.",
  },
  {
    id: 'faq-5',
    question: 'Il testo rispetta il mio tone of voice?',
    answer:
      "Sì. Imposti il brand tone una volta nella sezione Impostazioni e Verbalist lo applica a ogni nuovo contenuto. Resta rifinibile prima della pubblicazione, l'editor finale sei tu.",
  },
  {
    id: 'faq-6',
    question: 'Devo avere esperienza in SEO o GEO per usarlo?',
    answer:
      "No. Verbalist guida ogni passaggio dalla keyword alla bozza: scegli il tono e il pubblico target, il prodotto fa l'analisi SEO e GEO tecnica. Funziona anche se non hai mai sentito parlare di Generative Engine Optimization.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const SITE_URL = 'https://www.verbalist.it'

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: 'Verbalist',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'SEO software',
  operatingSystem: 'Web',
  inLanguage: 'it-IT',
  description:
    'Software SEO e GEO con AI. Verbalist trasforma SERP, keyword e competitor in contenuti pronti per Google, ChatGPT e Perplexity.',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  offers: {
    '@type': 'AggregateOffer',
    url: `${SITE_URL}/pricing`,
    priceCurrency: 'EUR',
    lowPrice: '270',
    highPrice: '500',
    offerCount: 2,
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Analisi SERP per content engineering',
    'Generazione contenuti SEO',
    'Ottimizzazione contenuti SEO',
    'Brand tone of voice',
    'Multi-lingua (30+ lingue)',
  ],
  screenshot: `${SITE_URL}/img/screenshots/dashboard.webp`,
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {/* Hero */}
      <HeroWithDemoOnBackground
        id="hero"
        headline="Lo strumento che fa SEO e GEO su dati reali"
        subheadline="Verbalist analizza i top competitor della tua keyword e produce contenuti ottimizzati per SEO e GEO. Pronti per Google, ChatGPT e Perplexity."
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink color="light" href="/signup" size="lg">
              Prova gratis 1 mese
            </ButtonLink>
            <PlainButtonLink color="light" href="#features" size="lg">
              Come funziona <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
          <div className="aspect-[1709/990] h-full overflow-hidden ring-1 ring-black/10">
            <DashboardVisual className="h-full w-full" />
          </div>
        }
        footer={<CustomerLogosGrid />}
      />
      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="Funzionalità"
        headline="Verbalist analizza SERP e competitor prima di scrivere un contenuto"
        subheadline={
          <p>
            Quando arrivi alla scrittura, brief e scaletta sono già pronti. Costruiti sulle pagine
            in posizione organica per la tua keyword e sulle fonti che ChatGPT e Perplexity citano
            nelle risposte. In italiano e in oltre 30 lingue.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-left">
                  <AnalisiSerpVisual className="w-full" />
                </Screenshot>
              }
              headline="Analisi SERP"
              subheadline={
                <p>
                  Inserisci una keyword. Verbalist legge i primi 10 risultati di Google, estrae
                  argomenti, struttura e domande coperte. Tu ottieni un brief completo prima di
                  iniziare a scrivere.
                </p>
              }
              cta={
                <Link href="/prodotto/analisi-serp">
                  Scopri come funziona <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-right">
                  <GenerazioneContenutiVisual className="w-full" />
                </Screenshot>
              }
              headline="Generazione contenuti"
              subheadline={
                <p>
                  Verbalist parte dal brief e scrive un articolo, una scheda prodotto o una
                  landing nel tone of voice del tuo brand. In 5 minuti hai una prima bozza pronta
                  per l&rsquo;editing.
                </p>
              }
              cta={
                <Link href="/prodotto/generazione-contenuti">
                  Scopri come funziona <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Cinque agenti, un solo flusso"
        headline="Da keyword a bozza in cinque minuti"
        subheadline={
          <p>
            Analisi della SERP, brief sopra le evidenze, generazione del contenuto, ottimizzazione
            finale. Lo stesso flusso editoriale per ogni mercato, in oltre trenta lingue.
          </p>
        }
      >
        <Stat stat="5 agenti" text="Per ogni passaggio del flusso, dalla SERP alla pubblicazione." />
        <Stat stat="30+" text="Lingue supportate, dalla SERP locale all'output finale." />
        <Stat stat="5 min" text="Dalla keyword alla prima bozza pronta per l'editing." />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Aziende che producono contenuti con Verbalist"
        subheadline={
          <p>Marketing, e-commerce, manifatturiero, servizi B2B, PropTech. Volumi e mercati diversi, stesso flusso.</p>
        }
      >
        <Testimonial
          quote={
            <p>
              Con Verbalist abbiamo ridotto drasticamente il tempo per produrre articoli SEO
              multilingua, mantenendo la coerenza editoriale tra i mercati.
            </p>
          }
          img={
            <div className="flex items-center justify-center px-2">
              <Image
                src="/img/logos/rentokil.svg"
                alt="Rentokil"
                width={100}
                height={32}
                className="h-auto w-full"
              />
            </div>
          }
          name="Rentokil"
          byline="Pest control · 56.000+ dipendenti"
        />
        <Testimonial
          quote={
            <p>
              Con Verbalist le nostre schede prodotto e gli articoli del blog escono più
              rapidamente, senza perdere il tono di voce del brand.
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
        <Testimonial
          quote={
            <p>
              Verbalist ci aiuta a produrre contenuti tecnici in più lingue mantenendo precisione
              terminologica e tono di voce corporate.
            </p>
          }
          img={
            <div className="flex items-center justify-center px-2">
              <Image
                src="/img/logos/meccanotecnica.svg"
                alt="Meccanotecnica"
                width={100}
                height={32}
                className="h-auto w-full"
              />
            </div>
          }
          name="Meccanotecnica"
          byline="Manifatturiero · 150+ dipendenti"
        />
        <Testimonial
          quote={
            <p>
              Con Verbalist riusciamo a tenere aggiornate centinaia di schede prodotto del nostro
              catalogo packaging senza sovraccaricare il team.
            </p>
          }
          img={
            <div className="flex items-center justify-center px-2">
              <Image
                src="/img/logos/plastisac.svg"
                alt="Plastisac"
                width={100}
                height={32}
                className="h-auto w-full"
              />
            </div>
          }
          name="Plastisac"
          byline="Packaging industriale · 100+ dipendenti"
        />
        <Testimonial
          quote={
            <p>
              Con Verbalist il nostro team scrive di più. La parte di ricerca SERP e brief la fa
              il prodotto, noi ci concentriamo sulla scrittura e sulla revisione.
            </p>
          }
          img={
            <div className="flex items-center justify-center px-2">
              <Image
                src="/img/logos/sogese.svg"
                alt="Sogese"
                width={100}
                height={32}
                className="h-auto w-full"
              />
            </div>
          }
          name="Sogese"
          byline="Servizi B2B · 300+ dipendenti"
        />
        <Testimonial
          quote={
            <p>
              Verbalist ci permette di produrre contenuti SEO localizzati per ogni mercato in cui
              operiamo, senza moltiplicare i tempi del team.
            </p>
          }
          img={
            <div className="flex items-center justify-center px-2">
              <Image
                src="/img/logos/jurny.svg"
                alt="Jurny"
                width={100}
                height={32}
                className="h-auto w-full"
              />
            </div>
          }
          name="Jurny"
          byline="PropTech · Los Angeles, US"
        />
      </TestimonialThreeColumnGrid>
      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Domande e risposte">
        {faqs.map((f) => (
          <Faq
            key={f.id}
            id={f.id}
            question={f.question}
            answer={'answerNode' in f && f.answerNode ? f.answerNode : f.answer}
          />
        ))}
      </FAQsTwoColumnAccordion>
      {/* Pricing */}
      <PricingMultiTier
        id="pricing"
        headline="Prezzi basati sui contenuti che produci"
        subheadline={
          <p>
            Nessun abbonamento. Compri il volume che ti serve, lo usi quando vuoi.
          </p>
        }
        plans={
          <>
            <Plan
              name="Starter"
              price="€270"
              period="una tantum"
              subheadline={<p>Per iniziare a produrre contenuti SEO con un volume sostenibile.</p>}
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
              subheadline={<p>Per team marketing che producono contenuti su scala.</p>}
              badge="Consigliato"
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
          </>
        }
      />
      {/* Call To Action */}
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
