"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  ShoppingBag,
  BookOpen,
  Layout,
  Link as LinkIcon,
  Type,
  Sparkles,
  Check,
  Loader2,
  ChevronsUpDown,
  Languages,
  MapPin,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog"
import { useDashboardLocale } from "../../../_lib/dashboard-locale"

const DRAFT_STORAGE_KEY = "verbalist:new-document-draft"

type DocumentDraft = {
  outputType: string
  contentMode: string
  keyword: string
  contentUrl: string
  contentText: string
  project: string
  inputMode: "url" | "text"
  locationCode: string
  languageCode: string
  step: number
}
import { googleLanguages, getLanguageByCode } from "../../../_lib/google-languages"
import { googleLocations, getLocationByCode } from "../../../_lib/google-locations"

const outputTypeIcons = {
  blog_post: FileText,
  product_page: ShoppingBag,
  guide: BookOpen,
  landing_page: Layout,
} as const

function NewDocumentInner() {
  const { t } = useDashboardLocale()

  const content = {
    documents: { it: "Documenti", en: "Documents" },
    newDocument: { it: "Nuovo documento", en: "New document" },
    newDocumentDescription: {
      it: "Crea un nuovo contenuto ottimizzato per SEO",
      en: "Create new SEO-optimized content",
    },
    progressLabel: {
      it: "Progressi creazione documento",
      en: "Document creation progress",
    },
    step: { it: "Passaggio", en: "Step" },
    completed: { it: "completato", en: "completed" },
    current: { it: "corrente", en: "current" },
    contentType: { it: "Tipo di contenuto", en: "Content type" },
    contentTypeDescription: {
      it: "Seleziona il tipo di contenuto che vuoi generare",
      en: "Select the type of content you want to generate",
    },
    continue: { it: "Continua", en: "Continue" },
    mode: { it: "Modalità", en: "Mode" },
    existingContent: { it: "Contenuto esistente", en: "Existing content" },
    url: { it: "URL", en: "URL" },
    text: { it: "Testo", en: "Text" },
    urlPlaceholder: {
      it: "https://www.esempio.com/pagina",
      en: "https://www.example.com/page",
    },
    textPlaceholder: {
      it: "Incolla qui il contenuto da ottimizzare...",
      en: "Paste content to optimize here...",
    },
    mainKeyword: { it: "Parole chiave SEO", en: "SEO keywords" },
    mainKeywordDescription: {
      it: "Sono le parole con cui vuoi che il contenuto venga trovato su Google. Non sono un prompt — usa una keyword principale e fino a 3-4 varianti.",
      en: "These are the words you want the content to rank for on Google. They are not a prompt — use one main keyword and up to 3-4 variants.",
    },
    keywordPlaceholder: {
      it: "es. seo 2025, ottimizzazione organica, ranking google",
      en: "e.g., seo 2025, organic optimization, google ranking",
    },
    keywordSeparatorHint: {
      it: "Separa più keyword con la virgola.",
      en: "Separate multiple keywords with a comma.",
    },
    keywordExtractFromText: {
      it: "Estrarremo automaticamente keyword aggiuntive dal testo che hai incollato.",
      en: "We'll automatically extract additional keywords from the pasted text.",
    },
    serpSettings: {
      it: "Localizzazione ricerca",
      en: "Search localization",
    },
    serpSettingsDescription: {
      it: "L'analisi SERP e la ricerca keyword verranno eseguite per questa lingua e localita",
      en: "SERP analysis and keyword research will be performed for this language and location",
    },
    location: { it: "Localita", en: "Location" },
    locationPlaceholder: { it: "Cerca paese...", en: "Search country..." },
    locationEmpty: { it: "Nessun paese trovato.", en: "No country found." },
    language: { it: "Lingua", en: "Language" },
    languagePlaceholder: { it: "Cerca lingua...", en: "Search language..." },
    languageEmpty: { it: "Nessuna lingua trovata.", en: "No language found." },
    projectOptional: { it: "Progetto", en: "Project" },
    projectRequiredHint: {
      it: "Ogni documento appartiene a un progetto. Scegline uno o creane uno nuovo.",
      en: "Every document belongs to a project. Pick one or create a new one.",
    },
    selectProject: { it: "Seleziona un progetto", en: "Select a project" },
    createNewProject: { it: "+ Crea nuovo progetto", en: "+ Create new project" },
    back: { it: "Indietro", en: "Back" },
    summary: { it: "Riepilogo", en: "Summary" },
    summaryDescription: {
      it: "Controlla i dettagli e avvia la generazione",
      en: "Check details and start generation",
    },
    contentTypeSummary: { it: "Tipo contenuto", en: "Content type" },
    modeSummary: { it: "Modalità", en: "Mode" },
    newContent: { it: "Da parole chiave", en: "From keywords" },
    optimization: { it: "Da testo", en: "From text" },
    keyword: { it: "Keyword", en: "Keyword" },
    contentToOptimize: {
      it: "Contenuto da ottimizzare",
      en: "Content to optimize",
    },
    project: { it: "Progetto", en: "Project" },
    whatWillHappen: { it: "Cosa succederà", en: "What will happen" },
    locationSummary: { it: "Localita", en: "Location" },
    languageSummary: { it: "Lingua", en: "Language" },
    serpAnalysis: {
      it: "Analisi SERP per la keyword",
      en: "SERP analysis for keyword",
    },
    scraping: {
      it: "Scraping dei top 10 risultati Google",
      en: "Scraping top 10 Google results",
    },
    patterns: {
      it: "Identificazione pattern vincenti",
      en: "Identifying winning patterns",
    },
    generation: {
      it: "Generazione contenuto ottimizzato",
      en: "Generating optimized content",
    },
    estimatedTime: {
      it: "Tempo stimato: 2-3 minuti · ~20 crediti",
      en: "Estimated time: 2-3 minutes · ~20 credits",
    },
    generateContent: { it: "Genera contenuto", en: "Generate content" },
    generating: { it: "Generazione in corso...", en: "Generating..." },
    // Output types
    blogPost: { it: "Blog Post", en: "Blog Post" },
    blogPostDesc: {
      it: "Articolo ottimizzato per SEO",
      en: "SEO-optimized article",
    },
    productPage: { it: "Pagina Prodotto", en: "Product Page" },
    productPageDesc: {
      it: "Descrizione prodotto per e-commerce",
      en: "E-commerce product description",
    },
    guide: { it: "Guida/Tutorial", en: "Guide/Tutorial" },
    guideDesc: {
      it: "Contenuto educativo approfondito",
      en: "In-depth educational content",
    },
    landingPage: { it: "Landing Page", en: "Landing Page" },
    landingPageDesc: { it: "Pagina di conversione", en: "Conversion page" },
    // Content modes
    createMode: { it: "Crea da parole chiave", en: "Create from keywords" },
    createModeDesc: {
      it: "Verbalist genera il contenuto da zero a partire da una keyword principale.",
      en: "Verbalist generates content from scratch starting from a main keyword.",
    },
    optimizeMode: {
      it: "Crea da testo",
      en: "Create from text",
    },
    optimizeModeDesc: {
      it: "Parti da un testo esistente (URL o bozza) che vuoi ottimizzare.",
      en: "Start from existing text (URL or draft) you want to optimize.",
    },
    draftRestored: {
      it: "Bozza ripristinata",
      en: "Draft restored",
    },
    draftRestoredDesc: {
      it: "Abbiamo recuperato il documento che stavi creando.",
      en: "We recovered the document you were creating.",
    },
    discardDraft: {
      it: "Scarta",
      en: "Discard",
    },
    unsavedChangesWarning: {
      it: "Hai un documento in creazione non salvato. Vuoi davvero uscire?",
      en: "You have an unsaved document in progress. Are you sure you want to leave?",
    },
  }

  const outputTypes = [
    {
      id: "blog_post",
      name: t(content.blogPost),
      description: t(content.blogPostDesc),
      icon: outputTypeIcons.blog_post,
    },
    {
      id: "product_page",
      name: t(content.productPage),
      description: t(content.productPageDesc),
      icon: outputTypeIcons.product_page,
    },
    {
      id: "guide",
      name: t(content.guide),
      description: t(content.guideDesc),
      icon: outputTypeIcons.guide,
    },
    {
      id: "landing_page",
      name: t(content.landingPage),
      description: t(content.landingPageDesc),
      icon: outputTypeIcons.landing_page,
    },
  ]

  const contentModes = [
    {
      id: "create",
      name: t(content.createMode),
      description: t(content.createModeDesc),
    },
    {
      id: "optimize",
      name: t(content.optimizeMode),
      description: t(content.optimizeModeDesc),
    },
  ]

  const baseProjects = React.useMemo(
    () => [
      { id: "1", name: t({ it: "Blog Aziendale", en: "Company Blog" }) },
      { id: "2", name: t({ it: "Landing Pages", en: "Landing Pages" }) },
      { id: "3", name: t({ it: "E-commerce", en: "E-commerce" }) },
      { id: "4", name: t({ it: "Guide Tecniche", en: "Technical Guides" }) },
    ],
    [t],
  )
  const [extraProjects, setExtraProjects] = React.useState<{ id: string; name: string }[]>([])
  const projects = React.useMemo(
    () => [...baseProjects, ...extraProjects],
    [baseProjects, extraProjects],
  )
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedType = searchParams.get("type")
  const preselectedProject = searchParams.get("project")

  const [step, setStep] = React.useState(1)
  const [isGenerating, setIsGenerating] = React.useState(false)

  // Form state
  const [outputType, setOutputType] = React.useState(preselectedType || "")
  const [contentMode, setContentMode] = React.useState("create")
  const [keyword, setKeyword] = React.useState("")
  const [contentUrl, setContentUrl] = React.useState("")
  const [contentText, setContentText] = React.useState("")
  const [project, setProject] = React.useState(preselectedProject || "")
  const [inputMode, setInputMode] = React.useState<"url" | "text">("url")
  const [locationCode, setLocationCode] = React.useState("IT")
  const [languageCode, setLanguageCode] = React.useState("it")
  const [locationOpen, setLocationOpen] = React.useState(false)
  const [languageOpen, setLanguageOpen] = React.useState(false)

  const canProceedStep1 = outputType !== ""
  const canProceedStep2 =
    keyword.trim() !== "" &&
    project !== "" &&
    (contentMode === "create" || contentUrl || contentText)

  const hasDraftContent = React.useMemo(
    () =>
      Boolean(
        outputType ||
          keyword.trim() ||
          contentUrl.trim() ||
          contentText.trim(),
      ),
    [outputType, keyword, contentUrl, contentText],
  )

  // Hydrate from sessionStorage on mount (only when no preselected params)
  const hydratedRef = React.useRef(false)
  React.useEffect(() => {
    if (hydratedRef.current) return
    hydratedRef.current = true
    if (preselectedType || preselectedProject) return
    if (typeof window === "undefined") return
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return
    try {
      const draft = JSON.parse(raw) as Partial<DocumentDraft>
      if (draft.outputType) setOutputType(draft.outputType)
      if (draft.contentMode) setContentMode(draft.contentMode)
      if (draft.keyword) setKeyword(draft.keyword)
      if (draft.contentUrl) setContentUrl(draft.contentUrl)
      if (draft.contentText) setContentText(draft.contentText)
      if (draft.project) setProject(draft.project)
      if (draft.inputMode === "url" || draft.inputMode === "text") {
        setInputMode(draft.inputMode)
      }
      if (draft.locationCode) setLocationCode(draft.locationCode)
      if (draft.languageCode) setLanguageCode(draft.languageCode)
      if (typeof draft.step === "number" && draft.step >= 1 && draft.step <= 3) {
        setStep(draft.step)
      }
      const hasValue =
        draft.outputType ||
        draft.keyword?.trim() ||
        draft.contentUrl?.trim() ||
        draft.contentText?.trim()
      if (hasValue) {
        toast.info(t(content.draftRestored), {
          description: t(content.draftRestoredDesc),
          action: {
            label: t(content.discardDraft),
            onClick: () => {
              window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
              setOutputType("")
              setContentMode("create")
              setKeyword("")
              setContentUrl("")
              setContentText("")
              setProject("")
              setInputMode("url")
              setLocationCode("IT")
              setLanguageCode("it")
              setStep(1)
            },
          },
        })
      }
    } catch {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist draft on every change
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (isGenerating) return
    if (!hasDraftContent) {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
      return
    }
    const draft: DocumentDraft = {
      outputType,
      contentMode,
      keyword,
      contentUrl,
      contentText,
      project,
      inputMode,
      locationCode,
      languageCode,
      step,
    }
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
  }, [
    hasDraftContent,
    isGenerating,
    outputType,
    contentMode,
    keyword,
    contentUrl,
    contentText,
    project,
    inputMode,
    locationCode,
    languageCode,
    step,
  ])

  // Warn before leaving with unsaved draft
  React.useEffect(() => {
    if (!hasDraftContent || isGenerating) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = t(content.unsavedChangesWarning)
      return e.returnValue
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [hasDraftContent, isGenerating, t, content.unsavedChangesWarning])

  const buildProvisionalTitle = () => {
    const typeLabels: Record<string, { it: string; en: string }> = {
      blog_post: { it: "Blog Post", en: "Blog Post" },
      product_page: { it: "Pagina Prodotto", en: "Product Page" },
      guide: { it: "Guida", en: "Guide" },
      landing_page: { it: "Landing Page", en: "Landing Page" },
    }
    const typeLabel = outputType ? t(typeLabels[outputType]) : t({ it: "Documento", en: "Document" })
    const now = new Date()
    const dateStr = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now)
    const kw = keyword.trim().slice(0, 40)
    return kw ? `${typeLabel} — ${dateStr} — ${kw}` : `${typeLabel} — ${dateStr}`
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
      window.sessionStorage.setItem(
        "verbalist:last-generated-title",
        buildProvisionalTitle(),
      )
      window.sessionStorage.setItem(
        "verbalist:last-generated-meta",
        JSON.stringify({
          createdAt: new Date().toISOString(),
          keyword: keyword.trim(),
          type: outputType,
          project: project,
        }),
      )
    }
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Redirect to document detail page (mock)
    router.push("/dashboard/documents/1?new=true")
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" />
          {t(content.documents)}
        </Link>
        <PageHeading>{t(content.newDocument)}</PageHeading>
        <PageDescription>{t(content.newDocumentDescription)}</PageDescription>
      </div>

      {/* Progress Steps */}
      <nav aria-label={t(content.progressLabel)} className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                step > s &&
                  "border-primary/20 bg-primary/10 text-primary",
                step === s && "border-transparent bg-primary text-primary-foreground",
                step < s && "border-transparent bg-muted text-muted-foreground"
              )}
              aria-current={step === s ? "step" : undefined}
              aria-label={`${t(content.step)} ${s}${step > s ? `, ${t(content.completed)}` : step === s ? `, ${t(content.current)}` : ""}`}
            >
              {step > s ? <Check className="size-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-colors",
                  step > s ? "bg-primary/25" : "bg-muted"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Step 1: Output Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base">{t(content.contentType)}</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {t(content.contentTypeDescription)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {outputTypes.map((type) => (
              <Card
                key={type.id}
                className={cn(
                  "cursor-pointer transition-colors hover:border-muted-foreground/25",
                  outputType === type.id &&
                    "border-border bg-muted/60 shadow-none"
                )}
                onClick={() => setOutputType(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <type.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{type.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="default" onClick={() => setStep(2)} disabled={!canProceedStep1}>
              {t(content.continue)}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Content Details */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Content Mode */}
          <div className="space-y-3">
            <Label className="text-base">{t(content.mode)}</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {contentModes.map((mode) => (
                <Card
                  key={mode.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:border-muted-foreground/25",
                    contentMode === mode.id &&
                      "border-border bg-muted/60 shadow-none"
                  )}
                  onClick={() => setContentMode(mode.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm">{mode.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mode.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Existing Content (if optimize mode) */}
          {contentMode === "optimize" && (
            <div className="space-y-3">
              <Label className="text-base">{t(content.existingContent)}</Label>
              <div className="flex gap-2 mb-3">
                <Button
                  variant={inputMode === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("url")}
                >
                  <LinkIcon className="mr-2 size-4" />
                  {t(content.url)}
                </Button>
                <Button
                  variant={inputMode === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("text")}
                >
                  <Type className="mr-2 size-4" />
                  {t(content.text)}
                </Button>
              </div>
              {inputMode === "url" ? (
                <Input
                  placeholder={t(content.urlPlaceholder)}
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                />
              ) : (
                <Textarea
                  placeholder={t(content.textPlaceholder)}
                  rows={5}
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                />
              )}
            </div>
          )}

          {/* Keyword */}
          <div className="space-y-3">
            <Label htmlFor="keyword" className="text-base">
              {t(content.mainKeyword)}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t(content.mainKeywordDescription)}
            </p>
            <Input
              id="keyword"
              placeholder={t(content.keywordPlaceholder)}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t(content.keywordSeparatorHint)}
              {contentMode === "optimize" && (contentText.trim() || contentUrl.trim()) && (
                <span className="block mt-1">{t(content.keywordExtractFromText)}</span>
              )}
            </p>
          </div>

          {/* SERP Location & Language */}
          <div className="space-y-3">
            <div>
              <Label className="text-base">{t(content.serpSettings)}</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {t(content.serpSettingsDescription)}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Location */}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t(content.location)}
                </Label>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={locationOpen}
                      className="w-full justify-between font-normal"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MapPin className="size-4 shrink-0 text-muted-foreground" />
                        {getLocationByCode(locationCode)?.nativeName ?? locationCode}
                      </span>
                      <ChevronsUpDown className="size-3.5 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <Command>
                      <CommandInput placeholder={t(content.locationPlaceholder)} />
                      <CommandList>
                        <CommandEmpty>{t(content.locationEmpty)}</CommandEmpty>
                        <CommandGroup>
                          {googleLocations.map((loc) => (
                            <CommandItem
                              key={loc.countryCode}
                              value={`${loc.locationName} ${loc.nativeName} ${loc.countryCode}`}
                              onSelect={() => {
                                setLocationCode(loc.countryCode)
                                setLanguageCode(loc.defaultLanguageCode)
                                setLocationOpen(false)
                              }}
                            >
                              <span className="flex-1 truncate">
                                <span className="font-medium">{loc.nativeName}</span>
                                {loc.nativeName !== loc.locationName && (
                                  <span className="text-muted-foreground ml-1.5 text-xs">
                                    {loc.locationName}
                                  </span>
                                )}
                              </span>
                              <Check
                                className={cn(
                                  "size-4 shrink-0",
                                  locationCode === loc.countryCode ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t(content.language)}
                </Label>
                <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={languageOpen}
                      className="w-full justify-between font-normal"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Languages className="size-4 shrink-0 text-muted-foreground" />
                        {getLanguageByCode(languageCode)?.nativeName ?? languageCode}
                      </span>
                      <ChevronsUpDown className="size-3.5 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <Command>
                      <CommandInput placeholder={t(content.languagePlaceholder)} />
                      <CommandList>
                        <CommandEmpty>{t(content.languageEmpty)}</CommandEmpty>
                        <CommandGroup>
                          {googleLanguages.map((lang) => (
                            <CommandItem
                              key={lang.code}
                              value={`${lang.name} ${lang.nativeName} ${lang.code}`}
                              onSelect={() => {
                                setLanguageCode(lang.code)
                                setLanguageOpen(false)
                              }}
                            >
                              <span className="flex-1 truncate">
                                <span className="font-medium">{lang.nativeName}</span>
                                {lang.nativeName !== lang.name && (
                                  <span className="text-muted-foreground ml-1.5 text-xs">
                                    {lang.name}
                                  </span>
                                )}
                              </span>
                              <Check
                                className={cn(
                                  "size-4 shrink-0",
                                  languageCode === lang.code ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="space-y-3">
            <Label className="text-base">{t(content.projectOptional)}</Label>
            <p className="text-sm text-muted-foreground">
              {t(content.projectRequiredHint)}
            </p>
            <Select
              value={project}
              onValueChange={(value) => {
                if (value === "__new__") {
                  setNewProjectOpen(true)
                  return
                }
                setProject(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t(content.selectProject)} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
                <SelectItem value="__new__" className="text-primary">
                  {t(content.createNewProject)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 size-4" />
              {t(content.back)}
            </Button>
            <Button variant="default" onClick={() => setStep(3)} disabled={!canProceedStep2}>
              {t(content.continue)}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Generate */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base">{t(content.summary)}</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {t(content.summaryDescription)}
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.contentTypeSummary)}
                  </p>
                  <p className="font-medium mt-1">
                    {outputTypes.find((ot) => ot.id === outputType)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.modeSummary)}
                  </p>
                  <p className="font-medium mt-1">
                    {contentMode === "create" ? t(content.newContent) : t(content.optimization)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t(content.keyword)}
                </p>
                <code className="mt-1 inline-block bg-muted px-2 py-1 rounded text-sm">
                  {keyword}
                </code>
              </div>

              <div className="border-t pt-4 flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.locationSummary)}
                  </p>
                  <p className="font-medium mt-1">
                    {getLocationByCode(locationCode)?.locationName ?? locationCode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.languageSummary)}
                  </p>
                  <p className="font-medium mt-1">
                    {getLanguageByCode(languageCode)?.nativeName ?? languageCode}
                  </p>
                </div>
              </div>

              {contentMode === "optimize" && (contentUrl || contentText) && (
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.contentToOptimize)}
                  </p>
                  <p className="text-sm mt-1 truncate">
                    {contentUrl || contentText.substring(0, 100) + "..."}
                  </p>
                </div>
              )}

              {project && (
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.project)}
                  </p>
                  <p className="font-medium mt-1">
                    {projects.find((p) => p.id === project)?.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h3 className="font-medium">{t(content.whatWillHappen)}</h3>
                  <ol className="mt-2 space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                    <li>{t(content.serpAnalysis)} &ldquo;{keyword}&rdquo; ({getLocationByCode(locationCode)?.locationName}, {getLanguageByCode(languageCode)?.nativeName})</li>
                    <li>{t(content.scraping)}</li>
                    <li>{t(content.patterns)}</li>
                    <li>{t(content.generation)}</li>
                  </ol>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {t(content.estimatedTime)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-2 size-4" />
              {t(content.back)}
            </Button>
            <Button variant="accent" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin motion-reduce:animate-none" />
                  {t(content.generating)}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  {t(content.generateContent)}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <NewProjectDialog
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
        onCreate={(newProject) => {
          setExtraProjects((prev) => [...prev, newProject])
          setProject(newProject.id)
        }}
      />
    </div>
  )
}

export function NewDocumentContent() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="size-6 animate-spin motion-reduce:animate-none" /></div>}>
      <NewDocumentInner />
    </Suspense>
  )
}
