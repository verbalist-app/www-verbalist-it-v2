"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type DashboardLocale = "it" | "en"

interface DashboardLocaleContextValue {
  locale: DashboardLocale
  setLocale: (locale: DashboardLocale) => void
  t: <T>(translations: Record<DashboardLocale, T>) => T
}

const DashboardLocaleContext = createContext<DashboardLocaleContextValue | null>(null)

const STORAGE_KEY = "verbalist-dashboard-locale"

export function DashboardLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<DashboardLocale>("it")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "it") {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (newLocale: DashboardLocale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  const t = <T,>(translations: Record<DashboardLocale, T>): T => translations[locale]

  return (
    <DashboardLocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </DashboardLocaleContext.Provider>
  )
}

export function useDashboardLocale() {
  const context = useContext(DashboardLocaleContext)
  if (!context) throw new Error("useDashboardLocale must be used within DashboardLocaleProvider")
  return context
}
