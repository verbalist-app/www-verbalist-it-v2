import { CREDITS_PER_DOCUMENT } from "./credits"
import { BONFIGLIOLI_PROJECT_ID } from "./projects"
import type { DashboardLocale } from "./status"

/**
 * Lotti (elaborazione multipla da file).
 * Modella gli endpoint proposti dal backend (Inventio Hub, 14/09/2026):
 * POST /commands/bulk/{pipeline}, GET /monitor/bulk/{id}, GET /results/bulk/{id}.
 */

/** Limite tecnico per richiesta bulk. Il tetto commerciale del piano può essere più basso. */
export const BATCH_MAX_ITEMS = 50
/** ~1 ora per 50 item con la concorrenza attuale (5 task in parallelo per tutta la piattaforma). */
export const SECONDS_PER_ITEM = 72
/** Crediti mock: rispecchia layout.tsx e subscription. */
export const MOCK_CREDITS_USED = 156
export const MOCK_CREDITS_TOTAL = 500

export type BatchPipeline = "optimize" | "generate"
export type BatchItemStatus = "queued" | "processing" | "completed" | "failed" | "cancelled"
export type BatchStatus =
  | "queued"
  | "processing"
  | "paused"
  | "completed"
  | "completed_with_errors"
  | "cancelled"

export interface BatchItem {
  id: string
  page: string
  section: string
  keyword: string
  status: BatchItemStatus
  cost: number | null
  documentId?: string
  error?: string
}

export interface Batch {
  id: string
  name: string
  fileName: string
  projectId: string
  pipeline: BatchPipeline
  createdAt: string
  items: BatchItem[]
}

export interface BatchCounts {
  queued: number
  processing: number
  completed: number
  failed: number
  cancelled: number
  total: number
}

export function getBatchCounts(items: BatchItem[]): BatchCounts {
  const counts: BatchCounts = { queued: 0, processing: 0, completed: 0, failed: 0, cancelled: 0, total: items.length }
  for (const item of items) counts[item.status] += 1
  return counts
}

export function deriveBatchStatus(items: BatchItem[], paused: boolean, cancelled: boolean): BatchStatus {
  const c = getBatchCounts(items)
  if (cancelled) return "cancelled"
  if (paused) return "paused"
  if (c.processing > 0) return "processing"
  if (c.queued > 0) return c.completed + c.failed > 0 ? "processing" : "queued"
  return c.failed > 0 ? "completed_with_errors" : "completed"
}

export function estimateBatchCredits(itemCount: number): number {
  return itemCount * CREDITS_PER_DOCUMENT
}

export function estimateBatchMinutes(itemCount: number): number {
  if (itemCount <= 0) return 0
  return Math.max(1, Math.round((itemCount * SECONDS_PER_ITEM) / 60))
}

export function formatDuration(minutes: number, locale: DashboardLocale): string {
  if (minutes < 1) return locale === "it" ? "meno di un minuto" : "under a minute"
  if (minutes < 60) {
    return locale === "it"
      ? `circa ${minutes} ${minutes === 1 ? "minuto" : "minuti"}`
      : `about ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
  }
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (locale === "it") {
    const hours = `${h} ${h === 1 ? "ora" : "ore"}`
    return m ? `circa ${hours} e ${m} minuti` : `circa ${hours}`
  }
  const hours = `${h} ${h === 1 ? "hour" : "hours"}`
  return m ? `about ${hours} and ${m} minutes` : `about ${hours}`
}

export interface BatchStatusEntry {
  label: string
  className: string
}

export function getBatchStatusConfig(locale: DashboardLocale): Record<BatchStatus, BatchStatusEntry> {
  const it = locale === "it"
  return {
    queued: { label: it ? "In coda" : "Queued", className: "bg-muted text-muted-foreground" },
    processing: { label: it ? "In corso" : "In progress", className: "bg-status-warning/10 text-status-warning" },
    paused: { label: it ? "In pausa" : "Paused", className: "bg-status-warning/10 text-status-warning" },
    completed: { label: it ? "Completato" : "Completed", className: "bg-status-success/10 text-status-success" },
    completed_with_errors: {
      label: it ? "Completato con errori" : "Completed with errors",
      className: "bg-status-error/10 text-status-error",
    },
    cancelled: { label: it ? "Annullato" : "Cancelled", className: "bg-muted text-muted-foreground/70 line-through" },
  }
}

// ── File di input: righe lette e validazione ────────────────────────────────

export type RowIssueCode = "empty_text" | "missing_keyword" | "missing_page" | "duplicate_keyword"

export interface RowIssue {
  level: "error" | "warning"
  code: RowIssueCode
  /** riga (1-based) con cui c'è il conflitto, per le keyword duplicate */
  ref?: number
}

export interface ParsedRow {
  id: string
  page: string
  section: string
  text: string
  keyword: string
  secondaryKeywords: string[]
  issues: RowIssue[]
}

export function validateRows(rows: ParsedRow[], pipeline: BatchPipeline): ParsedRow[] {
  const seen = new Map<string, number>()
  return rows.map((row, index) => {
    const issues: RowIssue[] = []
    if (!row.page.trim() || !row.section.trim()) issues.push({ level: "error", code: "missing_page" })
    if (pipeline === "optimize" && !row.text.trim()) issues.push({ level: "error", code: "empty_text" })
    if (!row.keyword.trim()) issues.push({ level: "error", code: "missing_keyword" })
    const key = row.keyword.trim().toLowerCase()
    if (key) {
      const first = seen.get(key)
      if (first !== undefined) issues.push({ level: "warning", code: "duplicate_keyword", ref: first + 1 })
      else seen.set(key, index)
    }
    return { ...row, issues }
  })
}

export function rowHasErrors(row: ParsedRow): boolean {
  return row.issues.some((i) => i.level === "error")
}

export function rowHasWarnings(row: ParsedRow): boolean {
  return row.issues.some((i) => i.level === "warning")
}

/** Testi del file "RevisioneNUR.xlsx" (Bonfiglioli, fogli Biogas e Construction). */
const bonfiglioliRows: Omit<ParsedRow, "id" | "issues">[] = [
  {
    page: "Biogas",
    section: "Introduzione del settore biogas",
    text: "Il biogas è una fonte di energia rinnovabile ed ecologica. Viene prodotto dalla scomposizione di materiale organico, come rifiuti alimentari o animali, da parte di microrganismi in assenza di ossigeno, in un processo chiamato digestione anaerobica. Il biogas può crearsi naturalmente o in seguito ad un processo industriale per ottenere combustibile. Il biogas viene quindi utilizzato per sostituire in tutto o in parte il combustibile derivato dai combustibili fossili. Bonfiglioli ha progettato soluzioni ottimizzate specifiche per questo tipo di installazione, soggette a requisiti molto rigorosi in termini di affidabilità e qualità dei componenti alla base del trasporto per la produzione di biogas.",
    keyword: "riduttori epicicloidali per biogas",
    secondaryKeywords: ["motoriduttori ortogonali per biomassa", "motori e inverter per impianti biogas", "azionamenti per digestione anaerobica", "trasmissione potenza biomassa"],
  },
  {
    page: "Biogas",
    section: "Disimballaggio e recupero",
    text: "L'evoluzione delle linee di selezione automatica richiede componenti capaci di coniugare forza bruta e controllo millimetrico. Bonfiglioli si posiziona all'avanguardia nel settore del riciclo, offrendo una gamma completa di riduttori per trituratori e nastri trasportatori destinati alla gestione degli RSU. L'impiego della Serie 300M consente di affrontare le sfide legate alla variabilità dei materiali in ingresso, garantendo stabilità operativa e una lunga vita utile dei componenti. Come partner strategico per i costruttori di impianti (OEM), ci impegniamo nello sviluppo di soluzioni che accelerano i processi di separazione delle materie plastiche e il recupero di risorse preziose.",
    keyword: "riduttori epicicloidali per biogas",
    secondaryKeywords: ["motoriduttori ortogonali per biomassa", "motori e inverter per impianti biogas", "azionamenti per digestione anaerobica", "trasmissione potenza biomassa"],
  },
  {
    page: "Biogas",
    section: "Digestore anaerobico",
    text: "La transizione verso l'economia circolare vede nel biometano e nel biogas pilastri fondamentali per l'indipendenza energetica. Bonfiglioli si conferma partner leader nella fornitura di azionamenti per il trattamento dei rifiuti e delle biomasse, offrendo soluzioni che migliorano il LCOE (Levelized Cost of Energy) degli impianti. Oltre ai riduttori per digestori, l'esperienza del Gruppo si estende a tutta la filiera del recupero organico, dal pre-trattamento RSU alla movimentazione dei reflui.",
    keyword: "riduttori per agitatori biogas",
    secondaryKeywords: ["riduttori alta coppia a bassa velocità", "azionamenti per digestione anaerobica", "miscelazione digestato biomasse", "resistenza carichi di picco riduttori"],
  },
  {
    page: "Biogas",
    section: "Vagli a tamburo rotante",
    text: "Il recupero efficiente delle risorse richiede sistemi di vagliatura capaci di operare senza interruzioni e con minimi requisiti di manutenzione. Bonfiglioli si posiziona come partner strategico nello sviluppo di motoriduttori per vagli a tamburo rotante, offrendo soluzioni che rispondono alle sfide più complesse del trattamento dei rifiuti solidi urbani (RSU). La gamma EVOX CP rappresenta l'evoluzione tecnologica del Gruppo verso una maggiore sostenibilità operativa, coniugando un'elevata densità di potenza a una riduzione dei consumi elettrici.",
    keyword: "motoriduttori per vagli rotanti",
    secondaryKeywords: ["azionamenti continui per vagliatura", "riduttori EVOX per selezione dimensionale", "selezione dimensionale rifiuti", "azionamenti per tamburi rotanti"],
  },
  {
    page: "Biogas",
    section: "Separatore",
    text: "Bonfiglioli ottimizza i processi di separazione liquido-solido con sistemi di azionamento integrati per separatori a coclea. Grazie alla facilità di installazione dei riduttori della Serie 300M e al controllo avanzato degli inverter della serie Agile, garantiamo un funzionamento affidabile e una gestione flessibile della portata. Le nostre tecnologie assicurano prestazioni costanti nel trattamento dei rifiuti organici, migliorando l'efficienza operativa e riducendo i costi di manutenzione degli impianti.",
    keyword: "riduttori per separatori a coclea",
    secondaryKeywords: ["azionamenti per separazione liquido-solido", "motoriduttori per disidratazione digestato", "inverter per gestione portata biomasse", "trattamento rifiuti solidi organici"],
  },
  {
    page: "Biogas",
    section: "Biomixer e agitatori",
    text: "L'ottimizzazione del processo di miscelazione nei biomixer è fondamentale per aumentare la resa energetica degli impianti di produzione biogas. Bonfiglioli si posiziona come partner di riferimento per i costruttori di impianti (OEM), fornendo soluzioni di azionamento che integrano efficienza meccanica e controllo avanzato. L'impiego coordinato delle Serie HDP e C consente di affrontare le sfide legate alla movimentazione di substrati eterogenei, garantendo un flusso di lavoro ininterrotto e una qualità del mix superiore.",
    keyword: "riduttori per biomixer e agitatori",
    secondaryKeywords: ["miscelazione continua della biomassa", "azionamenti per omogeneizzazione substrati", "regolazione angolo agitatore", "azionamenti per trattamento substrati organici"],
  },
  {
    page: "Construction",
    section: "Introduzione del settore costruzioni ed edilizia",
    text: "Il nostro portfolio prodotti per il settore costruzioni comprende motoriduttori epicicloidali e modelli specifici per i diversi impieghi, quali traslazione, trazione e sollevamento. Sfruttiamo la nostra esperienza di oltre 50 anni sul mercato per sviluppare soluzioni tecnologiche e all'avanguardia per le più svariate applicazioni, tra cui escavatori, perforatrici, pale cingolate compatte, gru edili e macchine stradali. Con un focus sull'innovazione, ci impegniamo costantemente a introdurre nuove tecnologie e materiali avanzati per migliorare le prestazioni e l'affidabilità delle nostre soluzioni.",
    keyword: "riduttori per macchine da costruzione elettriche ed idrauliche",
    secondaryKeywords: ["motoriduttori epicicloidali edilizia", "soluzioni di trasmissione per macchine edili", "componenti per macchine movimento terra", "riduttori di traslazione e rotazione", "riduttori per argano"],
  },
  {
    page: "Construction",
    section: "Mini escavatori",
    text: "",
    keyword: "",
    secondaryKeywords: [],
  },
]

/**
 * Lettura simulata del file caricato: nella demo restituisce sempre le righe del
 * file Bonfiglioli. L'implementazione reale legge il foglio "Contenuti" del template.
 */
export function parseWorkbookMock(pipeline: BatchPipeline): ParsedRow[] {
  const rows = bonfiglioliRows.map((row, i) => ({ ...row, id: `row-${i + 1}`, issues: [] as RowIssue[] }))
  return validateRows(rows, pipeline)
}

export function getRowText(section: string): string {
  return bonfiglioliRows.find((r) => r.section === section)?.text ?? ""
}

// ── Lotto mock ──────────────────────────────────────────────────────────────

export const mockBatches: Batch[] = [
  {
    id: "b1",
    name: "RevisioneNUR",
    fileName: "RevisioneNUR.xlsx",
    projectId: BONFIGLIOLI_PROJECT_ID,
    pipeline: "optimize",
    createdAt: "2026-09-15T07:40:00.000Z",
    items: [
      { id: "i1", page: "Biogas", section: "Introduzione del settore biogas", keyword: "riduttori epicicloidali per biogas", status: "completed", cost: 20, documentId: "lotto-1" },
      { id: "i2", page: "Biogas", section: "Disimballaggio e recupero", keyword: "riduttori epicicloidali per biogas", status: "completed", cost: 20, documentId: "lotto-2" },
      { id: "i3", page: "Biogas", section: "Digestore anaerobico", keyword: "riduttori per agitatori biogas", status: "completed", cost: 20, documentId: "lotto-3" },
      { id: "i4", page: "Biogas", section: "Vagli a tamburo rotante", keyword: "motoriduttori per vagli rotanti", status: "processing", cost: null },
      { id: "i5", page: "Biogas", section: "Separatore", keyword: "riduttori per separatori a coclea", status: "failed", cost: null, error: "timeout" },
      { id: "i6", page: "Biogas", section: "Biomixer e agitatori", keyword: "riduttori per biomixer e agitatori", status: "queued", cost: null },
      { id: "i7", page: "Construction", section: "Introduzione del settore costruzioni ed edilizia", keyword: "riduttori per macchine da costruzione elettriche ed idrauliche", status: "queued", cost: null },
    ],
  },
]

export function getBatch(id: string): Batch | undefined {
  return mockBatches.find((b) => b.id === id)
}

/** Lotto appena avviato dal wizard: salvato in sessionStorage per la pagina Lotto (demo). */
export const LAST_BATCH_STORAGE_KEY = "verbalist:last-batch"

export interface PendingBatch {
  name: string
  fileName: string
  projectId: string
  pipeline: BatchPipeline
  createdAt: string
  rows: { page: string; section: string; keyword: string }[]
}

export function readPendingBatch(): PendingBatch | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(LAST_BATCH_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PendingBatch) : null
  } catch {
    return null
  }
}
