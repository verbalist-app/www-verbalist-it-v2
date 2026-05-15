const CREDITS_PER_DOCUMENT = 20
const WARNING_THRESHOLD = 0.8
const CRITICAL_THRESHOLD = 0.9

export type CreditsLevel = "normal" | "warning" | "critical"

export function getCreditsLevel(used: number, total: number): CreditsLevel {
  if (total <= 0) return "normal"
  const ratio = used / total
  if (ratio >= CRITICAL_THRESHOLD) return "critical"
  if (ratio >= WARNING_THRESHOLD) return "warning"
  return "normal"
}

export function getCreditsBarClass(level: CreditsLevel): string {
  switch (level) {
    case "critical":
      return "bg-status-error"
    case "warning":
      return "bg-status-warning"
    default:
      return "bg-foreground"
  }
}

export function getCreditsTextClass(level: CreditsLevel): string {
  switch (level) {
    case "critical":
      return "text-status-error"
    case "warning":
      return "text-status-warning"
    default:
      return "text-muted-foreground"
  }
}

export function getDocumentsRemaining(used: number, total: number): number {
  const remaining = total - used
  if (remaining <= 0) return 0
  return Math.floor(remaining / CREDITS_PER_DOCUMENT)
}

export { CREDITS_PER_DOCUMENT }
