"use client"

import Link from "next/link"
import {
  FileText,
  Folder,
  Zap,
  Sparkles,
  Clock,
  ArrowRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { getStatusConfig, type Status } from "@/lib/status"
import {
  getCreditsBarClass,
  getCreditsLevel,
  getDocumentsRemaining,
} from "@/lib/credits"
import { useDashboardLocale } from "../_lib/dashboard-locale"

const content = {
  it: {
    heading: "Panoramica",
    subtitle: "Bentornato, Marco. Ecco un riepilogo della tua attivita.",
    newDocument: "Nuovo documento",
    stats: {
      documentsCreated: "Documenti creati",
      thisMonth: "questo mese",
      activeProjects: "Progetti attivi",
      total: "totali",
      creditsUsed: "Crediti utilizzati",
      daysRemaining: "Giorni rimanenti",
      inCycle: "nel ciclo",
      documentsRemaining: (n: number) =>
        `Puoi generare ${n} ${n === 1 ? "documento" : "documenti"}`,
      creditsExhausted: "Crediti esauriti",
    },
    charts: {
      generatedDocuments: "Documenti generati",
      lastSixMonths: "Ultimi 6 mesi",
      creditsUsage: "Utilizzo crediti",
      documentsLabel: "Documenti",
      creditsLabel: "Crediti",
    },
    recent: {
      title: "Documenti recenti",
      description: "I tuoi ultimi contenuti generati",
      viewAll: "Vedi tutti",
    },
    empty: {
      title: "Benvenuto in Verbalist",
      description: "Bastano tre passi per pubblicare il tuo primo contenuto ottimizzato.",
      steps: [
        {
          title: "Crea un progetto",
          description: "Organizza i tuoi documenti in cartelle per cliente o canale.",
        },
        {
          title: "Genera il documento",
          description: "Inserisci una keyword e Verbalist analizza la SERP per te.",
        },
        {
          title: "Esporta o pubblica",
          description: "Copia il testo o scarica in più formati pronti per il web.",
        },
      ],
      cta: "Crea il tuo primo documento",
    },
  },
  en: {
    heading: "Overview",
    subtitle: "Welcome back, Marco. Here's a summary of your activity.",
    newDocument: "New document",
    stats: {
      documentsCreated: "Documents created",
      thisMonth: "this month",
      activeProjects: "Active projects",
      total: "total",
      creditsUsed: "Credits used",
      daysRemaining: "Days remaining",
      inCycle: "in the cycle",
      documentsRemaining: (n: number) =>
        `You can generate ${n} ${n === 1 ? "document" : "documents"}`,
      creditsExhausted: "Credits exhausted",
    },
    charts: {
      generatedDocuments: "Generated documents",
      lastSixMonths: "Last 6 months",
      creditsUsage: "Credits usage",
      documentsLabel: "Documents",
      creditsLabel: "Credits",
    },
    recent: {
      title: "Recent documents",
      description: "Your latest generated content",
      viewAll: "View all",
    },
    empty: {
      title: "Welcome to Verbalist",
      description: "Three steps to publish your first optimized piece.",
      steps: [
        {
          title: "Create a project",
          description: "Group your documents into folders by client or channel.",
        },
        {
          title: "Generate the document",
          description: "Enter a keyword and Verbalist analyzes the SERP for you.",
        },
        {
          title: "Export or publish",
          description: "Copy the text or download in multiple web-ready formats.",
        },
      ],
      cta: "Create your first document",
    },
  },
}

// Mock data for charts
const contentGeneratedData = {
  it: [
    { month: "Set", documenti: 12 },
    { month: "Ott", documenti: 18 },
    { month: "Nov", documenti: 15 },
    { month: "Dic", documenti: 22 },
    { month: "Gen", documenti: 28 },
    { month: "Feb", documenti: 24 },
  ],
  en: [
    { month: "Sep", documenti: 12 },
    { month: "Oct", documenti: 18 },
    { month: "Nov", documenti: 15 },
    { month: "Dec", documenti: 22 },
    { month: "Jan", documenti: 28 },
    { month: "Feb", documenti: 24 },
  ],
}

const creditsUsageData = {
  it: [
    { month: "Set", crediti: 80 },
    { month: "Ott", crediti: 120 },
    { month: "Nov", crediti: 95 },
    { month: "Dic", crediti: 140 },
    { month: "Gen", crediti: 156 },
    { month: "Feb", crediti: 132 },
  ],
  en: [
    { month: "Sep", crediti: 80 },
    { month: "Oct", crediti: 120 },
    { month: "Nov", crediti: 95 },
    { month: "Dec", crediti: 140 },
    { month: "Jan", crediti: 156 },
    { month: "Feb", crediti: 132 },
  ],
}

const recentDocumentsData = {
  it: [
    {
      id: "1",
      title: "Guida completa al SEO nel 2025",
      project: "Blog Aziendale",
      status: "completed",
      createdAt: "2 ore fa",
    },
    {
      id: "2",
      title: "Come scegliere il miglior CRM",
      project: "Landing Pages",
      status: "processing",
      createdAt: "5 ore fa",
    },
    {
      id: "3",
      title: "10 strategie di marketing B2B",
      project: "Blog Aziendale",
      status: "completed",
      createdAt: "1 giorno fa",
    },
    {
      id: "4",
      title: "Ottimizzazione pagina prodotto",
      project: "E-commerce",
      status: "completed",
      createdAt: "2 giorni fa",
    },
  ],
  en: [
    {
      id: "1",
      title: "Complete SEO Guide for 2025",
      project: "Corporate Blog",
      status: "completed",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      title: "How to Choose the Best CRM",
      project: "Landing Pages",
      status: "processing",
      createdAt: "5 hours ago",
    },
    {
      id: "3",
      title: "10 B2B Marketing Strategies",
      project: "Corporate Blog",
      status: "completed",
      createdAt: "1 day ago",
    },
    {
      id: "4",
      title: "Product Page Optimization",
      project: "E-commerce",
      status: "completed",
      createdAt: "2 days ago",
    },
  ],
}

export function DashboardContent() {
  const { locale, t } = useDashboardLocale()
  const statusCfg = getStatusConfig(locale)

  const txt = t(content)
  const chartData = t(contentGeneratedData)
  const creditsData = t(creditsUsageData)
  const recentDocuments = t(recentDocumentsData)

  const chartConfig = {
    documenti: {
      label: txt.charts.documentsLabel,
      color: "var(--primary)",
    },
    crediti: {
      label: txt.charts.creditsLabel,
      color: "var(--primary)",
    },
  }

  const stats = [
    {
      name: txt.stats.documentsCreated,
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      description: txt.stats.thisMonth,
      href: "/dashboard/documents",
    },
    {
      name: txt.stats.activeProjects,
      value: "5",
      change: "+2",
      changeType: "positive" as const,
      icon: Folder,
      description: txt.stats.total,
      href: "/dashboard/projects",
    },
    {
      name: txt.stats.creditsUsed,
      value: "156",
      total: "500",
      icon: Zap,
      description: txt.stats.thisMonth,
      href: "/dashboard/subscription",
    },
    {
      name: txt.stats.daysRemaining,
      value: "23",
      icon: Clock,
      description: txt.stats.inCycle,
      href: "/dashboard/subscription",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <PageHeading>{txt.heading}</PageHeading>
          <PageDescription>{txt.subtitle}</PageDescription>
        </div>
        <Button asChild variant="accent">
          <Link href="/dashboard/documents/new">
            <Plus className="mr-2 size-4" />
            {txt.newDocument}
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Card
              className={cn(
                "h-full cursor-pointer transition-colors hover:border-primary/40 hover:bg-muted/40",
                stat.total ? "bg-muted/30" : undefined
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className="size-5 text-muted-foreground" />
                  {stat.change && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        stat.changeType === "positive"
                          ? "text-status-success"
                          : "text-status-error"
                      }`}
                    >
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-display tracking-tight tabular-nums">{stat.value}</span>
                    {stat.total && (
                      <span className="text-sm text-muted-foreground">
                        /{stat.total}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
                  {stat.total && (() => {
                    const used = parseInt(stat.value)
                    const total = parseInt(stat.total)
                    const remaining = getDocumentsRemaining(used, total)
                    return (
                      <p className="text-xs text-muted-foreground">
                        {remaining > 0
                          ? txt.stats.documentsRemaining(remaining)
                          : txt.stats.creditsExhausted}
                      </p>
                    )
                  })()}
                </div>
                {stat.total && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          getCreditsBarClass(
                            getCreditsLevel(parseInt(stat.value), parseInt(stat.total))
                          )
                        )}
                        style={{
                          width: `${(parseInt(stat.value) / parseInt(stat.total)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">{txt.charts.generatedDocuments}</CardTitle>
            <CardDescription>{txt.charts.lastSixMonths}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={[...chartData]} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="documenti"
                  fill="var(--color-documenti)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">{txt.charts.creditsUsage}</CardTitle>
            <CardDescription>{txt.charts.lastSixMonths}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <LineChart data={[...creditsData]} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="crediti"
                  stroke="var(--color-crediti)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-crediti)", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      {recentDocuments.length > 0 ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">
                {txt.recent.title}
              </CardTitle>
              <CardDescription>{txt.recent.description}</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/documents">
                {txt.recent.viewAll}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/dashboard/documents/${doc.id}`}
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.project} · {doc.createdAt}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusCfg[doc.status as Status].className
                    }`}
                  >
                    {statusCfg[doc.status as Status].label}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-8 lg:p-10">
            <div className="text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-foreground/10 mx-auto mb-4">
                <Sparkles className="size-6 text-foreground" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">{txt.empty.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                {txt.empty.description}
              </p>
            </div>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {txt.empty.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="rounded-lg border bg-background/60 p-4"
                >
                  <div className="flex size-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-medium tabular-nums">
                    {i + 1}
                  </div>
                  <p className="mt-3 font-medium text-sm">{s.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="accent">
                <Link href="/dashboard/documents/new">
                  <Plus className="mr-2 size-4" />
                  {txt.empty.cta}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
