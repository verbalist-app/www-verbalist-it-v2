"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Folder,
  FileText,
  Settings,
  CreditCard,
  Plus,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
  Globe,
  Zap,
} from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  getCreditsLevel,
  getCreditsTextClass,
  getDocumentsRemaining,
} from "@/lib/credits"
import { VerbalistMark } from "@/components/verbalist-mark"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Toaster } from "@/components/ui/sonner"
import { OnboardingDialog } from "@/components/dashboard/onboarding-dialog"
import { DashboardLocaleProvider, useDashboardLocale } from "./_lib/dashboard-locale"

const layoutContent = {
  it: {
    nav: {
      overview: "Panoramica",
      projects: "Progetti",
      documents: "Documenti",
      expandProjects: "Mostra progetti",
      collapseProjects: "Nascondi progetti",
    },
    secondary: {
      settings: "Impostazioni",
      subscription: "Abbonamento",
    },
    newDoc: "Nuovo documento",
    menu: "Menu",
    account: "Account",
    logout: "Esci",
    search: "Cerca...",
    site: "Sito",
    creditsBadge: (n: number) =>
      `${n} ${n === 1 ? "documento residuo" : "documenti residui"}`,
    creditsBadgeTitle: "Vai all'abbonamento",
    command: {
      placeholder: "Cerca documenti, progetti, azioni...",
      empty: "Nessun risultato trovato.",
      quickActions: "Azioni rapide",
      newDoc: "Nuovo documento",
      goProjects: "Vai ai progetti",
      goDocs: "Vai ai documenti",
      recentDocs: "Documenti recenti",
      settings: "Impostazioni",
    },
  },
  en: {
    nav: {
      overview: "Overview",
      projects: "Projects",
      documents: "Documents",
      expandProjects: "Show projects",
      collapseProjects: "Hide projects",
    },
    secondary: {
      settings: "Settings",
      subscription: "Subscription",
    },
    newDoc: "New document",
    menu: "Menu",
    account: "Account",
    logout: "Log out",
    search: "Search...",
    site: "Website",
    creditsBadge: (n: number) =>
      `${n} ${n === 1 ? "doc left" : "docs left"}`,
    creditsBadgeTitle: "Go to subscription",
    command: {
      placeholder: "Search documents, projects, actions...",
      empty: "No results found.",
      quickActions: "Quick actions",
      newDoc: "New document",
      goProjects: "Go to projects",
      goDocs: "Go to documents",
      recentDocs: "Recent documents",
      settings: "Settings",
    },
  },
}

// Mock user data
const user = {
  name: "Marco Rossi",
  email: "marco@agenzia.it",
  plan: "Professional",
  avatar: null,
}

// Mock recent documents for command menu
const recentDocuments = {
  it: [
    { id: "1", title: "Guida completa al SEO nel 2025" },
    { id: "2", title: "Come scegliere il miglior CRM" },
    { id: "3", title: "10 strategie di marketing B2B" },
  ],
  en: [
    { id: "1", title: "Complete SEO Guide for 2025" },
    { id: "2", title: "How to Choose the Best CRM" },
    { id: "3", title: "10 B2B Marketing Strategies" },
  ],
}

// Mock projects for sidebar tree-view
const sidebarProjects = {
  it: [
    { id: "1", name: "Blog Aziendale" },
    { id: "2", name: "Landing Pages" },
    { id: "3", name: "E-commerce" },
    { id: "4", name: "Guide Tecniche" },
  ],
  en: [
    { id: "1", name: "Corporate Blog" },
    { id: "2", name: "Landing Pages" },
    { id: "3", name: "E-commerce" },
    { id: "4", name: "Technical Guides" },
  ],
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLocaleProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardLocaleProvider>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale, setLocale, t } = useDashboardLocale()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [isMac, setIsMac] = React.useState(true)

  const txt = t(layoutContent)
  const docs = t(recentDocuments)
  const projects = t(sidebarProjects)

  // Mock subscription credits (mirrors mock data in /subscription and /dashboard)
  const CREDITS_USED = 156
  const CREDITS_TOTAL = 500
  const documentsRemaining = getDocumentsRemaining(CREDITS_USED, CREDITS_TOTAL)
  const creditsLevel = getCreditsLevel(CREDITS_USED, CREDITS_TOTAL)

  const trailingNavigation = [
    { name: txt.nav.documents, href: "/dashboard/documents", icon: FileText },
  ]

  const projectsHref = "/dashboard/projects"
  const isProjectsRouteActive = pathname.startsWith(projectsHref)
  const [projectsOpen, setProjectsOpen] = React.useState(isProjectsRouteActive)

  React.useEffect(() => {
    if (isProjectsRouteActive) setProjectsOpen(true)
  }, [isProjectsRouteActive])

  const secondaryNavigation = [
    { name: txt.secondary.settings, href: "/dashboard/settings", icon: Settings },
    { name: txt.secondary.subscription, href: "/dashboard/subscription", icon: CreditCard },
  ]

  React.useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent))
  }, [])

  // Command menu keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setCommandOpen(false)
    command()
  }, [])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-14 border-b border-border flex items-center justify-center">
          <Link href="/dashboard" className="text-foreground" aria-label="Verbalist">
            <VerbalistMark className="size-6" />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          {/* New Document Button */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={txt.newDoc}>
                    <Link href="/dashboard/documents/new">
                      <Plus className="size-4" />
                      <span>{txt.newDoc}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>{txt.menu}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Overview (first item) */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard"}
                    tooltip={txt.nav.overview}
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="size-4" />
                      <span>{txt.nav.overview}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Projects with collapsible tree */}
                <Collapsible
                  asChild
                  open={projectsOpen}
                  onOpenChange={setProjectsOpen}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isProjectsRouteActive}
                      tooltip={txt.nav.projects}
                    >
                      <Link href={projectsHref}>
                        <Folder className="size-4" />
                        <span>{txt.nav.projects}</span>
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        aria-label={
                          projectsOpen
                            ? txt.nav.collapseProjects
                            : txt.nav.expandProjects
                        }
                      >
                        <ChevronRight
                          className={cn(
                            "size-3.5 transition-transform",
                            projectsOpen && "rotate-90"
                          )}
                        />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {projects.map((p) => {
                          const href = `/dashboard/projects/${p.id}`
                          return (
                            <SidebarMenuSubItem key={p.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === href}
                              >
                                <Link href={href}>
                                  <Folder className="size-3.5" />
                                  <span>{p.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                {/* Other top-level nav items */}
                {trailingNavigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Secondary Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>{txt.account}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" tooltip={user.name}>
                    <User className="size-4 shrink-0" />
                    <div className="flex flex-col gap-0.5 leading-none truncate group-data-[collapsible=icon]:hidden">
                      <span className="font-medium truncate">{user.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                    <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                  align="start"
                  side="top"
                  sideOffset={4}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 size-4" />
                      {txt.secondary.settings}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/subscription" className="cursor-pointer">
                      <CreditCard className="mr-2 size-4" />
                      {txt.secondary.subscription}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_SITE_URL
                          ? `${process.env.NEXT_PUBLIC_SITE_URL}/forms/sign-in`
                          : "/forms/sign-in"
                      }
                      className="cursor-pointer text-destructive"
                    >
                      <LogOut className="mr-2 size-4" />
                      {txt.logout}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-lg px-4">
          <SidebarTrigger className="-ml-1" />

          {/* Search */}
          <Button
            variant="outline"
            className="relative h-9 w-full max-w-sm justify-start text-sm text-muted-foreground"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="mr-2 size-4" />
            <span>{txt.search}</span>
            <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[11px] font-medium opacity-100 sm:flex">
              <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
            </kbd>
          </Button>

          <div className="flex-1" />

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn("hidden sm:inline-flex", getCreditsTextClass(creditsLevel))}
            title={txt.creditsBadgeTitle}
          >
            <Link href="/dashboard/subscription">
              <Zap className="mr-1.5 size-3.5" />
              <span className="tabular-nums">{txt.creditsBadge(documentsRemaining)}</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocale(locale === "it" ? "en" : "it")}
            title={locale === "it" ? "Switch to English" : "Passa all'italiano"}
          >
            <Globe className="mr-2 size-4" />
            {locale === "it" ? "EN" : "IT"}
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 size-4" />
              {txt.site}
            </Link>
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>

      {/* Command Menu */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder={txt.command.placeholder} />
        <CommandList>
          <CommandEmpty>{txt.command.empty}</CommandEmpty>
          <CommandGroup heading={txt.command.quickActions}>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/documents/new"))}>
              <Plus className="mr-2 size-4" />
              {txt.command.newDoc}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/projects"))}>
              <Folder className="mr-2 size-4" />
              {txt.command.goProjects}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/documents"))}>
              <FileText className="mr-2 size-4" />
              {txt.command.goDocs}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={txt.command.recentDocs}>
            {docs.map((doc) => (
              <CommandItem
                key={doc.id}
                onSelect={() => runCommand(() => router.push(`/dashboard/documents/${doc.id}`))}
              >
                <FileText className="mr-2 size-4" />
                {doc.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={txt.command.settings}>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
              <Settings className="mr-2 size-4" />
              {txt.secondary.settings}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/subscription"))}>
              <CreditCard className="mr-2 size-4" />
              {txt.secondary.subscription}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Toast notifications */}
      <Toaster />

      {/* First-access onboarding walkthrough */}
      <OnboardingDialog />
    </SidebarProvider>
  )
}
