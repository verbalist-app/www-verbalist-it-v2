export type DashboardLocale = "it" | "en"

const labels = {
  it: {
    completed: "Completato",
    processing: "In elaborazione",
    failed: "Errore",
    queued: "In coda",
    paused: "In pausa",
    cancelled: "Annullato",
  },
  en: {
    completed: "Completed",
    processing: "Processing",
    failed: "Failed",
    queued: "Queued",
    paused: "Paused",
    cancelled: "Cancelled",
  },
} as const

export type Status =
  | "completed"
  | "processing"
  | "failed"
  | "queued"
  | "paused"
  | "cancelled"

export interface StatusEntry {
  label: string
  className: string
  badgeVariant: "default" | "secondary" | "destructive" | "outline"
}

export function getStatusConfig(locale: DashboardLocale = "it"): Record<Status, StatusEntry> {
  const t = labels[locale]
  return {
    completed: {
      label: t.completed,
      className: "bg-status-success/10 text-status-success",
      badgeVariant: "default",
    },
    processing: {
      label: t.processing,
      className: "bg-status-warning/10 text-status-warning",
      badgeVariant: "secondary",
    },
    failed: {
      label: t.failed,
      className: "bg-status-error/10 text-status-error",
      badgeVariant: "destructive",
    },
    // Stati aggiunti per i lotti (elaborazione multipla): il backend li espone
    // via GET /monitor/bulk/{id}; i documenti singoli oggi non li usano.
    queued: {
      label: t.queued,
      className: "bg-muted text-muted-foreground",
      badgeVariant: "secondary",
    },
    paused: {
      label: t.paused,
      className: "bg-status-warning/10 text-status-warning",
      badgeVariant: "secondary",
    },
    cancelled: {
      label: t.cancelled,
      className: "bg-muted text-muted-foreground/70 line-through",
      badgeVariant: "outline",
    },
  }
}

export const statusConfig = getStatusConfig("it")
