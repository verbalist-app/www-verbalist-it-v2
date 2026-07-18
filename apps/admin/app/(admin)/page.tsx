"use client"

import * as React from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Activity, Clock, ListChecks, TriangleAlert, Cpu, Timer, Layers } from "lucide-react"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/admin/stat-card"
import { StatusBadge } from "@/components/admin/status-badge"
import { getSystemStats, getWorkers, searchTasks } from "@/lib/admin/api"
import { usePoll } from "@/lib/admin/use-poll"
import { MOCK_THROUGHPUT } from "@/lib/admin/mock"
import { taskKindLabel } from "@/lib/status"
import { formatDuration, formatDateTime, formatInt } from "@/lib/admin/format"

const chartConfig: ChartConfig = {
  completati: { label: "Completati", color: "var(--color-chart-1)" },
  falliti: { label: "Falliti", color: "var(--color-status-error)" },
}

export default function OverviewPage() {
  const loadSystem = React.useCallback(() => getSystemStats(), [])
  const loadWorkers = React.useCallback(() => getWorkers(), [])
  const loadTasks = React.useCallback(() => searchTasks({ limit: 6 }), [])

  const { data: system } = usePoll(loadSystem, 8000)
  const { data: workers } = usePoll(loadWorkers, 15000)
  const { data: tasks } = usePoll(loadTasks, 8000)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <PageHeading>Panoramica</PageHeading>
        <PageDescription>Stato del backend AI: task, coda, worker e throughput.</PageDescription>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {system ? (
          <>
            <StatCard label="Task attivi" value={system.active_tasks} icon={Activity} hint="in esecuzione o in coda" />
            <StatCard label="Subtask in coda" value={system.queued_tasks} icon={ListChecks} />
            <StatCard
              label="Task falliti"
              value={system.failed_tasks}
              icon={TriangleAlert}
              tone={system.failed_tasks > 0 ? "error" : "default"}
            />
            <StatCard label="Worker attivi" value={system.worker_count} icon={Cpu} hint="con lock attivo ora" />
            <StatCard label="Tempo medio" value={formatDuration(system.avg_completion_time)} icon={Timer} hint="per task completato" />
            <StatCard label="Ultima ora" value={system.tasks_last_hour} icon={Clock} hint="task creati" />
            <StatCard label="Totale task" value={formatInt(system.total_tasks)} icon={Layers} />
          </>
        ) : (
          Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-[92px] rounded-lg" />)
        )}
      </div>

      {/* Throughput */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Throughput</CardTitle>
          <CardDescription>Task conclusi nelle ultime 24 ore</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={MOCK_THROUGHPUT} margin={{ left: -20, right: 8, top: 4 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} interval={3} fontSize={11} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completati" stackId="a" fill="var(--color-completati)" radius={[0, 0, 2, 2]} />
              <Bar dataKey="falliti" stackId="a" fill="var(--color-falliti)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Task recenti */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Task recenti</CardTitle>
              <CardDescription>Ultimi task ricevuti dal backend</CardDescription>
            </div>
            <Link href="/tasks" className="text-sm text-muted-foreground hover:text-foreground">
              Vedi tutti
            </Link>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Creato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  ? tasks.map((t) => (
                      <TableRow key={t.id} className="cursor-pointer">
                        <TableCell className="max-w-[220px] truncate font-medium">
                          <Link href={`/tasks/${t.id}`} className="hover:underline">
                            {t.name ?? t.id}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{taskKindLabel(t.kind)}</TableCell>
                        <TableCell>
                          <StatusBadge status={t.status} />
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                          {formatDateTime(t.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  : Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={4}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Worker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Worker</CardTitle>
            <CardDescription>Performance per worker</CardDescription>
          </CardHeader>
          <CardContent>
            {workers && workers.length > 0 ? (
              <ul className="space-y-3">
                {workers.map((w) => (
                  <li key={w.worker_id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-mono">{w.worker_id}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {Math.round(w.success_rate)}% · {formatDuration(w.avg_duration)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Nessun dato worker</p>
                <p className="mt-1">
                  La vista <code className="font-mono text-xs">v_worker_performance</code> raggruppa per{" "}
                  <code className="font-mono text-xs">locked_by</code>, che viene azzerato a fine subtask, quindi
                  torna vuota. Da sistemare lato backend (richiesta #4).
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
