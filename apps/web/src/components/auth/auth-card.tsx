'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/elements/button'

type Mode = 'login' | 'signup'

const copy = {
  login: {
    eyebrow: 'Accedi',
    headline: 'Bentornato.',
    sub: 'Entra con email e password per riprendere la tua dashboard.',
    submit: 'Accedi',
    swapHint: 'Non hai ancora un account?',
    swapLabel: 'Crea un account',
    swapHref: '/signup',
  },
  signup: {
    eyebrow: 'Registrati',
    headline: 'Crea il tuo account.',
    sub: 'Bastano email e password. Niente carta richiesta in prova.',
    submit: 'Crea account',
    swapHint: 'Hai già un account?',
    swapLabel: 'Accedi',
    swapHref: '/login',
  },
} satisfies Record<Mode, {
  eyebrow: string
  headline: string
  sub: string
  submit: string
  swapHint: string
  swapLabel: string
  swapHref: string
}>

export function AuthCard({ mode }: { mode: Mode }) {
  const c = copy[mode]
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p
          aria-hidden="true"
          className="invisible font-mono text-xs uppercase tracking-wider"
        >
          {c.eyebrow}
        </p>
        <h1 className="font-display text-3xl/10 font-medium tracking-[-0.03em] text-mist-950 dark:text-white sm:text-4xl/12">
          {c.headline}
        </h1>
        <p className="text-base text-mist-700 dark:text-mist-300">{c.sub}</p>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-mist-200 bg-mist-50 p-4 dark:border-mist-800 dark:bg-mist-900">
          <p className="text-sm text-mist-700 dark:text-mist-300">
            Form inviato (mock). L&rsquo;integrazione con la dashboard sarà
            collegata in seguito.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <Field
              id="name"
              label="Nome e cognome"
              type="text"
              autoComplete="name"
              placeholder="Maria Rossi"
              required
            />
          )}
          <Field
            id="email"
            label="Email di lavoro"
            type="email"
            autoComplete="email"
            placeholder="nome@azienda.it"
            required
          />
          <Field
            id="password"
            label="Password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            placeholder="•••••••••"
            required
            hint={
              mode === 'login' ? (
                <Link
                  href="#"
                  className="text-xs font-medium text-mist-700 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-mist-300 dark:hover:decoration-white"
                >
                  Password dimenticata?
                </Link>
              ) : (
                <span className="text-xs text-mist-500 dark:text-mist-400">
                  Almeno 8 caratteri.
                </span>
              )
            }
          />

          {mode === 'signup' && (
            <label className="mt-2 flex items-start gap-2 text-xs text-mist-700 dark:text-mist-300">
              <input
                type="checkbox"
                required
                className="mt-1 size-4 rounded border-mist-300 text-mist-950 focus:ring-mist-950 dark:border-mist-700 dark:bg-mist-900 dark:text-white"
              />
              <span>
                Accetto i{' '}
                <Link
                  href="/termini"
                  className="font-medium text-mist-950 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-white dark:hover:decoration-white"
                >
                  Termini di servizio
                </Link>{' '}
                e la{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-mist-950 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-white dark:hover:decoration-white"
                >
                  Privacy policy
                </Link>
                .
              </span>
            </label>
          )}

          <Button type="submit" size="lg" className="mt-2 w-full">
            {c.submit}
          </Button>
        </form>
      )}

      <div className="border-t border-mist-200 pt-6 text-sm text-mist-700 dark:border-mist-800 dark:text-mist-300">
        {c.swapHint}{' '}
        <Link
          href={c.swapHref}
          className="font-medium text-mist-950 underline decoration-mist-400 underline-offset-4 hover:decoration-mist-950 dark:text-white dark:hover:decoration-white"
        >
          {c.swapLabel}
        </Link>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  hint,
  ...props
}: {
  id: string
  label: string
  hint?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium text-mist-950 dark:text-white"
        >
          {label}
        </label>
        {hint}
      </div>
      <input
        id={id}
        name={id}
        className="w-full rounded-md border border-mist-300 bg-white px-3 py-2 text-sm text-mist-950 placeholder:text-mist-400 focus:border-mist-950 focus:outline-none focus:ring-1 focus:ring-mist-950 dark:border-mist-700 dark:bg-mist-900 dark:text-white dark:placeholder:text-mist-500 dark:focus:border-white dark:focus:ring-white"
        {...props}
      />
    </div>
  )
}
