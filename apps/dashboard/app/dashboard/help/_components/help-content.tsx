"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  GraduationCap,
  LifeBuoy,
  Mail,
  ExternalLink,
  RotateCcw,
  BookOpen,
  History,
  Sparkles,
  Zap,
  Image as ImageIcon,
} from "lucide-react"
import { useDashboardLocale } from "../../_lib/dashboard-locale"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import { VideoEmbed } from "@/components/dashboard/video-embed"
import { openOnboardingTour } from "@/components/dashboard/onboarding-dialog"

// ── Asset placeholders ──────────────────────────────────────────────────────
// Video tutorial — MP4 self-hosted in apps/dashboard/public/guide/ (nessuna terza parte/cookie).
// Per sostituirli basta rimpiazzare i file mantenendo gli stessi nomi.
const VIDEO_NEW_DOC: string | undefined = "/guide/nuovo-documento.mp4"
const VIDEO_OPTIMIZE: string | undefined = "/guide/ottimizza-documento.mp4"
// TODO(NUR): infografica "Come usare Verbalist". Quando pronta, salvala in
//   apps/dashboard/public/guide/come-usare-verbalist.png e imposta il path qui.
const INFOGRAPHIC_SRC: string | undefined = undefined

// TODO(NUR): confermare l'indirizzo reale di assistenza.
const SUPPORT_EMAIL = "supporto@verbalist.it"
// TODO: derivare dal piano reale dell'utente (oggi mock, cfr. layout / subscription).
const USER_PLAN = "Professional"

// Base URL del marketing site (come in layout.tsx).
const SITE = process.env.NEXT_PUBLIC_SITE_URL || ""
const siteUrl = (path: string) => (SITE ? `${SITE}${path}` : path)

export function HelpContent() {
  const { t } = useDashboardLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tab = searchParams.get("tab") === "assistenza" ? "assistenza" : "guide"
  const setTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const text = t({
    it: {
      title: "Aiuto",
      subtitle: "Guide, video e supporto per sfruttare al meglio Verbalist",
      tabs: { guide: "Guide", assistance: "Assistenza" },
      guide: {
        intro: "Brevi video e risorse per imparare i flussi principali.",
        reviewTour: "Rivedi il tour",
        comingSoon: "Video in arrivo",
        video1Title: "Creare un nuovo documento",
        video1Desc: "Genera un contenuto ottimizzato partendo dalle parole chiave.",
        video2Title: "Ottimizzare un documento esistente",
        video2Desc: "Migliora un testo che hai già, partendo dal contenuto.",
        infographicTitle: "Come usare Verbalist",
        infographicDesc: "L'infografica con il flusso completo, passo per passo.",
        infographicComingTitle: "Infografica in lavorazione",
        infographicComingDesc: "Sarà disponibile a breve.",
      },
      support: {
        contactTitle: "Contatta il supporto",
        contactDesc: "Scrivici e ti rispondiamo il prima possibile.",
        writeUs: "Scrivici",
        contactForm: "Modulo di contatto",
        planNote: (plan: string) => `Piano ${plan} · supporto prioritario incluso.`,
        faqTitle: "Domande frequenti",
        faqDesc: "Le risposte rapide alle domande più comuni.",
        faq: [
          {
            q: "Come funzionano i crediti?",
            a: "Ogni documento generato consuma crediti dal tuo ciclo mensile. Trovi il residuo in alto a destra e il dettaglio nella sezione Abbonamento.",
          },
          {
            q: "In quali formati posso esportare?",
            a: "Puoi copiare il testo o scaricare il documento in Markdown, HTML o testo semplice direttamente dall'editor.",
          },
          {
            q: "Come cambio piano?",
            a: "Vai in Abbonamento e scegli il piano adatto: l'aggiornamento è immediato e i crediti si adeguano al nuovo ciclo.",
          },
          {
            q: "Posso scegliere lingua e località per l'analisi SERP?",
            a: "Sì: durante la creazione di un documento imposti lingua e località su cui Verbalist esegue l'analisi SERP e la ricerca keyword.",
          },
        ],
        resourcesTitle: "Risorse",
        resourcesDesc: "Approfondimenti sul sito Verbalist.",
        helpCenter: "Centro assistenza",
        changelog: "Novità",
        features: "Funzionalità",
      },
    },
    en: {
      title: "Help",
      subtitle: "Guides, videos, and support to get the most out of Verbalist",
      tabs: { guide: "Guides", assistance: "Assistance" },
      guide: {
        intro: "Short videos and resources to learn the main flows.",
        reviewTour: "Review the tour",
        comingSoon: "Video coming soon",
        video1Title: "Create a new document",
        video1Desc: "Generate optimized content starting from keywords.",
        video2Title: "Optimize an existing document",
        video2Desc: "Improve a text you already have, starting from the content.",
        infographicTitle: "How to use Verbalist",
        infographicDesc: "The infographic with the full step-by-step flow.",
        infographicComingTitle: "Infographic in progress",
        infographicComingDesc: "It will be available soon.",
      },
      support: {
        contactTitle: "Contact support",
        contactDesc: "Write to us and we'll get back to you as soon as possible.",
        writeUs: "Write to us",
        contactForm: "Contact form",
        planNote: (plan: string) => `${plan} plan · priority support included.`,
        faqTitle: "Frequently asked questions",
        faqDesc: "Quick answers to the most common questions.",
        faq: [
          {
            q: "How do credits work?",
            a: "Each generated document consumes credits from your monthly cycle. The remaining balance is shown top-right, with details in the Subscription section.",
          },
          {
            q: "Which formats can I export to?",
            a: "You can copy the text or download the document as Markdown, HTML, or plain text directly from the editor.",
          },
          {
            q: "How do I change plan?",
            a: "Go to Subscription and pick the plan you need: the change is immediate and credits adjust to the new cycle.",
          },
          {
            q: "Can I choose language and location for the SERP analysis?",
            a: "Yes: when creating a document you set the language and location Verbalist uses for SERP analysis and keyword research.",
          },
        ],
        resourcesTitle: "Resources",
        resourcesDesc: "Deep dives on the Verbalist website.",
        helpCenter: "Help Center",
        changelog: "What's new",
        features: "Features",
      },
    },
  })

  const resources = [
    { label: text.support.helpCenter, href: siteUrl("/helpcenter/home"), icon: BookOpen },
    { label: text.support.changelog, href: siteUrl("/changelog/home"), icon: History },
    { label: text.support.features, href: siteUrl("/funzionalita/home"), icon: Sparkles },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <PageHeading>{text.title}</PageHeading>
        <PageDescription>{text.subtitle}</PageDescription>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="guide">
            <GraduationCap />
            {text.tabs.guide}
          </TabsTrigger>
          <TabsTrigger value="assistenza">
            <LifeBuoy />
            {text.tabs.assistance}
          </TabsTrigger>
        </TabsList>

        {/* ── Guide ─────────────────────────────────────────────────────── */}
        <TabsContent value="guide" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{text.guide.intro}</p>
            <Button variant="outline" size="sm" onClick={() => openOnboardingTour()}>
              <RotateCcw className="mr-2 size-4" />
              {text.guide.reviewTour}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{text.guide.video1Title}</CardTitle>
                <CardDescription>{text.guide.video1Desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <VideoEmbed
                  src={VIDEO_NEW_DOC}
                  title={text.guide.video1Title}
                  comingSoonLabel={text.guide.comingSoon}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{text.guide.video2Title}</CardTitle>
                <CardDescription>{text.guide.video2Desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <VideoEmbed
                  src={VIDEO_OPTIMIZE}
                  title={text.guide.video2Title}
                  comingSoonLabel={text.guide.comingSoon}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{text.guide.infographicTitle}</CardTitle>
              <CardDescription>{text.guide.infographicDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              {INFOGRAPHIC_SRC ? (
                // Quando l'asset è pronto: immagine responsive (lightbox/download da aggiungere se serve).
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={INFOGRAPHIC_SRC}
                  alt={text.guide.infographicTitle}
                  className="w-full rounded-lg border"
                />
              ) : (
                <Empty className="border bg-muted/30">
                  <EmptyMedia variant="icon">
                    <ImageIcon />
                  </EmptyMedia>
                  <EmptyTitle>{text.guide.infographicComingTitle}</EmptyTitle>
                  <EmptyDescription>{text.guide.infographicComingDesc}</EmptyDescription>
                </Empty>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Assistenza ────────────────────────────────────────────────── */}
        <TabsContent value="assistenza" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="size-5" />
                  <CardTitle className="text-base">{text.support.contactTitle}</CardTitle>
                </div>
                <CardDescription>{text.support.contactDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="accent" size="sm">
                    <a href={`mailto:${SUPPORT_EMAIL}`}>
                      <Mail className="mr-2 size-4" />
                      {text.support.writeUs}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={siteUrl("/forms/contact")} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 size-4" />
                      {text.support.contactForm}
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{SUPPORT_EMAIL}</p>
                <Separator />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="size-4 shrink-0" />
                  <span>{text.support.planNote(USER_PLAN)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{text.support.faqTitle}</CardTitle>
                <CardDescription>{text.support.faqDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {text.support.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-b last:border-b-0"
                    >
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{text.support.resourcesTitle}</CardTitle>
              <CardDescription>{text.support.resourcesDesc}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {resources.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted"
                >
                  <r.icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="font-medium">{r.label}</span>
                  <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
                </a>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
