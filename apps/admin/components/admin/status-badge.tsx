import { cn } from "@/lib/utils"
import { getStatusConfig } from "@/lib/status"
import type { RunStatus } from "@/lib/admin/types"

export function StatusBadge({
  status,
  className,
  showIcon = true,
}: {
  status: RunStatus
  className?: string
  showIcon?: boolean
}) {
  const cfg = getStatusConfig(status)
  const Icon = cfg.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        cfg.className,
        className,
      )}
    >
      {showIcon && <Icon className={cn("size-3.5", cfg.spin && "animate-spin")} />}
      {cfg.label}
    </span>
  )
}

/** pallino colorato senza etichetta, per tabelle dense */
export function StatusDot({ status, className }: { status: RunStatus; className?: string }) {
  const cfg = getStatusConfig(status)
  const Icon = cfg.icon
  return <Icon className={cn("size-4", cfg.dot, cfg.spin && "animate-spin", className)} aria-label={cfg.label} />
}
