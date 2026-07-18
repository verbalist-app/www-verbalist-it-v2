"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Carica `fn` al mount e poi ogni `intervalMs` (0 = una sola volta).
 * Passare una `fn` stabile (avvolta in useCallback) per evitare loop.
 */
export function usePoll<T>(fn: () => Promise<T>, intervalMs = 8000) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const fnRef = useRef(fn)
  fnRef.current = fn

  const load = useCallback(async () => {
    try {
      const d = await fnRef.current()
      setData(d)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    if (!intervalMs) return
    const t = setInterval(load, intervalMs)
    return () => clearInterval(t)
  }, [load, intervalMs])

  return { data, error, loading, refresh: load }
}
