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
  ChevronRight,
  Languages,
  MapPin,
  Paperclip,
  X,
  TriangleAlert,
  Layers,
  Upload,
  Download,
  FileSpreadsheet,
  CircleAlert,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { BatchEstimate, getAvailableCredits } from "@/components/dashboard/batch-estimate"
import { mockProjects } from "@/lib/projects"
import { getBrandProfile, isBrandProfileFilled } from "@/lib/brand-profile"
import {
  BATCH_MAX_ITEMS,
  LAST_BATCH_STORAGE_KEY,
  estimateBatchCredits,
  parseWorkbookMock,
  rowHasErrors,
  rowHasWarnings,
  validateRows,
  type BatchPipeline,
  type ParsedRow,
  type PendingBatch,
  type RowIssue,
} from "@/lib/batches"
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
  additionalContext: string
  contextFiles: string[]
  pipeline: BatchPipeline
  bulkFileName: string
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

const TEMPLATE_HREF: Record<BatchPipeline, string> = {
  optimize: "/templates/verbalist-template-ottimizzazione.xlsx",
  generate: "/templates/verbalist-template-generazione.xlsx",
}

function NewDocumentInner() {
  const { t, locale } = useDashboardLocale()

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
    serpSettingsBulk: {
      it: "Vale per tutte le righe del lotto.",
      en: "Applies to every row of the batch.",
    },
    location: { it: "Localita", en: "Location" },
    locationPlaceholder: { it: "Cerca paese...", en: "Search country..." },
    locationEmpty: { it: "Nessun paese trovato.", en: "No country found." },
    language: { it: "Lingua", en: "Language" },
    languagePlaceholder: { it: "Cerca lingua...", en: "Search language..." },
    languageEmpty: { it: "Nessuna lingua trovata.", en: "No language found." },
    // Profilo brand del progetto
    brandProfile: { it: "Profilo brand del progetto", en: "Project brand profile" },
    brandActive: { it: "Attivo", en: "Active" },
    brandMissing: { it: "Non configurato", en: "Not set up" },
    brandNoProject: {
      it: "Scegli un progetto: il suo profilo brand guida tono, lessico e regole del testo.",
      en: "Pick a project: its brand profile guides tone, lexicon and rules of the text.",
    },
    brandActiveDesc: {
      it: "Tono, glossario e regole del progetto guidano questo contenuto. Non serve reinserirli.",
      en: "The project's tone, glossary and rules guide this content. No need to re-enter them.",
    },
    brandActiveDescBulk: {
      it: "Tono, glossario e regole del progetto guidano tutte le righe del lotto. Non serve reinserirli.",
      en: "The project's tone, glossary and rules guide every row of the batch. No need to re-enter them.",
    },
    brandMissingDesc: {
      it: "Il progetto non ha ancora un profilo. Senza profilo il testo è più generico e il tono cambia da un documento all'altro.",
      en: "The project has no profile yet. Without one, the text is more generic and the tone changes from one document to the next.",
    },
    brandConfigure: { it: "Configura nel progetto", en: "Set it up in the project" },
    extraContext: { it: "Contesto aggiuntivo per questo contenuto", en: "Extra context for this content" },
    extraContextBulk: { it: "Contesto aggiuntivo per questo lotto", en: "Extra context for this batch" },
    optional: { it: "facoltativo", en: "optional" },
    extraContextDesc: {
      it: "Vale solo qui e si somma al profilo del progetto: dettagli sul prodotto, cosa evitare, riferimenti.",
      en: "Applies only here and adds to the project profile: product details, what to avoid, references.",
    },
    contextPlaceholder: {
      it: "Es. Pagina dedicata alla Serie 300M per impianti biogas. Non citare i prezzi.",
      en: "E.g. Page dedicated to the 300M Series for biogas plants. Do not mention prices.",
    },
    contextAddFiles: { it: "Aggiungi PDF", en: "Add PDF" },
    contextFilesHint: {
      it: "Schede prodotto o linee guida solo per questo contenuto: fino a 3 PDF.",
      en: "Product sheets or guidelines for this content only: up to 3 PDFs.",
    },
    removeFile: { it: "Rimuovi file", en: "Remove file" },
    contextSummary: { it: "Profilo brand e contesto", en: "Brand profile and context" },
    noContext: { it: "Nessun contesto aggiuntivo", en: "No extra context" },
    contextEmptyWarnTitle: { it: "Stai generando senza profilo né contesto", en: "You're generating without a profile or context" },
    contextEmptyWarnBody: {
      it: "Senza indicazioni il testo è più generico e può contenere imprecisioni. Vuoi aggiungerne?",
      en: "Without guidance the text is more generic and may contain inaccuracies. Want to add some?",
    },
    addContext: { it: "Aggiungi contesto", en: "Add context" },
    projectOptional: { it: "Progetto", en: "Project" },
    projectRequiredHint: {
      it: "Ogni documento appartiene a un progetto. Il suo profilo brand guida il testo.",
      en: "Every document belongs to a project. Its brand profile guides the text.",
    },
    selectProject: { it: "Seleziona un progetto", en: "Select a project" },
    createNewProject: { it: "+ Crea nuovo progetto", en: "+ Create new project" },
    back: { it: "Indietro", en: "Back" },
    summary: { it: "Riepilogo", en: "Summary" },
    summaryDescription: {
      it: "Controlla i dettagli e avvia la generazione",
      en: "Check details and start generation",
    },
    summaryDescriptionBulk: {
      it: "Controlla i dettagli e avvia il lotto",
      en: "Check details and start the batch",
    },
    contentTypeSummary: { it: "Tipo contenuto", en: "Content type" },
    modeSummary: { it: "Modalità", en: "Mode" },
    newContent: { it: "Da parole chiave", en: "From keywords" },
    optimization: { it: "Da testo", en: "From text" },
    bulkOptimize: { it: "Da file · ottimizzazione", en: "From file · optimization" },
    bulkGenerate: { it: "Da file · generazione", en: "From file · generation" },
    keyword: { it: "Keyword", en: "Keyword" },
    contentToOptimize: {
      it: "Contenuto da ottimizzare",
      en: "Content to optimize",
    },
    project: { it: "Progetto", en: "Project" },
    file: { it: "File", en: "File" },
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
    startBatch: { it: "Avvia lotto", en: "Start batch" },
    startingBatch: { it: "Avvio in corso...", en: "Starting..." },
    bulkStep1: {
      it: "Controllo di tutte le righe prima di creare i task",
      en: "All rows are checked before any task is created",
    },
    bulkStep2: {
      it: (n: number) => `${n} contenuti entrano in coda, con priorità più bassa delle richieste singole`,
      en: (n: number) => `${n} items enter the queue, at lower priority than single requests`,
    },
    bulkStep3Optimize: {
      it: "Per ogni riga: analisi SERP, poi ottimizzazione guidata dal profilo brand",
      en: "For each row: SERP analysis, then optimization guided by the brand profile",
    },
    bulkStep3Generate: {
      it: "Per ogni riga: analisi SERP, poi generazione guidata dal profilo brand",
      en: "For each row: SERP analysis, then generation guided by the brand profile",
    },
    bulkStep4: {
      it: "Alla fine esporti tutto in Excel o Word, oppure apri i documenti uno a uno",
      en: "At the end you export everything to Excel or Word, or open the documents one by one",
    },
    creditsShortTitle: { it: "Crediti insufficienti", en: "Not enough credits" },
    creditsShortBody: {
      it: (needed: number, available: number) =>
        `Il lotto richiede ${needed} crediti, ne hai ${available}. Riduci le righe o passa a un piano più ampio.`,
      en: (needed: number, available: number) =>
        `The batch needs ${needed} credits, you have ${available}. Reduce the rows or move to a larger plan.`,
    },
    goToSubscription: { it: "Vai ad Abbonamento", en: "Go to Subscription" },
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
    bulkMode: { it: "Più contenuti da file", en: "Multiple contents from file" },
    bulkModeDesc: {
      it: "Carica un Excel con una riga per contenuto. Un lotto, molti documenti.",
      en: "Upload an Excel with one row per content. One batch, many documents.",
    },
    // Bulk
    pipelineLabel: { it: "Cosa contiene il file", en: "What the file contains" },
    pipelineOptimize: { it: "Testi da ottimizzare", en: "Texts to optimize" },
    pipelineGenerate: { it: "Keyword da cui generare", en: "Keywords to generate from" },
    pipelineOptimizeDesc: {
      it: "Una riga per sezione: pagina, sezione, testo attuale e keyword. Verbalist riscrive ogni testo in ottica SEO e GEO.",
      en: "One row per section: page, section, current text and keyword. Verbalist rewrites each text for SEO and GEO.",
    },
    pipelineGenerateDesc: {
      it: "Una riga per contenuto: pagina, sezione e keyword. Verbalist scrive ogni testo da zero.",
      en: "One row per content: page, section and keyword. Verbalist writes each text from scratch.",
    },
    downloadTemplate: { it: "Scarica il template", en: "Download the template" },
    dropTitle: { it: "Trascina qui il file o scegli dal computer", en: "Drop the file here or pick it from your computer" },
    dropHint: {
      it: (max: number) => `Excel .xlsx · fino a ${max} righe · una riga per contenuto`,
      en: (max: number) => `Excel .xlsx · up to ${max} rows · one row per content`,
    },
    reading: { it: "Lettura del file...", en: "Reading the file..." },
    replaceFile: { it: "Sostituisci", en: "Replace" },
    removeBulkFile: { it: "Rimuovi file", en: "Remove file" },
    rowsCount: {
      it: (n: number, max: number) => `${n} ${n === 1 ? "riga" : "righe"} su ${max}`,
      en: (n: number, max: number) => `${n} ${n === 1 ? "row" : "rows"} of ${max}`,
    },
    rowsReady: { it: (n: number) => `${n} pronte`, en: (n: number) => `${n} ready` },
    rowsWarnings: { it: (n: number) => `${n} ${n === 1 ? "avviso" : "avvisi"}`, en: (n: number) => `${n} ${n === 1 ? "warning" : "warnings"}` },
    rowsErrors: { it: (n: number) => `${n} da correggere`, en: (n: number) => `${n} to fix` },
    colRow: { it: "#", en: "#" },
    colContent: { it: "Pagina › Sezione", en: "Page › Section" },
    colKeyword: { it: "Keyword", en: "Keyword" },
    colStatus: { it: "Stato", en: "Status" },
    rowReady: { it: "Pronta", en: "Ready" },
    exclude: { it: "Escludi", en: "Exclude" },
    rowExcluded: { it: "Riga esclusa dal lotto", en: "Row excluded from the batch" },
    issue: {
      it: {
        empty_text: "Testo vuoto",
        missing_keyword: "Keyword mancante",
        missing_page: "Pagina o sezione mancante",
        duplicate_keyword: "Stessa keyword della riga",
      } as Record<RowIssue["code"], string>,
      en: {
        empty_text: "Empty text",
        missing_keyword: "Missing keyword",
        missing_page: "Missing page or section",
        duplicate_keyword: "Same keyword as row",
      } as Record<RowIssue["code"], string>,
    },
    errorsHint: {
      it: "Il lotto parte solo quando tutte le righe sono valide: correggi il file e ricaricalo, oppure escludi le righe con errori.",
      en: "The batch starts only when every row is valid: fix the file and upload it again, or exclude the rows with errors.",
    },
    overLimitTitle: { it: "Troppe righe per un lotto", en: "Too many rows for one batch" },
    overLimitBody: {
      it: (n: number, max: number) => `Il file ha ${n} righe, il massimo è ${max}. Dividi il file e carica una parte alla volta.`,
      en: (n: number, max: number) => `The file has ${n} rows, the maximum is ${max}. Split the file and upload one part at a time.`,
    },
    unsupportedFile: {
      it: "Formato non supportato. Carica un file .xlsx creato dal template.",
      en: "Unsupported format. Upload an .xlsx file created from the template.",
    },
    contentsByPage: { it: "Contenuti", en: "Items" },
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
      icon: Sparkles,
    },
    {
      id: "optimize",
      name: t(content.optimizeMode),
      description: t(content.optimizeModeDesc),
      icon: Type,
    },
    {
      id: "bulk",
      name: t(content.bulkMode),
      description: t(content.bulkModeDesc),
      icon: Layers,
    },
  ]

  const baseProjects = React.useMemo(
    () => mockProjects.map((p) => ({ id: p.id, name: p.name[locale] })),
    [locale],
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
  const [additionalContext, setAdditionalContext] = React.useState("")
  const [contextFiles, setContextFiles] = React.useState<string[]>([])
  const [contextOpen, setContextOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Bulk state
  const [pipeline, setPipeline] = React.useState<BatchPipeline>("optimize")
  const [bulkFileName, setBulkFileName] = React.useState("")
  const [rawRows, setRawRows] = React.useState<ParsedRow[]>([])
  const [bulkReading, setBulkReading] = React.useState(false)
  const [dragOver, setDragOver] = React.useState(false)
  const bulkInputRef = React.useRef<HTMLInputElement>(null)

  const isBulk = contentMode === "bulk"
  const bulkRows = React.useMemo(() => validateRows(rawRows, pipeline), [rawRows, pipeline])
  const errorRows = bulkRows.filter(rowHasErrors)
  const warningRows = bulkRows.filter((r) => !rowHasErrors(r) && rowHasWarnings(r))
  const validRows = bulkRows.filter((r) => !rowHasErrors(r))
  const overLimit = bulkRows.length > BATCH_MAX_ITEMS
  const bulkCredits = estimateBatchCredits(validRows.length)
  const availableCredits = getAvailableCredits()
  const creditsExceed = isBulk && bulkCredits > availableCredits

  // Profilo brand del progetto selezionato (letto dopo il mount: sessionStorage nella demo)
  const [profileFilled, setProfileFilled] = React.useState(false)
  const [profileDate, setProfileDate] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (!project) {
      setProfileFilled(false)
      setProfileDate(null)
      return
    }
    const profile = getBrandProfile(project)
    setProfileFilled(isBrandProfileFilled(profile))
    setProfileDate(profile?.updatedAt ?? null)
  }, [project])

  const projectName = projects.find((p) => p.id === project)?.name ?? ""

  const canProceedStep1 = outputType !== ""
  const canProceedStep2 =
    project !== "" &&
    (isBulk
      ? validRows.length > 0 && errorRows.length === 0 && !overLimit && !bulkReading
      : keyword.trim() !== "" && (contentMode === "create" || contentUrl || contentText))

  const hasDraftContent = React.useMemo(
    () =>
      Boolean(
        outputType ||
          keyword.trim() ||
          contentUrl.trim() ||
          contentText.trim() ||
          additionalContext.trim() ||
          contextFiles.length ||
          bulkFileName,
      ),
    [outputType, keyword, contentUrl, contentText, additionalContext, contextFiles, bulkFileName],
  )

  const resetForm = () => {
    setOutputType("")
    setContentMode("create")
    setKeyword("")
    setContentUrl("")
    setContentText("")
    setProject("")
    setInputMode("url")
    setLocationCode("IT")
    setLanguageCode("it")
    setAdditionalContext("")
    setContextFiles([])
    setPipeline("optimize")
    setBulkFileName("")
    setRawRows([])
    setStep(1)
  }

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
      if (draft.additionalContext) {
        setAdditionalContext(draft.additionalContext)
        setContextOpen(true)
      }
      if (Array.isArray(draft.contextFiles)) {
        setContextFiles(draft.contextFiles)
        if (draft.contextFiles.length) setContextOpen(true)
      }
      if (draft.pipeline === "optimize" || draft.pipeline === "generate") setPipeline(draft.pipeline)
      if (draft.bulkFileName) {
        setBulkFileName(draft.bulkFileName)
        setRawRows(parseWorkbookMock(draft.pipeline ?? "optimize"))
      }
      if (typeof draft.step === "number" && draft.step >= 1 && draft.step <= 3) {
        setStep(draft.step)
      }
      const hasValue =
        draft.outputType ||
        draft.keyword?.trim() ||
        draft.contentUrl?.trim() ||
        draft.contentText?.trim() ||
        draft.bulkFileName
      if (hasValue) {
        toast.info(t(content.draftRestored), {
          description: t(content.draftRestoredDesc),
          action: {
            label: t(content.discardDraft),
            onClick: () => {
              window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
              resetForm()
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
      additionalContext,
      contextFiles,
      pipeline,
      bulkFileName,
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
    additionalContext,
    contextFiles,
    pipeline,
    bulkFileName,
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

  // ── Bulk: lettura del file (simulata nella demo) ──────────────────────────
  const handleBulkFile = (file: File | null | undefined) => {
    if (!file) return
    const name = file.name
    const ok = /\.(xlsx|xls|csv)$/i.test(name)
    if (!ok) {
      toast.error(t(content.unsupportedFile))
      return
    }
    setBulkFileName(name)
    setRawRows([])
    setBulkReading(true)
    window.setTimeout(() => {
      setRawRows(parseWorkbookMock(pipeline))
      setBulkReading(false)
    }, 900)
    if (bulkInputRef.current) bulkInputRef.current.value = ""
  }

  const clearBulkFile = () => {
    setBulkFileName("")
    setRawRows([])
    setBulkReading(false)
  }

  const excludeRow = (id: string) => {
    setRawRows((prev) => prev.filter((r) => r.id !== id))
    toast.info(t(content.rowExcluded))
  }

  const issueLabel = (issue: RowIssue) => {
    const base = content.issue[locale][issue.code]
    return issue.code === "duplicate_keyword" && issue.ref ? `${base} ${issue.ref}` : base
  }

  const rowsByPage = React.useMemo(() => {
    const map = new Map<string, number>()
    for (const row of validRows) map.set(row.page, (map.get(row.page) ?? 0) + 1)
    return Array.from(map.entries())
  }, [validRows])

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "short" }).format(
      new Date(iso),
    )

  const handleGenerate = async () => {
    setIsGenerating(true)
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY)
      if (isBulk) {
        const pending: PendingBatch = {
          name: bulkFileName.replace(/\.[^.]+$/, ""),
          fileName: bulkFileName,
          projectId: project,
          pipeline,
          createdAt: new Date().toISOString(),
          rows: validRows.map((r) => ({ page: r.page, section: r.section, keyword: r.keyword })),
        }
        window.sessionStorage.setItem(LAST_BATCH_STORAGE_KEY, JSON.stringify(pending))
      } else {
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
            additionalContext: additionalContext.trim(),
            contextFiles,
            versions: 2,
          }),
        )
      }
    }
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, isBulk ? 1200 : 2000))
    if (isBulk) {
      router.push("/dashboard/batches/b2?new=true")
      return
    }
    // Redirect to document detail page (mock)
    router.push("/dashboard/documents/1?new=true")
  }

  const modeSummaryLabel = isBulk
    ? pipeline === "optimize"
      ? t(content.bulkOptimize)
      : t(content.bulkGenerate)
    : contentMode === "create"
      ? t(content.newContent)
      : t(content.optimization)

  const hasExtraContext = Boolean(additionalContext.trim() || contextFiles.length)

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
        <div className="space-y-8">
          {/* Project (first: the brand profile depends on it) */}
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

          {/* Content Mode */}
          <div className="space-y-3">
            <Label className="text-base">{t(content.mode)}</Label>
            <div className="grid gap-3 sm:grid-cols-3">
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
                    <mode.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    <h3 className="font-medium text-sm mt-2">{mode.name}</h3>
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

          {/* Keyword (single-document modes) */}
          {!isBulk && (
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
          )}

          {/* Bulk: file, pipeline and row preview */}
          {isBulk && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base">{t(content.pipelineLabel)}</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={pipeline === "optimize" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPipeline("optimize")}
                  >
                    <Type className="mr-2 size-4" />
                    {t(content.pipelineOptimize)}
                  </Button>
                  <Button
                    variant={pipeline === "generate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPipeline("generate")}
                  >
                    <Sparkles className="mr-2 size-4" />
                    {t(content.pipelineGenerate)}
                  </Button>
                  <Button asChild variant="link" size="sm" className="ml-auto px-0">
                    <a href={TEMPLATE_HREF[pipeline]} download>
                      <Download className="mr-2 size-4" />
                      {t(content.downloadTemplate)}
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pipeline === "optimize" ? t(content.pipelineOptimizeDesc) : t(content.pipelineGenerateDesc)}
                </p>
              </div>

              <input
                ref={bulkInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="hidden"
                onChange={(e) => handleBulkFile(e.target.files?.[0])}
              />

              {!bulkFileName ? (
                <button
                  type="button"
                  onClick={() => bulkInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)
                    handleBulkFile(e.dataTransfer.files?.[0])
                  }}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center transition-colors",
                    dragOver
                      ? "border-foreground bg-muted/60"
                      : "border-muted-foreground/40 bg-muted/20 hover:border-muted-foreground/60 hover:bg-muted/40",
                  )}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Upload className="size-5" />
                  </div>
                  <p className="text-sm font-medium">{t(content.dropTitle)}</p>
                  <p className="text-xs text-muted-foreground">{content.dropHint[locale](BATCH_MAX_ITEMS)}</p>
                </button>
              ) : (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <FileSpreadsheet className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{bulkFileName}</p>
                          {bulkReading ? (
                            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" />
                              {t(content.reading)}
                            </p>
                          ) : (
                            <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                              {content.rowsCount[locale](bulkRows.length, BATCH_MAX_ITEMS)}
                              {" · "}
                              <span className={validRows.length ? "text-status-success" : undefined}>
                                {content.rowsReady[locale](validRows.length)}
                              </span>
                              {warningRows.length > 0 && (
                                <>
                                  {" · "}
                                  <span className="text-status-warning">
                                    {content.rowsWarnings[locale](warningRows.length)}
                                  </span>
                                </>
                              )}
                              {errorRows.length > 0 && (
                                <>
                                  {" · "}
                                  <span className="text-status-error">
                                    {content.rowsErrors[locale](errorRows.length)}
                                  </span>
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => bulkInputRef.current?.click()}>
                          {t(content.replaceFile)}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={clearBulkFile}
                          aria-label={t(content.removeBulkFile)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {overLimit && !bulkReading && (
                      <Alert variant="destructive">
                        <CircleAlert className="size-4" />
                        <AlertTitle>{t(content.overLimitTitle)}</AlertTitle>
                        <AlertDescription>
                          {content.overLimitBody[locale](bulkRows.length, BATCH_MAX_ITEMS)}
                        </AlertDescription>
                      </Alert>
                    )}

                    {!bulkReading && bulkRows.length > 0 && (
                      <div className="-mx-4 overflow-x-auto border-t border-border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-10 pl-4 text-right">{t(content.colRow)}</TableHead>
                              <TableHead>{t(content.colContent)}</TableHead>
                              <TableHead>{t(content.colKeyword)}</TableHead>
                              <TableHead>{t(content.colStatus)}</TableHead>
                              <TableHead className="w-20 pr-4" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bulkRows.map((row, index) => {
                              const hasError = rowHasErrors(row)
                              const hasWarning = !hasError && rowHasWarnings(row)
                              const firstIssue = row.issues.find((i) => i.level === "error") ?? row.issues[0]
                              return (
                                <TableRow key={row.id} className={cn(hasError && "bg-status-error/5")}>
                                  <TableCell className="pl-4 text-right text-xs text-muted-foreground tabular-nums">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell className="max-w-[230px]">
                                    <p className="truncate text-sm" title={`${row.page} › ${row.section}`}>
                                      <span className="text-muted-foreground">{row.page || "—"}</span>
                                      <span className="mx-1 text-muted-foreground/60">›</span>
                                      <span className="font-medium">{row.section || "—"}</span>
                                    </p>
                                    {(row.text || pipeline === "optimize") && (
                                      <p className="truncate text-xs text-muted-foreground" title={row.text}>
                                        {row.text || "—"}
                                      </p>
                                    )}
                                  </TableCell>
                                  <TableCell className="max-w-[150px]">
                                    {row.keyword ? (
                                      <code className="block truncate rounded bg-muted px-1.5 py-0.5 text-xs" title={row.keyword}>
                                        {row.keyword}
                                      </code>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <span
                                      className={cn(
                                        "inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium",
                                        hasError && "bg-status-error/10 text-status-error",
                                        hasWarning && "bg-status-warning/10 text-status-warning",
                                        !hasError && !hasWarning && "bg-status-success/10 text-status-success",
                                      )}
                                    >
                                      {firstIssue ? issueLabel(firstIssue) : t(content.rowReady)}
                                    </span>
                                  </TableCell>
                                  <TableCell className="pr-4 text-right">
                                    {hasError && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs"
                                        onClick={() => excludeRow(row.id)}
                                      >
                                        <X className="mr-1 size-3.5" />
                                        {t(content.exclude)}
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {!bulkReading && errorRows.length > 0 && (
                      <p className="text-xs text-muted-foreground">{t(content.errorsHint)}</p>
                    )}

                    {!bulkReading && validRows.length > 0 && !overLimit && (
                      <BatchEstimate itemCount={validRows.length} compact />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Brand profile of the selected project + optional extra context */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-base">{t(content.brandProfile)}</Label>
              {project && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                    profileFilled
                      ? "bg-status-success/10 text-status-success"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Sparkles className="size-3" />
                  {profileFilled
                    ? `${t(content.brandActive)}${profileDate ? ` · ${formatDate(profileDate)}` : ""}`
                    : t(content.brandMissing)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {!project
                ? t(content.brandNoProject)
                : profileFilled
                  ? isBulk
                    ? t(content.brandActiveDescBulk)
                    : t(content.brandActiveDesc)
                  : t(content.brandMissingDesc)}
            </p>
            {project && !profileFilled && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/projects/${project}?tab=brand`}>
                  {t(content.brandConfigure)}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            )}

            <Collapsible open={contextOpen} onOpenChange={setContextOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
                  <ChevronRight
                    className={cn("mr-1 size-4 transition-transform motion-reduce:transition-none", contextOpen && "rotate-90")}
                  />
                  {isBulk ? t(content.extraContextBulk) : t(content.extraContext)}
                  <span className="ml-1.5 text-xs">({t(content.optional)})</span>
                  {!contextOpen && hasExtraContext && (
                    <Badge variant="secondary" className="ml-2 font-normal">
                      {contextFiles.length ? `${contextFiles.length} PDF` : "✓"}
                    </Badge>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">
                <p className="text-sm text-muted-foreground">{t(content.extraContextDesc)}</p>
                <Textarea
                  id="context"
                  placeholder={t(content.contextPlaceholder)}
                  rows={4}
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const names = Array.from(e.target.files ?? []).map((f) => f.name)
                    setContextFiles((prev) => [...prev, ...names].slice(0, 3))
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={contextFiles.length >= 3}
                  >
                    <Paperclip className="mr-2 size-4" />
                    {t(content.contextAddFiles)}
                  </Button>
                  <span className="text-xs text-muted-foreground">{t(content.contextFilesHint)}</span>
                </div>
                {contextFiles.length > 0 && (
                  <ul className="space-y-1.5">
                    {contextFiles.map((name, i) => (
                      <li
                        key={`${name}-${i}`}
                        className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <FileText className="size-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">{name}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setContextFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                          aria-label={t(content.removeFile)}
                        >
                          <X className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* SERP Location & Language */}
          <div className="space-y-3">
            <div>
              <Label className="text-base">{t(content.serpSettings)}</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {t(content.serpSettingsDescription)}
                {isBulk && `. ${t(content.serpSettingsBulk)}`}
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
              {isBulk ? t(content.summaryDescriptionBulk) : t(content.summaryDescription)}
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start gap-4">
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
                  <p className="font-medium mt-1">{modeSummaryLabel}</p>
                </div>
              </div>

              {isBulk ? (
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.file)}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                    <FileSpreadsheet className="size-4 text-muted-foreground" />
                    {bulkFileName}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground tabular-nums">
                    {t(content.contentsByPage)}: {validRows.length}
                    {rowsByPage.length > 0 && (
                      <span> · {rowsByPage.map(([page, n]) => `${page} ${n}`).join(" · ")}</span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(content.keyword)}
                  </p>
                  <code className="mt-1 inline-block bg-muted px-2 py-1 rounded text-sm">
                    {keyword}
                  </code>
                </div>
              )}

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

              {!isBulk && contentMode === "optimize" && (contentUrl || contentText) && (
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
                  <p className="font-medium mt-1">{projectName}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t(content.contextSummary)}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      profileFilled
                        ? "bg-status-success/10 text-status-success"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Sparkles className="size-3" />
                    {t(content.brandProfile)}: {profileFilled ? t(content.brandActive) : t(content.brandMissing)}
                  </span>
                  {contextFiles.length > 0 && (
                    <span className="text-sm text-muted-foreground">{contextFiles.length} PDF</span>
                  )}
                </div>
                {additionalContext.trim() ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {additionalContext.trim()}
                  </p>
                ) : (
                  !contextFiles.length && (
                    <p className="mt-2 text-sm text-muted-foreground">{t(content.noContext)}</p>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {isBulk ? <Layers className="size-5" /> : <Sparkles className="size-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{t(content.whatWillHappen)}</h3>
                  {isBulk ? (
                    <ol className="mt-2 space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                      <li>{t(content.bulkStep1)}</li>
                      <li>{content.bulkStep2[locale](validRows.length)}</li>
                      <li>{pipeline === "optimize" ? t(content.bulkStep3Optimize) : t(content.bulkStep3Generate)}</li>
                      <li>{t(content.bulkStep4)}</li>
                    </ol>
                  ) : (
                    <>
                      <ol className="mt-2 space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                        <li>{t(content.serpAnalysis)} &ldquo;{keyword}&rdquo; ({getLocationByCode(locationCode)?.locationName}, {getLanguageByCode(languageCode)?.nativeName})</li>
                        <li>{t(content.scraping)}</li>
                        <li>{t(content.patterns)}</li>
                        <li>{t(content.generation)}</li>
                      </ol>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {t(content.estimatedTime)}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {isBulk && <BatchEstimate itemCount={validRows.length} className="mt-4 bg-background" />}
            </CardContent>
          </Card>

          {creditsExceed && (
            <Alert variant="destructive">
              <CircleAlert className="size-4" />
              <AlertTitle>{t(content.creditsShortTitle)}</AlertTitle>
              <AlertDescription className="flex flex-col gap-3">
                <span>{content.creditsShortBody[locale](bulkCredits, availableCredits)}</span>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href="/dashboard/subscription">{t(content.goToSubscription)}</Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!profileFilled && !hasExtraContext && (
            <div className="flex items-start gap-3 rounded-lg border border-status-warning/30 bg-status-warning/10 p-4">
              <TriangleAlert className="size-5 shrink-0 text-status-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium">{t(content.contextEmptyWarnTitle)}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t(content.contextEmptyWarnBody)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setContextOpen(true)
                  setStep(2)
                }}
              >
                {t(content.addContext)}
              </Button>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-2 size-4" />
              {t(content.back)}
            </Button>
            <Button
              variant="accent"
              onClick={handleGenerate}
              disabled={isGenerating || creditsExceed}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin motion-reduce:animate-none" />
                  {isBulk ? t(content.startingBatch) : t(content.generating)}
                </>
              ) : isBulk ? (
                <>
                  <Layers className="mr-2 size-4" />
                  {t(content.startBatch)}
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
