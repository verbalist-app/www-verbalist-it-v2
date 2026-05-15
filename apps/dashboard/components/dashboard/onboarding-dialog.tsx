"use client"

import * as React from "react"
import { Folder, Sparkles, Pencil, Zap, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const STORAGE_KEY = "verbalist:onboarding-completed"

const text = {
  it: {
    title: "Benvenuto in Verbalist",
    description: "Quattro passaggi rapidi per orientarti.",
    skip: "Salta",
    back: "Indietro",
    next: "Avanti",
    done: "Inizia",
    steps: [
      {
        icon: Folder,
        title: "Organizza in progetti",
        body: "I documenti vivono dentro Progetti. Crea un progetto per cliente, canale o campagna così non perdi nulla.",
      },
      {
        icon: Sparkles,
        title: "Genera da keyword o da testo",
        body: "Scegli 'Crea da parole chiave' per partire da zero oppure 'Crea da testo' per ottimizzare una bozza esistente.",
      },
      {
        icon: Pencil,
        title: "Modifica ed esporta",
        body: "Il documento generato è subito editabile in piattaforma. Quando è pronto, esporta in .md, HTML o testo pulito.",
      },
      {
        icon: Zap,
        title: "Tieni d'occhio i crediti",
        body: "Il contatore in alto a destra mostra quanti documenti puoi ancora generare nel ciclo. Cliccalo per il dettaglio.",
      },
    ],
  },
  en: {
    title: "Welcome to Verbalist",
    description: "Four quick steps to get you oriented.",
    skip: "Skip",
    back: "Back",
    next: "Next",
    done: "Get started",
    steps: [
      {
        icon: Folder,
        title: "Organize in projects",
        body: "Documents live inside Projects. Create one per client, channel, or campaign so nothing gets lost.",
      },
      {
        icon: Sparkles,
        title: "Create from keywords or text",
        body: "Pick 'Create from keywords' to start from scratch, or 'Create from text' to optimize an existing draft.",
      },
      {
        icon: Pencil,
        title: "Edit and export",
        body: "Generated documents are editable in-app. When ready, export to .md, HTML, or plain text.",
      },
      {
        icon: Zap,
        title: "Keep an eye on credits",
        body: "The counter in the top right shows how many documents you can still generate. Click it for details.",
      },
    ],
  },
}

export function OnboardingDialog() {
  const { t } = useDashboardLocale()
  const labels = t(text)
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const done = window.localStorage.getItem(STORAGE_KEY)
    if (!done) setOpen(true)
  }, [])

  const total = labels.steps.length
  const current = labels.steps[step]
  const Icon = current.icon

  const dismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    }
    setOpen(false)
  }

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1)
    } else {
      dismiss()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss()
        else setOpen(true)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="font-medium">{current.title}</p>
              <p className="text-xs text-muted-foreground">
                {step + 1} / {total}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{current.body}</p>

          <div className="mt-6 flex items-center gap-1.5">
            {labels.steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i === step ? "bg-foreground" : i < step ? "bg-foreground/40" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        <DialogFooter className="flex sm:flex-row sm:justify-between gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={dismiss}>
            {labels.skip}
          </Button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft className="mr-2 size-4" />
                {labels.back}
              </Button>
            )}
            <Button type="button" size="sm" onClick={handleNext}>
              {step < total - 1 ? labels.next : labels.done}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
