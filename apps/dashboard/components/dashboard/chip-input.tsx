"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * Input a "chip": Invio o virgola aggiungono una voce, Backspace su campo vuoto rimuove l'ultima.
 * Usato nel profilo brand per glossario, termini vietati e link interni.
 */
export function ChipInput({
  id,
  value,
  onChange,
  placeholder,
  hint,
  removeLabel,
  className,
}: {
  id: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  hint?: string
  removeLabel: string
  className?: string
}) {
  const [draft, setDraft] = React.useState("")

  const commit = () => {
    const next = draft.trim().replace(/,+$/, "").trim()
    setDraft("")
    if (!next || value.includes(next)) return
    onChange([...value, next])
  }

  return (
    <div className={cn("space-y-2", className)}>
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {value.map((chip) => (
            <li
              key={chip}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-muted/40 py-0.5 pl-2.5 pr-1 text-xs"
            >
              <span className="truncate">{chip}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((c) => c !== chip))}
                className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`${removeLabel}: ${chip}`}
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Input
        id={id}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            commit()
          } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
            onChange(value.slice(0, -1))
          }
        }}
        onBlur={commit}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
