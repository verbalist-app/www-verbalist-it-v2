"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Home,
  Layers,
  Pause,
  Play,
  Ban,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileType2,
  Code,
  CheckCircle2,
  CircleAlert,
  Loader2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PageHeading } from "@/components/ui/page-heading"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { getStatusConfig } from "@/lib/status"
import { CREDITS_PER_DOCUMENT } from "@/lib/credits"
import { mockProjects } from "@/lib/projects"
import {
  SECONDS_PER_ITEM,
  deriveBatchStatus,
  estimateBatchCredits,
  formatDuration,
  getBatch,
  getBatchCounts,
  mockBatches,
  readPendingBatch,
  type Batch,
  type BatchItem,
  type BatchItemStatus,
} from "@/lib/batches"
import { BatchStatusPill } from "@/components/dashboard/batch-status-pill"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const ITEMS_PER_PAGE = 10
const TICK_MS = 2200

const translations = {
  it: {
    projects: "Progetti",
    pipeline: { optimize: "Ottimizzazione", generate: "Generazione" },
    items: (n: number) => `${n} ${n === 1 ? "contenuto" : "contenuti"}`,
    startedAt: (date: string) => `avviato ${date}`,
    progress: (done: number, total: number) => `${done} di ${total} completati`,
    remaining: (duration: string) => `${duration} rimanenti`,
    queuedNote:
      "Il lotto parte appena si libera la coda. Puoi chiudere questa pagina: i documenti compaiono nel progetto man mano che sono pronti.",
    pausedNote: "Il lotto è in pausa. Le righe in coda non vengono elaborate finché non riprendi.",
    counters: { queued: "In coda", processing: "In corso", completed: "Completati", failed: "Errore" },
    pause: "Pausa",
    resume: "Riprendi",
    cancel: "Annulla lotto",
    exportAll: "Esporta tutto",
    exportXlsx: "Excel (.xlsx)",
    exportDocx: "Word (.docx)",
    exportHtml: "HTML (.zip)",
    exportMenuLabel: "Formati di esportazione",
    exportStarted: (format: string) => `Export ${format} avviato`,
    exportStartedDesc: "Ti avvisiamo appena il file è pronto da scaricare.",
    cancelTitle: "Annullare il lotto?",
    cancelDesc:
      "Le righe in coda non verranno elaborate. I documenti già completati restano disponibili e i crediti usati non vengono restituiti.",
    cancelConfirm: "Annulla lotto",
    keepGoing: "Continua a elaborare",
    cancelled: "Lotto annullato",
    pausedToast: "Lotto in pausa",
    resumedToast: "Lotto ripreso",
    retry: "Riprova",
    retryAll: "Riprova le righe in errore",
    retried: "Riga rimessa in coda",
    errorsTitle: (n: number) => (n === 1 ? "1 riga in errore" : `${n} righe in errore`),
    errorsDesc: "Puoi riprovarle: i crediti si consumano solo se l'elaborazione va a buon fine.",
    doneTitle: "Lotto completato",
    doneDesc: (n: number) => `${n} documenti pronti. Esportali tutti insieme o aprili uno a uno.`,
    cancelledTitle: "Lotto annullato",
    cancelledDesc: (n: number) =>
      n === 1 ? "1 documento completato resta disponibile." : `${n} documenti completati restano disponibili.`,
    filters: { all: "Tutti", queued: "In coda", processing: "In corso", completed: "Completati", failed: "Errore" },
    cols: { row: "#", page: "Pagina", section: "Sezione", keyword: "Keyword", status: "Stato", cost: "Crediti" },
    open: "Apri",
    noRows: "Nessuna riga con questo stato.",
    errorReason: { timeout: "Timeout del provider", provider: "Errore del provider" } as Record<string, string>,
    costSoFar: "Crediti usati finora",
    finalEstimate: (n: number) => `stima finale ${n}`,
    page: "Pagina",
    of: "di",
    previous: "Precedente",
    next: "Successiva",
    doneToast: (name: string) => `Lotto "${name}" completato`,
    doneToastDesc: "Puoi esportare tutti i documenti in Excel o Word.",
  },
  en: {
    projects: "Projects",
    pipeline: { optimize: "Optimization", generate: "Generation" },
    items: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
    startedAt: (date: string) => `started ${date}`,
    progress: (done: number, total: number) => `${done} of ${total} completed`,
    remaining: (duration: string) => `${duration} left`,
    queuedNote:
      "The batch starts as soon as the queue frees up. You can leave this page: documents appear in the project as they are ready.",
    pausedNote: "The batch is paused. Queued rows are not processed until you resume.",
    counters: { queued: "Queued", processing: "In progress", completed: "Completed", failed: "Failed" },
    pause: "Pause",
    resume: "Resume",
    cancel: "Cancel batch",
    exportAll: "Export all",
    exportXlsx: "Excel (.xlsx)",
    exportDocx: "Word (.docx)",
    exportHtml: "HTML (.zip)",
    exportMenuLabel: "Export formats",
    exportStarted: (format: string) => `${format} export started`,
    exportStartedDesc: "We'll let you know as soon as the file is ready to download.",
    cancelTitle: "Cancel the batch?",
    cancelDesc:
      "Queued rows will not be processed. Completed documents stay available and used credits are not refunded.",
    cancelConfirm: "Cancel batch",
    keepGoing: "Keep processing",
    cancelled: "Batch cancelled",
    pausedToast: "Batch paused",
    resumedToast: "Batch resumed",
    retry: "Retry",
    retryAll: "Retry failed rows",
    retried: "Row queued again",
    errorsTitle: (n: number) => (n === 1 ? "1 failed row" : `${n} failed rows`),
    errorsDesc: "You can retry them: credits are only spent when processing succeeds.",
    doneTitle: "Batch completed",
    doneDesc: (n: number) => `${n} documents ready. Export them all at once or open them one by one.`,
    cancelledTitle: "Batch cancelled",
    cancelledDesc: (n: number) =>
      n === 1 ? "1 completed document stays available." : `${n} completed documents stay available.`,
    filters: { all: "All", queued: "Queued", processing: "In progress", completed: "Completed", failed: "Failed" },
    cols: { row: "#", page: "Page", section: "Section", keyword: "Keyword", status: "Status", cost: "Credits" },
    open: "Open",
    noRows: "No rows with this status.",
    errorReason: { timeout: "Provider timeout", provider: "Provider error" } as Record<string, string>,
    costSoFar: "Credits used so far",
    finalEstimate: (n: number) => `final estimate ${n}`,
    page: "Page",
    of: "of",
    previous: "Previous",
    next: "Next",
    doneToast: (name: string) => `Batch "${name}" completed`,
    doneToastDesc: "You can export all documents to Excel or Word.",
  },
}

type Filter = "all" | BatchItemStatus

function BatchDetailInner({ params }: { params: { id: string } }) {
  const { t, locale } = useDashboardLocale()
  const labels = t(translations)
  const statusCfg = getStatusConfig(locale)
  const searchParams = useSearchParams()
  const isNew = searchParams.get("new") === "true"

  const [batch, setBatch] = React.useState<Batch | null>(null)
  const [items, setItems] = React.useState<BatchItem[]>([])
  const [paused, setPaused] = React.useState(false)
  const [cancelled, setCancelled] = React.useState(false)
  const [filter, setFilter] = React.useState<Filter>("all")
  const [page, setPage] = React.useState(1)
  const [showCancelDialog, setShowCancelDialog] = React.useState(false)
  const retriedRef = React.useRef<Set<string>>(new Set())
  const doneToastRef = React.useRef(false)

  // Carica il lotto: dal wizard (sessionStorage) se appena avviato, altrimenti dal mock.
  React.useEffect(() => {
    const known = getBatch(params.id)
    const pending = readPendingBatch()
    if ((isNew || !known) && pending) {
      const fresh: Batch = {
        id: params.id,
        name: pending.name,
        fileName: pending.fileName,
        projectId: pending.projectId,
        pipeline: pending.pipeline,
        createdAt: pending.createdAt,
        items: pending.rows.map((row, i) => ({
          id: `n${i + 1}`,
          page: row.page,
          section: row.section,
          keyword: row.keyword,
          status: "queued" as const,
          cost: null,
        })),
      }
      setBatch(fresh)
      setItems(fresh.items)
      return
    }
    const source = known ?? mockBatches[0]
    setBatch(source)
    setItems(source.items)
  }, [params.id, isNew])

  const counts = getBatchCounts(items)
  const status = deriveBatchStatus(items, paused, cancelled)
  const isRunning = status === "processing" || status === "queued"
  const done = counts.completed
  const pct = counts.total ? Math.round((done / counts.total) * 100) : 0
  const remainingMinutes = Math.ceil(((counts.queued + counts.processing) * SECONDS_PER_ITEM) / 60)
  const costSoFar = items.reduce((sum, item) => sum + (item.cost ?? 0), 0)
  const finalEstimate = estimateBatchCredits(counts.total - counts.cancelled - counts.failed)

  // Simulazione dell'avanzamento della coda (nella demo il backend non c'è).
  React.useEffect(() => {
    if (!batch || !isRunning || paused || cancelled) return
    const tick = () => {
      setItems((prev) => {
        const next = prev.map((item) => ({ ...item }))
        const running = next.findIndex((item) => item.status === "processing")
        if (running >= 0) {
          const item = next[running]
          const shouldFail = item.section === "Separatore" && !retriedRef.current.has(item.id)
          if (shouldFail) {
            item.status = "failed"
            item.error = "timeout"
          } else {
            item.status = "completed"
            item.cost = CREDITS_PER_DOCUMENT
            item.documentId = item.documentId ?? `lotto-${running + 1}`
          }
        }
        const queued = next.findIndex((item) => item.status === "queued")
        if (queued >= 0) next[queued].status = "processing"
        return next
      })
    }
    const timer = window.setInterval(tick, TICK_MS)
    return () => window.clearInterval(timer)
  }, [batch, isRunning, paused, cancelled])

  React.useEffect(() => {
    if (!batch || doneToastRef.current) return
    if (status === "completed" || status === "completed_with_errors") {
      if (!isNew && !retriedRef.current.size) {
        doneToastRef.current = true
        return
      }
      doneToastRef.current = true
      toast.success(labels.doneToast(batch.name), { description: labels.doneToastDesc })
    }
  }, [status, batch, isNew, labels])

  React.useEffect(() => {
    setPage(1)
  }, [filter])

  const handlePauseResume = () => {
    setPaused((prev) => {
      toast.info(prev ? labels.resumedToast : labels.pausedToast)
      return !prev
    })
  }

  const handleCancel = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.status === "queued" || item.status === "processing"
          ? { ...item, status: "cancelled" as const }
          : item,
      ),
    )
    setCancelled(true)
    setPaused(false)
    setShowCancelDialog(false)
    toast.success(labels.cancelled)
  }

  const handleRetry = (id: string) => {
    retriedRef.current.add(id)
    doneToastRef.current = false
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "queued" as const, error: undefined } : item)),
    )
    toast.info(labels.retried)
  }

  const handleRetryAll = () => {
    const failed = items.filter((item) => item.status === "failed")
    failed.forEach((item) => retriedRef.current.add(item.id))
    doneToastRef.current = false
    setItems((prev) =>
      prev.map((item) => (item.status === "failed" ? { ...item, status: "queued" as const, error: undefined } : item)),
    )
    toast.info(labels.retried)
  }

  const handleExport = (format: string) => {
    toast.success(labels.exportStarted(format), { description: labels.exportStartedDesc })
  }

  if (!batch) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="size-6 animate-spin motion-reduce:animate-none" />
      </div>
    )
  }

  const project = mockProjects.find((p) => p.id === batch.projectId)
  const projectName = project?.name[locale] ?? batch.projectId
  const startedAt = new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(batch.createdAt))

  const filtered = filter === "all" ? items : items.filter((item) => item.status === filter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const filterOptions: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: labels.filters.all, count: items.length },
    { value: "queued", label: labels.filters.queued, count: counts.queued },
    { value: "processing", label: labels.filters.processing, count: counts.processing },
    { value: "completed", label: labels.filters.completed, count: counts.completed },
    { value: "failed", label: labels.filters.failed, count: counts.failed },
  ]

  const canPause = isRunning || status === "paused"
  const canCancel = isRunning || status === "paused"
  const canExport = counts.completed > 0

  const counterTiles: { key: keyof typeof labels.counters; value: number; tone: string }[] = [
    { key: "queued", value: counts.queued, tone: "text-muted-foreground" },
    { key: "processing", value: counts.processing, tone: "text-status-warning" },
    { key: "completed", value: counts.completed, tone: "text-status-success" },
    { key: "failed", value: counts.failed, tone: "text-status-error" },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">
                <Home className="size-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/projects">{labels.projects}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/projects/${batch.projectId}`}>{projectName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{batch.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <BatchStatusPill status={status} />
            <span className="text-sm text-muted-foreground">{labels.startedAt(startedAt)}</span>
          </div>
          <PageHeading className="flex items-center gap-2">
            <Layers className="size-5 shrink-0 text-muted-foreground" />
            <span className="truncate">{batch.name}</span>
          </PageHeading>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Link href={`/dashboard/projects/${batch.projectId}`} className="hover:text-foreground">
              {projectName}
            </Link>
            <span>·</span>
            <span>{labels.pipeline[batch.pipeline]}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <FileSpreadsheet className="size-3.5" />
              {batch.fileName}
            </span>
            <span>·</span>
            <span className="tabular-nums">{labels.items(counts.total)}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {canPause && (
            <Button variant="outline" size="sm" onClick={handlePauseResume}>
              {paused ? <Play className="mr-2 size-4" /> : <Pause className="mr-2 size-4" />}
              {paused ? labels.resume : labels.pause}
            </Button>
          )}
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => setShowCancelDialog(true)}
            >
              <Ban className="mr-2 size-4" />
              {labels.cancel}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="accent" size="sm" disabled={!canExport} aria-label={labels.exportMenuLabel}>
                <Download className="mr-2 size-4" />
                {labels.exportAll}
                <ChevronDown className="ml-1 size-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("Excel")}>
                <FileSpreadsheet className="mr-2 size-4" />
                {labels.exportXlsx}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("Word")}>
                <FileType2 className="mr-2 size-4" />
                {labels.exportDocx}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("HTML")}>
                <Code className="mr-2 size-4" />
                {labels.exportHtml}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-medium tabular-nums">{labels.progress(done, counts.total)}</span>
            {isRunning && counts.queued + counts.processing > 0 && (
              <span className="text-muted-foreground">
                {labels.remaining(formatDuration(remainingMinutes, locale))}
              </span>
            )}
          </div>
          <Progress
            value={pct}
            className="h-2 bg-muted"
            indicatorClassName={cn(
              "motion-reduce:transition-none",
              status === "completed_with_errors" ? "bg-status-error" : "bg-foreground",
            )}
          />
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {counterTiles.map((tile) => (
              <button
                key={tile.key}
                type="button"
                onClick={() => setFilter(filter === tile.key ? "all" : tile.key)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                  filter === tile.key ? "border-foreground/40 bg-muted/60" : "border-border",
                )}
                aria-pressed={filter === tile.key}
              >
                <span className="text-xs text-muted-foreground">{labels.counters[tile.key]}</span>
                <span
                  className={cn(
                    "mt-1 block text-2xl font-semibold tabular-nums tracking-tight",
                    tile.value > 0 ? tile.tone : "text-muted-foreground/60",
                  )}
                >
                  {tile.value}
                </span>
              </button>
            ))}
          </div>
          {status === "queued" && (
            <p className="text-sm text-muted-foreground">{labels.queuedNote}</p>
          )}
          {status === "paused" && (
            <p className="text-sm text-muted-foreground">{labels.pausedNote}</p>
          )}
        </CardContent>
      </Card>

      {/* Banners */}
      {status === "completed" && (
        <Card className="bg-status-success/5 border-status-success/20">
          <CardContent className="flex items-start gap-3 p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-status-success" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{labels.doneTitle}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.doneDesc(counts.completed)}</p>
            </div>
          </CardContent>
        </Card>
      )}
      {status === "completed_with_errors" && (
        <Alert variant="destructive">
          <CircleAlert className="size-4" />
          <AlertTitle>{labels.errorsTitle(counts.failed)}</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <span>{labels.errorsDesc}</span>
            <Button variant="outline" size="sm" className="w-fit" onClick={handleRetryAll}>
              <RefreshCw className="mr-2 size-4" />
              {labels.retryAll}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {status === "cancelled" && (
        <Card className="bg-muted/40 border-dashed">
          <CardContent className="flex items-start gap-3 p-4">
            <Ban className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{labels.cancelledTitle}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.cancelledDesc(counts.completed)}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rows */}
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(option.value)}
              >
                {option.label}
                <span className="ml-1.5 text-xs tabular-nums opacity-60">{option.count}</span>
              </Button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 pl-4 text-right">{labels.cols.row}</TableHead>
                  <TableHead>{labels.cols.page}</TableHead>
                  <TableHead>{labels.cols.section}</TableHead>
                  <TableHead className="hidden lg:table-cell">{labels.cols.keyword}</TableHead>
                  <TableHead>{labels.cols.status}</TableHead>
                  <TableHead className="text-right">{labels.cols.cost}</TableHead>
                  <TableHead className="w-28 pr-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                      {labels.noRows}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((item) => {
                    const index = items.findIndex((i) => i.id === item.id)
                    const cfg = statusCfg[item.status]
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="pl-4 text-right text-xs text-muted-foreground tabular-nums">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{item.page}</TableCell>
                        <TableCell className="max-w-[240px] truncate text-sm" title={item.section}>
                          {item.documentId && item.status === "completed" ? (
                            <Link href={`/dashboard/documents/${item.documentId}`} className="font-medium hover:underline">
                              {item.section}
                            </Link>
                          ) : (
                            item.section
                          )}
                        </TableCell>
                        <TableCell className="hidden max-w-[220px] lg:table-cell">
                          <code className="block truncate rounded bg-muted px-1.5 py-0.5 text-xs" title={item.keyword}>
                            {item.keyword}
                          </code>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
                              cfg.className,
                            )}
                          >
                            {item.status === "processing" && (
                              <Loader2 className="size-3 animate-spin motion-reduce:animate-none" />
                            )}
                            {cfg.label}
                          </span>
                          {item.status === "failed" && item.error && (
                            <span className="mt-1 block text-[11px] text-muted-foreground">
                              {labels.errorReason[item.error] ?? item.error}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums">
                          {item.cost ?? <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="pr-4 text-right">
                          {item.status === "completed" && item.documentId && (
                            <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <Link href={`/dashboard/documents/${item.documentId}`}>
                                {labels.open}
                                <ExternalLink className="ml-1 size-3.5" />
                              </Link>
                            </Button>
                          )}
                          {item.status === "failed" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => handleRetry(item.id)}
                            >
                              <RefreshCw className="mr-1 size-3.5" />
                              {labels.retry}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm">
            <p className="text-muted-foreground">
              {labels.costSoFar}:{" "}
              <span className="font-medium text-foreground tabular-nums">{costSoFar}</span>
              {isRunning && finalEstimate > costSoFar && (
                <span className="tabular-nums"> · {labels.finalEstimate(finalEstimate)}</span>
              )}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {labels.page} {page} {labels.of} {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label={labels.previous}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label={labels.next}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{labels.cancelTitle}</AlertDialogTitle>
            <AlertDialogDescription>{labels.cancelDesc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{labels.keepGoing}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleCancel}
            >
              {labels.cancelConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function BatchDetailContent({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <Loader2 className="size-6 animate-spin motion-reduce:animate-none" />
        </div>
      }
    >
      <BatchDetailInner params={params} />
    </Suspense>
  )
}
