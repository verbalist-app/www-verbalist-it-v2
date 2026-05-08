import Image from 'next/image'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CloudArrowDownIcon } from '@/components/icons/cloud-arrow-down-icon'
import { CompassIcon } from '@/components/icons/compass-icon'
import { PencilOnSquareIcon } from '@/components/icons/pencil-on-square-icon'
import { PhotoIcon } from '@/components/icons/photo-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

export const metadata = {
  title: 'AI per content engineering SEO e GEO',
  description:
    'Verbalist trasforma keyword, SERP e competitor in contenuti SEO e GEO strutturati, pronti anche per la ricerca con AI come ChatGPT e Perplexity.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        eyebrow={
          <div aria-hidden="true" className="invisible">
            <AnnouncementBadge href="/blog/come-farsi-citare-motori-ai" text="Come farsi citare da ChatGPT e Perplexity" cta="Leggi la guida" />
          </div>
        }
        headline={<>Crea contenuti <br /> a partire dai dati di ricerca</>}
        subheadline={
          <p>
            Verbalist trasforma keyword, risultati Google e competitor in contenuti
            SEO strutturati, completi e pronti anche per la ricerca con AI.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Inizia subito
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
              Come funziona <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
          <>
            <Screenshot className="rounded-md lg:hidden" wallpaper="blue" placement="bottom-right">
              <Image
                src="/img/screenshots/dashboard-1670-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-white/75 md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-mist-left-1670-top-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-black/75 not-dark:hidden md:hidden"
              />
              <Image
                src="/img/screenshots/dashboard-2000-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-white/75 max-md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-mist-left-2000-top-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-black/75 not-dark:hidden max-md:hidden"
              />
            </Screenshot>
            <Screenshot className="rounded-lg max-lg:hidden" wallpaper="blue" placement="bottom">
              <Image
                src="/img/screenshots/dashboard.webp"
                alt=""
                className="bg-white/75 dark:hidden"
                width={3440}
                height={1990}
              />
              <Image
                className="bg-black/75 not-dark:hidden"
                src="/img/screenshots/1-color-mist.webp"
                alt=""
                width={3440}
                height={1990}
              />
            </Screenshot>
          </>
        }
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/rentokil.svg"
                alt="Rentokil"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/pompea.svg"
                alt="Pompea"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/meccanotecnica.svg"
                alt="Meccanotecnica"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/plastisac.svg"
                alt="Plastisac"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/sogese.svg"
                alt="Sogese"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/jurny.svg"
                alt="Jurny"
                width={100}
                height={32}
                className="brightness-0 dark:invert"
              />
            </Logo>
          </LogoGrid>
        }
      />
      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="Funzionalità"
        headline="Verbalist legge SERP, competitor e benchmark prima di scrivere il contenuto"
        subheadline={
          <p>
              Quando arrivi alla scrittura, brief e scaletta sono già pronti. Tutto costruito sui principali risultati della tua keyword, 
              in italiano e altre lingue. 
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-right">
                  <Image
                    src="/img/screenshots/docs-left-1000-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/docs-left-1800-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/docs-left-1300-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/docs-left-1800-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Analisi SERP"
              subheadline={
                <p>
                  Hai un brief con argomenti, struttura e domande coperte dai primi 10 di Google sulla tua keyword. 
                </p>
              }
              cta={
                <Link href="#">
                  Scopri come funziona <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-left">
                  <Image
                    src="/img/screenshots/docs-right-1000-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/docs-right-1800-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/docs-right-1300-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/docs-right-1800-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Generazione Contenuti "
              subheadline={
                <p>Articolo, scheda prodotto o landing pronti per l'editing in pochi minuti, sopra la SERP della tua keyword.</p>
              }
              cta={
                <Link href="#">
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
        eyebrow="Costruito per scalare"
        headline="Stesso lavoro, indipendentemente dall'effort"
        subheadline={
          <p>
            La pipeline non cambia in base al volume: analisi SERP, brief, generazione e ottimizzazione restano uguali per ogni contenuto. Cambia solo il numero di articoli che produci, in italiano e in tutte le altre lingue supportate dal sistema.
          </p>
        }
      >
        <Stat stat="30+" text="Lingue supportate, dall'analisi della SERP alla generazione del testo finale." />
        <Stat stat="~5 min" text="Tempo medio dalla keyword al brief con prima bozza pronta." />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Un agente per ogni scopo"
        subheadline={<p>Architettura multi-agente: ogni fase del flusso editoriale è gestita da un agente specialista dedicato.</p>}
      >
        <Testimonial
          quote={
            <p>
              Legge le prime 10 posizioni di Google per la keyword target. Estrae argomenti ricorrenti, struttura editoriale e domande coperte dai competitor, costruendo il brief di base.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <CompassIcon className="size-6 text-mist-700 dark:text-mist-300" />
            </div>
          }
          name="Esploratore"
          byline="Analisi"
        />
        <Testimonial
          quote={
            <p>
              Scarica il contenuto dei top competitor in modalità stealth. Pulisce l'HTML, rimuove navigazione e ads, mantiene solo il testo utile per la fase di analisi.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <CloudArrowDownIcon className="size-6 text-mist-700 dark:text-mist-300" />
            </div>
          }
          name="Estrattore"
          byline="Scraping"
        />
        <Testimonial
          quote={
            <p>
              Accetta in input gli URL forniti dall'utente, ne legge il contenuto e lo aggiunge al contesto di generazione, accanto ai dati raccolti dalla SERP e dai competitor.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-mist-700 dark:text-mist-300"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
          }
          name="Importatore"
          byline="Input custom"
        />
        <Testimonial
          quote={
            <p>
              Genera il primo testo a partire dalle evidenze raccolte: articolo, scheda prodotto, guida o landing. Output in Markdown o HTML, in italiano e nelle altre lingue supportate.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <PencilOnSquareIcon className="size-6 text-mist-700 dark:text-mist-300" />
            </div>
          }
          name="Redattore"
          byline="Generazione"
        />
        <Testimonial
          quote={
            <p>
              Confronta il testo generato con la SERP corrente per la keyword target. Segnala argomenti mancanti, sezioni datate e gap di copertura rispetto ai top result.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <RepeatIcon className="size-6 text-mist-700 dark:text-mist-300" />
            </div>
          }
          name="Revisore"
          byline="Ottimizzazione"
        />
        <Testimonial
          quote={
            <p>
              Genera le immagini a corredo del testo: asset per il blog, copertine per il social, infografiche dei dati. Output coerente con il tono editoriale del contenuto.
            </p>
          }
          img={
            <div className="flex items-center justify-center bg-mist-200 dark:bg-mist-800">
              <PhotoIcon className="size-6 text-mist-700 dark:text-mist-300" />
            </div>
          }
          name="Illustratore"
          byline="Media"
        />
      </TestimonialThreeColumnGrid>
      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Domande e risposte">
        <Faq
          id="faq-1"
          question="Serve la carta di credito per provarlo?"
          answer="No. Il free trial parte senza inserire metodi di pagamento. La carta si aggiunge solo al passaggio a un piano a pagamento."
        />
        <Faq
          id="faq-2"
          question="In cosa è diverso da ChatGPT o Gemini?"
          answer="ChatGPT e Gemini scrivono a partire da un prompt. Verbalist parte da una pipeline di analisi: SERP della keyword, scraping dei competitor, brief strutturato. Il testo arriva sopra dati reali, non sull'addestramento generico del modello."
        />
        <Faq
          id="faq-3"
          question="Posso usare i contenuti nel mio CMS?"
          answer="Sì. L'output esce in Markdown o HTML pulito, pronto per copia-incolla in WordPress, Webflow, Shopify o nel tuo CMS headless di riferimento."
        />
        <Faq
          id="faq-4"
          question="Il testo rispetta il mio tone of voice?"
          answer="Sì. Imposti il brand tone una volta nella sezione Impostazioni e Verbalist lo applica a ogni nuovo contenuto. Resta rifinibile prima della pubblicazione, l'editor finale sei tu."
        />
      </FAQsTwoColumnAccordion>
      {/* Pricing */}
      <PricingMultiTier
        id="pricing"
        headline="Prezzi basati sui contenuti che produci"
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
                  Inizia la prova
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
                <SoftButtonLink href="https://share-eu1.hsforms.com/1QmfwKDraSVOGP3_N6WSMHAft3vh" size="lg">
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
        headline="Pronto a comparire nelle ricerche AI?"
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
