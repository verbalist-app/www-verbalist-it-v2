export type DashboardLocale = "it" | "en"

const labels = {
  it: { completed: "Completato", processing: "In elaborazione", failed: "Errore" },
  en: { completed: "Completed", processing: "Processing", failed: "Failed" },
} as const

export function getStatusConfig(locale: DashboardLocale = "it") {
  const t = labels[locale]
  return {
    completed: {
      label: t.completed,
      className: "bg-status-success/10 text-status-success",
      badgeVariant: "default" as const,
    },
    processing: {
      label: t.processing,
      className: "bg-status-warning/10 text-status-warning",
      badgeVariant: "secondary" as const,
    },
    failed: {
      label: t.failed,
      className: "bg-status-error/10 text-status-error",
      badgeVariant: "destructive" as const,
    },
  }
}

export const statusConfig = getStatusConfig("it")

export type Status = "completed" | "processing" | "failed"
