"use client"

import { cn } from "@/lib/utils"
import { getBatchStatusConfig, type BatchStatus } from "@/lib/batches"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

export function BatchStatusPill({ status, className }: { status: BatchStatus; className?: string }) {
  const { locale } = useDashboardLocale()
  const cfg = getBatchStatusConfig(locale)[status]
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        cfg.className,
        className,
      )}
    >
      {cfg.label}
    </span>
  )
}
