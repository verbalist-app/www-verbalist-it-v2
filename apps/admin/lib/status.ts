import {
  CircleCheck,
  CircleX,
  Loader,
  Clock,
  Pause,
  Ban,
  Lock,
  type LucideIcon,
} from "lucide-react"
import type { RunStatus, TaskKind, SubTaskKind } from "@/lib/admin/types"

export interface StatusConfig {
  label: string
  /** classi per il badge (sfondo tenue + testo) */
  className: string
  /** classe testo per icone/pallini inline */
  dot: string
  icon: LucideIcon
  /** icona che ruota mentre il task lavora */
  spin?: boolean
}

/**
 * Mappa gli 8 RunStatus del backend a etichetta IT + colore.
 * I colori riusano i token --status-* e --chart-1 di globals.css.
 */
export const STATUS_CONFIG: Record<RunStatus, StatusConfig> = {
  RUNNING: {
    label: "In esecuzione",
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    dot: "text-chart-1",
    icon: Loader,
    spin: true,
  },
  SUCCEEDED: {
    label: "Completato",
    className: "bg-status-success/10 text-status-success border-status-success/20",
    dot: "text-status-success",
    icon: CircleCheck,
  },
  FAILED: {
    label: "Errore",
    className: "bg-status-error/10 text-status-error border-status-error/20",
    dot: "text-status-error",
    icon: CircleX,
  },
  QUEUED: {
    label: "In coda",
    className: "bg-muted text-muted-foreground border-transparent",
    dot: "text-muted-foreground",
    icon: Clock,
  },
  PENDING: {
    label: "In attesa",
    className: "bg-muted text-muted-foreground border-transparent",
    dot: "text-muted-foreground",
    icon: Clock,
  },
  BLOCKED: {
    label: "Bloccato",
    className: "bg-status-warning/10 text-status-warning border-status-warning/20",
    dot: "text-status-warning",
    icon: Lock,
  },
  PAUSED: {
    label: "In pausa",
    className: "bg-status-warning/10 text-status-warning border-status-warning/20",
    dot: "text-status-warning",
    icon: Pause,
  },
  CANCELED: {
    label: "Annullato",
    className: "bg-muted text-muted-foreground/70 border-transparent line-through",
    dot: "text-muted-foreground/70",
    icon: Ban,
  },
}

export function getStatusConfig(status: RunStatus): StatusConfig {
  return STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING
}

/** stati considerati "vivi" (in lavorazione o in attesa di girare) */
export function isActiveStatus(status: RunStatus): boolean {
  return (
    status === "RUNNING" ||
    status === "QUEUED" ||
    status === "PENDING" ||
    status === "BLOCKED"
  )
}

// etichette leggibili per i tipi di task
export const TASK_KIND_LABEL: Record<TaskKind, string> = {
  GENERATE_SERP: "Generazione",
  IMPROVE_SERP: "Ottimizzazione",
  GENERATE_MEDIA: "Media",
  GENERIC: "Generico",
}

// etichette per i passi della pipeline (SubTaskKind)
export const SUBTASK_KIND_LABEL: Record<SubTaskKind, string> = {
  GET_DATAFORSEO_TOP_10: "Analisi SERP (top 10)",
  RESOLVE_CUSTOM_URLS: "Risoluzione URL custom",
  SCRAPE: "Scraping pagine",
  CREATE_SCRAPE_TASKS: "Preparazione scraping",
  WAIT_BARRIER: "Sincronizzazione",
  SERP_ANALYSIS: "Analisi competitor",
  SERP_IMPROVEMENT: "Ottimizzazione contenuto",
  SERP_GENERATION: "Generazione contenuto",
  RETRIEVE_MEDIA_SUGGESTIONS: "Suggerimenti media",
  CREATE_IMAGE_TASKS: "Preparazione immagini",
  IMAGE_GENERATION: "Generazione immagini",
  MEDIA_AGGREGATION: "Aggregazione media",
}

export function taskKindLabel(kind: TaskKind): string {
  return TASK_KIND_LABEL[kind] ?? kind
}

export function subtaskKindLabel(kind: SubTaskKind): string {
  return SUBTASK_KIND_LABEL[kind] ?? kind
}
