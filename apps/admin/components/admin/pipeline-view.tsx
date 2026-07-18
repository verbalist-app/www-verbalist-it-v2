import { cn } from "@/lib/utils"
import { getStatusConfig, subtaskKindLabel } from "@/lib/status"
import { formatTime, formatDuration } from "@/lib/admin/format"
import type { SubtaskStatus, PipelineGraph, GraphNode, RunStatus } from "@/lib/admin/types"

function durationBetween(start: string | null, end: string | null): number | null {
  if (!start) return null
  const a = new Date(start).getTime()
  const b = end ? new Date(end).getTime() : Date.now()
  if (Number.isNaN(a) || Number.isNaN(b)) return null
  return (b - a) / 1000
}

/** Stepper verticale dei passi operativi (da /monitor/tasks/{id}/status). */
export function PipelineStepper({ subtasks }: { subtasks: SubtaskStatus[] }) {
  if (subtasks.length === 0) {
    return <p className="text-sm text-muted-foreground">Nessun passo operativo da mostrare.</p>
  }
  return (
    <ol className="relative space-y-1">
      {subtasks.map((st, i) => {
        const cfg = getStatusConfig(st.status)
        const Icon = cfg.icon
        const dur = durationBetween(st.started_at, st.finished_at)
        const isLast = i === subtasks.length - 1
        return (
          <li key={st.id} className="relative flex gap-3 pb-4">
            {!isLast && <span className="absolute left-[11px] top-6 h-full w-px bg-border" aria-hidden />}
            <span className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center", cfg.dot)}>
              <Icon className={cn("size-[18px]", cfg.spin && "animate-spin")} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{subtaskKindLabel(st.kind)}</span>
                {dur !== null && (
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{formatDuration(dur)}</span>
                )}
              </div>
              {st.message && <p className="truncate text-sm text-muted-foreground">{st.message}</p>}
              {st.error && <p className="mt-0.5 text-xs text-status-error">{st.error}</p>}
              {st.started_at && (
                <p className="mt-0.5 text-xs text-muted-foreground/70">
                  {formatTime(st.started_at)}
                  {st.finished_at ? ` → ${formatTime(st.finished_at)}` : ""}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

const depLabel: Record<string, string> = { hard: "hard", soft: "soft", barrier: "barrier" }

/** Grafo delle dipendenze (da /monitor/tasks/{id}/graph): nodi in ordine + archi. */
export function PipelineGraphView({ graph }: { graph: PipelineGraph }) {
  if (graph.nodes.length === 0) {
    return <p className="text-sm text-muted-foreground">Grafo non disponibile per questo task.</p>
  }
  const byId = new Map<string, GraphNode>(graph.nodes.map((n) => [n.id, n]))
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {graph.nodes.map((n) => {
          const cfg = getStatusConfig(n.status as RunStatus)
          const Icon = cfg.icon
          return (
            <div
              key={n.id}
              className={cn("flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs", cfg.className)}
              title={n.label}
            >
              <Icon className={cn("size-3.5", cfg.spin && "animate-spin")} />
              <span className="font-mono">{n.label}</span>
            </div>
          )
        })}
      </div>
      {graph.edges.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Dipendenze</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {graph.edges.map((e, i) => (
              <li key={i} className="flex items-center gap-2 font-mono">
                <span className="truncate">{byId.get(e.from)?.label ?? e.from}</span>
                <span aria-hidden>→</span>
                <span className="truncate">{byId.get(e.to)?.label ?? e.to}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 not-italic">{depLabel[e.type] ?? e.type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
