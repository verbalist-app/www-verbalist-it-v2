import Image from 'next/image'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'

export const metadata = {
  title: 'Brand kit',
  description:
    "Logotipo, marchio, palette colori, tipografia e regole d'uso del brand Verbalist.",
  alternates: { canonical: '/brand' },
}

const namingRules = [
  {
    rule: 'Verbalist',
    note: 'Sempre con la V maiuscola, sempre per esteso. Mai "verbalist" né "VERBALIST".',
  },
  {
    rule: 'NUR S.r.l. è l\'azienda. Verbalist è il prodotto.',
    note: 'NUR sviluppa e gestisce Verbalist. Nei copyright, footer, contratti compare NUR. Nelle CTA, headline, materiali di prodotto compare Verbalist.',
  },
  {
    rule: 'Niente sinonimi forzati',
    note: 'In un testo Verbalist resta Verbalist. Evita "la piattaforma", "la soluzione", "il sistema" usati come sinonimo per evitare ripetizione.',
  },
]

type LogoVariant = {
  label: string
  fileName: string
  download: string
  src: string
  bg: string
  border: string
  fileText: string
  labelText: string
  width: number
  height: number
}

const logoVariants: LogoVariant[] = [
  {
    label: 'Logotipo, versione scura',
    fileName: 'verbalist-logotype-dark.svg',
    download: '/img/brand/verbalist-logotype-dark.svg',
    src: '/img/brand/verbalist-logotype-dark.svg',
    bg: 'bg-mist-50',
    border: 'border-mist-200',
    fileText: 'text-mist-500',
    labelText: 'text-mist-950',
    width: 240,
    height: 70,
  },
  {
    label: 'Logotipo, versione chiara',
    fileName: 'verbalist-logotype-light.svg',
    download: '/img/brand/verbalist-logotype-light.svg',
    src: '/img/brand/verbalist-logotype-light.svg',
    bg: 'bg-mist-950',
    border: 'border-mist-800',
    fileText: 'text-mist-500',
    labelText: 'text-white',
    width: 240,
    height: 70,
  },
  {
    label: 'Marchio, versione scura',
    fileName: 'verbalist-mark-dark.svg',
    download: '/img/brand/verbalist-mark-dark.svg',
    src: '/img/brand/verbalist-mark-dark.svg',
    bg: 'bg-mist-50',
    border: 'border-mist-200',
    fileText: 'text-mist-500',
    labelText: 'text-mist-950',
    width: 112,
    height: 112,
  },
  {
    label: 'Marchio, versione chiara',
    fileName: 'verbalist-mark-light.svg',
    download: '/img/brand/verbalist-mark-light.svg',
    src: '/img/brand/verbalist-mark-light.svg',
    bg: 'bg-mist-950',
    border: 'border-mist-800',
    fileText: 'text-mist-500',
    labelText: 'text-white',
    width: 112,
    height: 112,
  },
]

type SwatchToken = { name: string; oklch: string; hex: string; isPrimary?: boolean }

const wallpapers = [
  {
    color: 'blue' as const,
    name: 'Blue',
    note: 'Wallpaper primario, usato in home dietro lo screenshot della dashboard.',
    light: ['#637c86', '#778599'],
    dark: ['#243a42', '#232f40'],
  },
  {
    color: 'purple' as const,
    name: 'Purple',
    note: 'Wallpaper alternativo per blocchi feature e schermate secondarie.',
    light: ['#7b627d', '#8f6976'],
    dark: ['#412c42', '#3c1a26'],
  },
  {
    color: 'green' as const,
    name: 'Green',
    note: 'Wallpaper di servizio, da preferire per contenuti sensibili o documentazione.',
    light: ['#9ca88f', '#596352'],
    dark: ['#333a2b', '#26361b'],
  },
  {
    color: 'brown' as const,
    name: 'Brown',
    note: 'Wallpaper neutro caldo, riservato a customer story e materiali editoriali.',
    light: ['#8d7359', '#765959'],
    dark: ['#382d23', '#3d2323'],
  },
]

const mistPalette: SwatchToken[] = [
  { name: 'mist-50', oklch: 'oklch(98.7% 0.002 197.1)', hex: '#FAFCFC' },
  { name: 'mist-100', oklch: 'oklch(96.3% 0.002 197.1)', hex: '#F2F5F5' },
  { name: 'mist-200', oklch: 'oklch(92.5% 0.005 214.3)', hex: '#E5EAEC' },
  { name: 'mist-300', oklch: 'oklch(87.2% 0.007 219.6)', hex: '#D2D9DD' },
  { name: 'mist-400', oklch: 'oklch(72.3% 0.014 214.4)', hex: '#9DA8AE' },
  { name: 'mist-500', oklch: 'oklch(56% 0.021 213.5)', hex: '#6B7980' },
  { name: 'mist-600', oklch: 'oklch(45% 0.017 213.2)', hex: '#535F65' },
  { name: 'mist-700', oklch: 'oklch(37.8% 0.015 216)', hex: '#414C52' },
  { name: 'mist-800', oklch: 'oklch(27.5% 0.011 216.9)', hex: '#2C353A' },
  { name: 'mist-900', oklch: 'oklch(21.8% 0.008 223.9)', hex: '#1F262B' },
  { name: 'mist-950', oklch: 'oklch(14.8% 0.004 228.8)', hex: '#11151A', isPrimary: true },
]

const tovPrinciples = [
  {
    title: 'Chiaro per chiunque, mai infantile',
    body: 'Verbalist parla a marketing manager, founder, copywriter. Lessico tecnico ammesso (SEO, SERP, brief, intent), ma niente claim vuoti né registro esclamativo.',
  },
  {
    title: 'Concreto, non vago',
    body: 'Dire cosa fa la feature, quando interviene, per chi. Verbi all\'inizio o frase nominale. 1-2 frasi per descrizione, max 20 parole.',
  },
  {
    title: 'Verbalist suggerisce, non decide',
    body: 'Lo strumento aiuta, propone, segnala. Non sceglie al posto dell\'utente. "Ti suggerisce cosa includere" è meglio di "ti dice cosa fare".',
  },
  {
    title: 'Niente segni di scrittura AI',
    body: 'Niente em-dash, niente virgolette curve, niente "non solo X ma anche Y", niente parole-tic come "valorizzare", "ridefinire", "paesaggio", "robusto", "perenne".',
  },
]

const tovExamples = [
  {
    bad: 'Verbalist rappresenta la soluzione end-to-end pensata per valorizzare al massimo il tuo content marketing.',
    good: 'Verbalist scrive contenuti SEO a partire da SERP e keyword reali.',
  },
  {
    bad: 'Una piattaforma robusta che ridefinisce il modo in cui crei contenuti, non solo testi ma vere strategie.',
    good: 'Verbalist ti suggerisce cosa scrivere, in che ordine, e con quali fonti.',
  },
  {
    bad: 'L\'AI sceglie per te il brief migliore, automaticamente.',
    good: 'Verbalist propone un brief: tu decidi cosa tenere e cosa cambiare.',
  },
]

const dos = [
  'Usa il logotipo su sfondi chiari, scuri o neutri della palette base.',
  'Mantieni le proporzioni originali, senza alterazioni di scala non uniformi.',
  'Lascia un\'area di rispetto pari almeno all\'altezza della V del marchio.',
  'Per dimensioni ridotte sotto i 24px usa il marchio, non il logotipo completo.',
]

const donts = [
  'Non ruotare, deformare o aggiungere effetti (ombre, bordi, contorni).',
  'Non ricolorare il logotipo con tinte fuori dalla palette ufficiale.',
  'Non posizionarlo su immagini o pattern che ne riducono la leggibilità.',
  'Non ricostruire il logotipo a mano: usa sempre i file SVG forniti.',
]

const pngVariants = [
  { label: 'Logotipo scuro, 512×151', file: 'verbalist-logotype-dark-512.png' },
  { label: 'Logotipo scuro, 1024×302', file: 'verbalist-logotype-dark-1024.png' },
  { label: 'Logotipo chiaro, 512×151', file: 'verbalist-logotype-light-512.png' },
  { label: 'Logotipo chiaro, 1024×302', file: 'verbalist-logotype-light-1024.png' },
  { label: 'Marchio scuro, 512×512', file: 'verbalist-mark-dark-512.png' },
  { label: 'Marchio scuro, 1024×1024', file: 'verbalist-mark-dark-1024.png' },
  { label: 'Marchio chiaro, 512×512', file: 'verbalist-mark-light-512.png' },
  { label: 'Marchio chiaro, 1024×1024', file: 'verbalist-mark-light-1024.png' },
]

function NumberedEyebrow({ n, label }: { n: string; label: string }) {
  return (
    <Eyebrow className="font-mono uppercase tracking-wider text-mist-500 dark:text-mist-400">
      {n} / {label}
    </Eyebrow>
  )
}

export default function Page() {
  return (
    <>
      <HeroSimpleLeftAligned
        eyebrow={<Eyebrow>Brand</Eyebrow>}
        headline="Brand Guidelines"
        subheadline={
          <p>
            Pagina di riferimento per chi progetta e produce comunicazione Verbalist:
            fiere, social, presentazioni, materiali stampa. Qui trovi logotipo,
            marchio, palette colori, tipografia, pattern, tono di voce e regole
            d&rsquo;uso.
          </p>
        }
        cta={
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/img/brand/verbalist-brand-kit.zip" size="lg" download>
              Scarica il brand kit (zip)
            </ButtonLink>
            <span className="font-mono text-xs text-mist-500 dark:text-mist-400">
              Logo SVG + PNG
            </span>
          </div>
        }
      />

      {/* 01 / Naming */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="flex flex-col gap-3 lg:col-span-1">
              <NumberedEyebrow n="01" label="Naming" />
              <Subheading>Come si scrive</Subheading>
              <Text>
                Tre regole brevi prima di mostrare il logo. Valgono nei copy,
                nelle slide, nelle email e nei materiali fiera.
              </Text>
            </div>
            <div className="flex flex-col divide-y divide-mist-200 border-y border-mist-200 lg:col-span-2 dark:divide-mist-800 dark:border-mist-800">
              {namingRules.map((r) => (
                <div
                  key={r.rule}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-3 sm:gap-6"
                >
                  <h3 className="text-base font-medium text-mist-950 sm:col-span-1 dark:text-white">
                    {r.rule}
                  </h3>
                  <p className="text-sm text-mist-700 sm:col-span-2 dark:text-mist-300">
                    {r.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 02 / Logo */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="02" label="Logo" />
            <Subheading>Logotipo e marchio</Subheading>
            <Text>
              Il logotipo &ldquo;Verbalist&rdquo; è la versione primaria, da
              preferire ovunque ci sia spazio per leggerlo. Il marchio (la V) è
              la versione ridotta, adatta a favicon, avatar, app icon, social
              profile.
            </Text>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
            {logoVariants.map((v) => (
              <div key={v.fileName} className={`flex flex-col ${v.bg}`}>
                <div className="flex aspect-[16/9] items-center justify-center p-12">
                  <Image
                    src={v.src}
                    alt={v.label}
                    width={v.width}
                    height={v.height}
                    className="h-auto w-auto max-h-20"
                  />
                </div>
                <div className={`flex items-center justify-between gap-4 border-t ${v.border} px-4 py-3`}>
                  <div className="flex flex-col">
                    <span className={`text-xs ${v.labelText}`}>{v.label}</span>
                    <span className={`font-mono text-xs ${v.fileText}`}>
                      {v.fileName}
                    </span>
                  </div>
                  <a
                    href={v.download}
                    download
                    className={`text-xs font-medium underline decoration-mist-400 underline-offset-4 hover:decoration-current ${v.labelText}`}
                  >
                    Scarica SVG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 / Spazi */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="flex flex-col gap-3 lg:col-span-1">
              <NumberedEyebrow n="03" label="Spazi" />
              <Subheading>Area di rispetto e dimensione minima</Subheading>
              <Text>
                Lascia attorno al logotipo uno spazio libero pari almeno
                all&rsquo;altezza della V del marchio. Niente testo, immagini o
                elementi grafici dentro quest&rsquo;area.
              </Text>
              <Text>
                Dimensione minima consigliata: 96px in larghezza per il
                logotipo, 24px per il marchio. Sotto questa soglia usa solo il
                marchio.
              </Text>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border border-mist-200 bg-mist-50 p-8 sm:p-12 lg:col-span-2 lg:p-16 dark:border-mist-800 dark:bg-mist-900">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-6 border border-dashed sm:-inset-8"
                  style={{ borderColor: 'rgba(110, 54, 221, 0.45)' }}
                />
                <span
                  className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: '#6E36DD' }}
                >
                  x
                </span>
                <span
                  className="absolute top-1/2 -left-6 -translate-y-1/2 -translate-x-full font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: '#6E36DD' }}
                >
                  x
                </span>
                <Image
                  src="/img/brand/verbalist-logotype-dark.svg"
                  alt="Logotipo Verbalist con area di rispetto"
                  width={240}
                  height={70}
                  className="relative h-10 w-auto sm:h-12 dark:hidden"
                />
                <Image
                  src="/img/brand/verbalist-logotype-light.svg"
                  alt="Logotipo Verbalist con area di rispetto"
                  width={240}
                  height={70}
                  className="relative h-10 w-auto not-dark:hidden sm:h-12"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 / Colori */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="04" label="Colori" />
            <Subheading>Palette</Subheading>
            <Text>
              Una sola famiglia: <strong className="text-mist-950 dark:text-white">mist</strong>,
              acromatica con tinta cool. Undici step da chiaro a scuro, usati
              per testo, struttura, sfondi e UI. <code className="font-mono text-[13px]">mist-100</code> è
              lo sfondo del sito, <code className="font-mono text-[13px]">mist-950</code> è il testo
              principale. I valori sono in OKLCH nei token CSS e in HEX per i
              tool di design.
            </Text>
          </div>

          <div className="mt-12">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-base font-medium text-mist-950 dark:text-white">
                Mist
              </h3>
              <span className="font-mono text-xs text-mist-500 dark:text-mist-400">
                testo principale: mist-950
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-11">
              {mistPalette.map((c) => (
                <div key={c.name} className="flex flex-col gap-2">
                  <div
                    className={`relative aspect-square w-full ${
                      c.name === 'mist-50' ? 'outline outline-mist-200 dark:outline-mist-800' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.isPrimary && (
                      <span className="absolute top-1 left-1 font-mono text-[9px] uppercase tracking-wider text-white/85">
                        testo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-mist-950 dark:text-white">
                      {c.name}
                    </span>
                    <span className="font-mono text-[11px] text-mist-600 dark:text-mist-400">
                      {c.hex}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 05 / Wallpaper */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="05" label="Wallpaper" />
            <Subheading>Wallpaper</Subheading>
            <Text>
              Quattro tinte muted con un grain SVG sopra. Si usano come sfondo
              per gli screenshot prodotto e per le scene editoriali. Sono un
              componente React (<code className="font-mono text-[13px]">Wallpaper</code>),
              non file da scaricare: si applicano via prop{' '}
              <code className="font-mono text-[13px]">color</code>.
            </Text>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
            {wallpapers.map((w) => (
              <div key={w.color} className="flex flex-col bg-mist-50 dark:bg-mist-900">
                <Wallpaper color={w.color} className="aspect-[16/10]" />
                <div className="flex items-start justify-between gap-4 border-t border-mist-200 px-4 py-3 dark:border-mist-800">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-mist-950 dark:text-white">
                      Wallpaper / {w.name}
                    </span>
                    <span className="text-xs text-mist-700 dark:text-mist-300">
                      {w.note}
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-mist-500 dark:text-mist-400">
                      <span>light: {w.light[0]} → {w.light[1]}</span>
                      <span>dark: {w.dark[0]} → {w.dark[1]}</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-mist-100 px-2 py-1 font-mono text-[11px] text-mist-700 dark:bg-mist-800 dark:text-mist-300">
                    color=&quot;{w.color}&quot;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 / Tipografia */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="06" label="Tipografia" />
            <Subheading>Font</Subheading>
            <Text>
              Due font, una scelta per ogni ruolo: titoli e testo. Sono
              entrambi gratuiti, open source e disponibili per Figma, Adobe e
              uso web.
            </Text>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 lg:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
            <div className="flex flex-col gap-4 bg-mist-50 p-6 dark:bg-mist-900">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-mist-500 dark:text-mist-400">
                  Display
                </span>
                <a
                  href="https://fonts.google.com/specimen/Familjen+Grotesk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-mist-700 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-mist-300"
                >
                  fonts.google.com
                </a>
              </div>
              <p className="font-display text-5xl leading-none tracking-tight text-mist-950 dark:text-white">
                Aa
              </p>
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-mist-950 dark:text-white">
                  Familjen Grotesk
                </span>
                <span className="text-sm text-mist-700 dark:text-mist-300">
                  Per titoli display e heading principali. Tracking stretto, peso 500.
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1 border-t border-mist-200 pt-4 font-mono text-xs text-mist-600 dark:border-mist-800 dark:text-mist-400">
                <span>--font-display: &quot;Familjen Grotesk&quot;</span>
                <span>weights: 400, 500, 600</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-mist-50 p-6 dark:bg-mist-900">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-mist-500 dark:text-mist-400">
                  Sans
                </span>
                <a
                  href="https://rsms.me/inter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-mist-700 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-mist-300"
                >
                  rsms.me/inter
                </a>
              </div>
              <p className="font-sans text-5xl leading-none text-mist-950 dark:text-white">
                Aa
              </p>
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-mist-950 dark:text-white">
                  Inter
                </span>
                <span className="text-sm text-mist-700 dark:text-mist-300">
                  Per body, paragrafi, UI e label. Versione variable per il web.
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1 border-t border-mist-200 pt-4 font-mono text-xs text-mist-600 dark:border-mist-800 dark:text-mist-400">
                <span>--font-sans: &quot;Inter&quot;</span>
                <span>weights: 400, 500, 600</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-medium text-mist-950 dark:text-white">
              Scala (estratto)
            </h3>
            <div className="mt-4 flex flex-col divide-y divide-mist-200 border-y border-mist-200 dark:divide-mist-800 dark:border-mist-800">
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="font-display text-3xl tracking-tight text-mist-950 sm:text-4xl dark:text-white">
                  Brand kit Verbalist
                </p>
                <span className="shrink-0 font-mono text-xs text-mist-500 dark:text-mist-400">
                  display LG · font-display
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="font-display text-2xl tracking-tight text-mist-950 sm:text-3xl dark:text-white">
                  Logotipo e marchio
                </p>
                <span className="shrink-0 font-mono text-xs text-mist-500 dark:text-mist-400">
                  display MD · font-display
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="text-base text-mist-700 dark:text-mist-300">
                  Per body e paragrafi usiamo Inter, peso 400.
                </p>
                <span className="shrink-0 font-mono text-xs text-mist-500 dark:text-mist-400">
                  text base · font-sans
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <p className="font-mono text-xs uppercase tracking-wider text-mist-500 dark:text-mist-400">
                  Eyebrow / metadati
                </p>
                <span className="shrink-0 font-mono text-xs text-mist-500 dark:text-mist-400">
                  text XS · font-mono
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 07 / Tone of voice */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="07" label="Tono di voce" />
            <Subheading>Come parla Verbalist</Subheading>
            <Text>
              Quattro principi per i copy. Vale per claim sito, social, slide
              demo, newsletter e materiali fiera.
            </Text>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
            {tovPrinciples.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col gap-2 bg-mist-50 p-6 dark:bg-mist-900"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-mist-500 dark:text-mist-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-medium text-mist-950 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-mist-700 dark:text-mist-300">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-base font-medium text-mist-950 dark:text-white">
              Esempi
            </h3>
            <p className="mt-1 text-sm text-mist-700 dark:text-mist-300">
              A sinistra il pattern da evitare, a destra come riscriverlo.
            </p>
            <div className="mt-4 flex flex-col divide-y divide-mist-200 border-y border-mist-200 dark:divide-mist-800 dark:border-mist-800">
              {tovExamples.map((ex) => (
                <div key={ex.good} className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-mist-50/60 p-4 lg:border-r lg:border-mist-200 dark:bg-mist-900/40 dark:lg:border-mist-800">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mist-200 text-xs font-medium text-mist-950 dark:bg-mist-800 dark:text-white">
                        ×
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mist-500 dark:text-mist-400">
                        Da evitare
                      </span>
                    </div>
                    <p className="text-sm text-mist-600 line-through decoration-mist-400/60 dark:text-mist-400">
                      {ex.bad}
                    </p>
                  </div>
                  <div className="bg-mist-50 p-4 dark:bg-mist-900">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mist-950 text-xs font-medium text-mist-50 dark:bg-white dark:text-mist-950">
                        +
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mist-500 dark:text-mist-400">
                        Da preferire
                      </span>
                    </div>
                    <p className="text-sm text-mist-950 dark:text-white">{ex.good}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 08 / Regole */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="flex max-w-2xl flex-col gap-3">
            <NumberedEyebrow n="08" label="Regole" />
            <Subheading>Cosa fare, cosa evitare</Subheading>
            <Text>
              Le regole valgono per logotipo e marchio, su qualsiasi supporto:
              digitale, stampa, materiali fiera, social.
            </Text>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 lg:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
            <div className="bg-mist-50 p-6 dark:bg-mist-900">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mist-950 text-xs font-medium text-mist-50 dark:bg-white dark:text-mist-950">
                  +
                </span>
                <h3 className="text-base font-medium text-mist-950 dark:text-white">
                  Da fare
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-mist-700 dark:text-mist-300">
                {dos.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="shrink-0 font-mono text-mist-400 dark:text-mist-500">
                      ///
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-mist-50 p-6 dark:bg-mist-900">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mist-200 text-xs font-medium text-mist-950 dark:bg-mist-800 dark:text-white">
                  ×
                </span>
                <h3 className="text-base font-medium text-mist-950 dark:text-white">
                  Da evitare
                </h3>
              </div>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-mist-700 dark:text-mist-300">
                {donts.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="shrink-0 font-mono text-mist-400 dark:text-mist-500">
                      ///
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 09 / Risorse */}
      <section className="border-t border-mist-200 py-16 dark:border-mist-800">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="flex flex-col gap-3 lg:col-span-1">
              <NumberedEyebrow n="09" label="Risorse" />
              <Subheading>Asset</Subheading>
              <Text>
                Tutto in un unico zip oppure singoli file. SVG per uso
                vettoriale, PNG per chi non lavora in vettoriale (slide, social,
                anteprime).
              </Text>
              <a
                href="/img/brand/verbalist-brand-kit.zip"
                download
                className="mt-4 inline-flex w-fit items-center justify-between gap-4 bg-mist-950 px-4 py-3 transition-colors hover:bg-mist-800 dark:bg-white dark:hover:bg-mist-200"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-mist-50 dark:text-mist-950">
                    Brand kit completo
                  </span>
                  <span className="font-mono text-xs text-mist-400 dark:text-mist-600">
                    verbalist-brand-kit.zip
                  </span>
                </div>
                <span className="ml-2 text-xs font-medium text-mist-50 underline decoration-mist-700 underline-offset-4 dark:text-mist-950 dark:decoration-mist-400">
                  Scarica ZIP
                </span>
              </a>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-2">
              <div>
                <h3 className="text-base font-medium text-mist-950 dark:text-white">
                  Logo (SVG)
                </h3>
                <div className="mt-2 flex flex-col gap-px border border-mist-200 bg-mist-200 dark:border-mist-800 dark:bg-mist-800">
                  {logoVariants.map((v) => (
                    <a
                      key={v.fileName}
                      href={v.download}
                      download
                      className="flex items-center justify-between gap-4 bg-mist-50 px-4 py-3 transition-colors hover:bg-mist-100 dark:bg-mist-900 dark:hover:bg-mist-800"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-mist-950 dark:text-white">
                          {v.label}
                        </span>
                        <span className="font-mono text-xs text-mist-500 dark:text-mist-400">
                          {v.fileName}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-mist-950 underline decoration-mist-400 underline-offset-4 dark:text-white">
                        SVG
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-mist-950 dark:text-white">
                  Logo (PNG, 512 e 1024)
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 dark:border-mist-800 dark:bg-mist-800">
                  {pngVariants.map((v) => (
                    <a
                      key={v.file}
                      href={`/img/brand/${v.file}`}
                      download
                      className="flex items-center justify-between gap-3 bg-mist-50 px-4 py-3 transition-colors hover:bg-mist-100 dark:bg-mist-900 dark:hover:bg-mist-800"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-medium text-mist-950 dark:text-white">
                          {v.label}
                        </span>
                        <span className="truncate font-mono text-[11px] text-mist-500 dark:text-mist-400">
                          {v.file}
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] font-medium text-mist-950 underline decoration-mist-400 underline-offset-4 dark:text-white">
                        PNG
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
