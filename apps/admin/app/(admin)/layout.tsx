"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ListChecks, ExternalLink, FileCode2, FlaskConical } from "lucide-react"
import { cn } from "@/lib/utils"
import { IS_MOCK } from "@/lib/admin/api"
import { VerbalistMark } from "@/components/verbalist-mark"
import { Toaster } from "@/components/ui/sonner"
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const BACKEND_URL = process.env.NEXT_PUBLIC_JOB_MANAGER_URL ?? ""

const nav = [
  { name: "Panoramica", href: "/", icon: LayoutDashboard, exact: true },
  { name: "Task", href: "/tasks", icon: ListChecks, exact: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href)

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-14 border-b border-border">
          <Link href="/" className="flex items-center gap-2 px-2 text-foreground" aria-label="Verbalist Admin">
            <VerbalistMark className="size-6 shrink-0" />
            <span className="font-display font-medium tracking-tight group-data-[collapsible=icon]:hidden">
              Admin
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Monitoraggio</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href, item.exact)} tooltip={item.name}>
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {BACKEND_URL && (
            <SidebarGroup>
              <SidebarGroupLabel>Backend</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="API docs (Swagger)">
                      <a href={`${BACKEND_URL}/docs`} target="_blank" rel="noreferrer">
                        <FileCode2 className="size-4" />
                        <span>API docs</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-medium",
                IS_MOCK ? "bg-status-warning/10 text-status-warning" : "bg-status-success/10 text-status-success",
              )}
            >
              <FlaskConical className="size-3.5" />
              {IS_MOCK ? "Dati demo" : "Backend live"}
            </span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-lg">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">Verbalist · Monitoraggio backend AI</span>
          <div className="flex-1" />
          {IS_MOCK && (
            <span className="hidden items-center gap-1.5 rounded-md bg-status-warning/10 px-2 py-1 text-xs font-medium text-status-warning sm:inline-flex">
              Dati demo, backend non collegato
            </span>
          )}
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>

      <Toaster />
    </SidebarProvider>
  )
}
