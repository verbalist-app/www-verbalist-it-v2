"use client"

import { Clock, Coins, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  MOCK_CREDITS_TOTAL,
  MOCK_CREDITS_USED,
  estimateBatchCredits,
  estimateBatchMinutes,
  formatDuration,
} from "@/lib/batches"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

export function getAvailableCredits(): number {
  return Math.max(0, MOCK_CREDITS_TOTAL - MOCK_CREDITS_USED)
}

/**
 * Stima di tempo e crediti per un lotto. Riusata nell'anteprima (step 2),
 * nel riepilogo (step 3) e nel piè di pagina della pagina Lotto.
 */
export function BatchEstimate({
  itemCount,
  className,
  compact = false,
}: {
  itemCount: number
  className?: string
  compact?: boolean
}) {
  const { locale } = useDashboardLocale()
  const it = locale === "it"
  const credits = estimateBatchCredits(itemCount)
  const available = getAvailableCredits()
  const minutes = estimateBatchMinutes(itemCount)
  const exceeds = credits > available
  const share = available > 0 ? Math.min(100, Math.round((credits / available) * 100)) : 100

  const contentsLabel = it
    ? `${itemCount} ${itemCount === 1 ? "contenuto" : "contenuti"}`
    : `${itemCount} ${itemCount === 1 ? "item" : "items"}`
  const creditsLabel = it
    ? `${credits} crediti su ${available} disponibili`
    : `${credits} of ${available} available credits`

  if (compact) {
    return (
      <p className={cn("text-xs text-muted-foreground", exceeds && "text-status-error", className)}>
        {contentsLabel} · {formatDuration(minutes, locale)} · {creditsLabel}
      </p>
    )
  }

  return (
    <div className={cn("rounded-lg border border-border bg-muted/40 p-4", className)}>
      <dl className="grid gap-3 text-sm sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <Layers className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {it ? "Contenuti" : "Items"}
            </dt>
            <dd className="mt-0.5 font-medium tabular-nums">{contentsLabel}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {it ? "Tempo stimato" : "Estimated time"}
            </dt>
            <dd className="mt-0.5 font-medium">{formatDuration(minutes, locale)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Coins className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {it ? "Crediti" : "Credits"}
            </dt>
            <dd className={cn("mt-0.5 font-medium tabular-nums", exceeds && "text-status-error")}>
              {creditsLabel}
            </dd>
          </div>
        </div>
      </dl>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div
          className={cn("h-full rounded-full transition-all", exceeds ? "bg-status-error" : "bg-foreground")}
          style={{ width: `${share}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {it
          ? "I lotti girano in coda, con priorità più bassa delle richieste singole. Puoi chiudere la pagina mentre lavora."
          : "Batches run in a queue, at lower priority than single requests. You can leave the page while it works."}
      </p>
    </div>
  )
}
