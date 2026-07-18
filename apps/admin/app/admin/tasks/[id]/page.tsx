"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, TriangleAlert } from "lucide-react"
import { PageHeading } from "@/components/ui/page-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/admin/status-badge"
import { TaskActions } from "@/components/admin/task-actions"
import { PipelineStepper, PipelineGraphView } from "@/components/admin/pipeline-view"
import {
  getTaskOverview,
  getTaskStatus,
  getTaskGraph,
  getTaskTimeline,
  getTaskSubtasks,
} from "@/lib/admin/api"
import { usePoll } from "@/lib/admin/use-poll"
import { taskKindLabel, subtaskKindLabel } from "@/lib/status"
import { formatDuration, formatDateTime, formatTime, formatPercent } from "@/lib/admin/format"
import { costForTokens, formatUsd, formatTokens } from "@/lib/admin/pricing"

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const loadOverview = React.useCallback(() => getTaskOverview(id), [id])
  const loadStatus = React.useCallback(() => getTaskStatus(id, "it"), [id])
  const loadGraph = React.useCallback(() => getTaskGraph(id), [id])
  const loadTimeline = React.useCallback(() => getTaskTimeline(id), [id])
  const loadSubtasks = React.useCallback(() => getTaskSubtasks(id), [id])

  const { data: overview, refresh: refreshOverview } = usePoll(loadOverview, 5000)
  const { data: status, refresh: refreshStatus } = usePoll(loadStatus, 5000)
  const { data: graph } = usePoll(loadGraph, 12000)
  const { data: timeline } = usePoll(loadTimeline, 8000)
  const { data: subtasks } = usePoll(loadSubtasks, 12000)

  const refreshAll = React.useCallback(() => {
    refreshOverview()
    refreshStatus()
  }, [refreshOverview, refreshStatus])

  // aggregazione token/costo
  const tokenRows = (subtasks?.subtasks ?? []).filter((s) => s.token_usage)
  const totals = tokenRows.reduce(
    (acc, s) => {
      const tu = s.token_usage!
      const cost = costForTokens(s.model_used, tu.input_tokens, tu.output_tokens)
      acc.input += tu.input_tokens
      acc.output += tu.output_tokens
      acc.total += tu.total_tokens
      acc.cost += cost ?? 0
      acc.priced = acc.priced || cost !== null
      return acc
    },
    { input: 0, output: 0, total: 0, cost: 0, priced: false },
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link href="/admin/tasks" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Task
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          {overview ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={overview.status} />
                <span className="text-sm text-muted-foreground">{taskKindLabel(overview.kind)}</span>
              </div>
              <PageHeading className="truncate">{overview.name ?? id}</PageHeading>
              <p className="font-mono text-xs text-muted-foreground">{id}</p>
            </>
          ) : (
            <Skeleton className="h-9 w-72" />
          )}
        </div>
        {overview && <TaskActions taskId={id} status={overview.status} onDone={refreshAll} />}
      </div>

      {status?.error && (
        <Alert variant="destructive">
          <TriangleAlert className="size-4" />
          <AlertTitle>Task in errore</AlertTitle>
          <AlertDescription className="font-mono text-xs">{status.error}</AlertDescription>
        </Alert>
      )}

      {/* Riepilogo */}
      {overview ? (
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Avanzamento</span>
              <span className="font-medium tabular-nums">{formatPercent(overview.progress_percent)}</span>
            </div>
            <Progress value={overview.progress_percent} className="h-2" />
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
              <Meta label="Subtask" value={`${overview.completed_subtasks}/${overview.total_subtasks}`} />
              <Meta label="Falliti" value={String(overview.failed_subtasks)} />
              <Meta label="Durata" value={formatDuration(overview.duration_seconds)} />
              <Meta label="Priorità" value={String(overview.priority)} />
              <Meta label="Creato" value={formatDateTime(overview.created_at)} />
              <Meta label="Avviato" value={formatDateTime(overview.started_at)} />
              <Meta label="Concluso" value={formatDateTime(overview.finished_at)} />
              <Meta label="In esecuzione" value={String(overview.running_subtasks)} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="h-40 rounded-lg" />
      )}

      {/* Tabs */}
      <Tabs defaultValue="pipeline">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="graph">Grafo</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="tokens">Token e costi</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Passi operativi</CardTitle>
            </CardHeader>
            <CardContent>
              {status ? <PipelineStepper subtasks={status.subtasks} /> : <Skeleton className="h-40" />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Grafo delle dipendenze</CardTitle>
            </CardHeader>
            <CardContent>{graph ? <PipelineGraphView graph={graph} /> : <Skeleton className="h-40" />}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Eventi</CardTitle>
            </CardHeader>
            <CardContent>
              {!timeline ? (
                <Skeleton className="h-40" />
              ) : timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nessun evento.</p>
              ) : (
                <ul className="space-y-2">
                  {timeline.map((e, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-sm">
                      <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                        {formatTime(e.timestamp)}
                      </span>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{e.kind}</span>
                      <span className="text-muted-foreground">{e.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Token e costo per passo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!subtasks ? (
                <Skeleton className="h-40" />
              ) : tokenRows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nessun consumo LLM registrato per questo task.
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Passo</TableHead>
                        <TableHead>Modello</TableHead>
                        <TableHead className="text-right">Input</TableHead>
                        <TableHead className="text-right">Output</TableHead>
                        <TableHead className="text-right">Costo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokenRows.map((s) => {
                        const tu = s.token_usage!
                        return (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium">{subtaskKindLabel(s.kind)}</TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {s.model_used ?? "—"}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{formatTokens(tu.input_tokens)}</TableCell>
                            <TableCell className="text-right tabular-nums">{formatTokens(tu.output_tokens)}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {formatUsd(costForTokens(s.model_used, tu.input_tokens, tu.output_tokens))}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <div className="flex flex-wrap justify-end gap-x-6 gap-y-1 border-t border-border pt-3 text-sm">
                    <span className="text-muted-foreground">
                      Token totali: <span className="font-medium text-foreground tabular-nums">{formatTokens(totals.total)}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Costo stimato: <span className="font-medium text-foreground tabular-nums">{formatUsd(totals.cost)}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Token e modello vengono da <code className="font-mono">/results/tasks/{"{id}"}/subtasks</code>. I
                    prezzi sono segnaposto: la fonte reale è il pricing YAML del backend (richiesta #2).
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium tabular-nums">{value}</div>
    </div>
  )
}
