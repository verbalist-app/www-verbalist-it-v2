'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'

type Mode = 'login' | 'signup'

const copy = {
  login: {
    eyebrow: 'Accedi',
    headline: 'Bentornato',
    sub: 'Entra con email e password per riprendere la tua dashboard.',
    submit: 'Accedi',
    swapHint: 'Non hai ancora un account?',
    swapLabel: 'Crea un account',
    swapHref: '/signup',
  },
  signup: {
    eyebrow: 'Registrati',
    headline: 'Crea il tuo account',
    sub: 'Bastano email e password. Niente carta richiesta in prova.',
    submit: 'Crea account',
    swapHint: 'Hai già un account?',
    swapLabel: 'Accedi',
    swapHref: '/login',
  },
} satisfies Record<
  Mode,
  {
    eyebrow: string
    headline: string
    sub: string
    submit: string
    swapHint: string
    swapLabel: string
    swapHref: string
  }
>

export function AuthCard({ mode }: { mode: Mode }) {
  const c = copy[mode]
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="font-display text-3xl/9 font-medium tracking-[-0.03em] text-balance text-mist-950 sm:text-[2.5rem]/10">
          {c.headline}
        </h1>
        <p className="text-base/7 text-mist-700">{c.sub}</p>
      </div>

      {submitted ? (
        <div className="rounded-lg bg-mist-950/2.5 p-4 inset-ring-1 inset-ring-mist-950/10">
          <p className="text-sm/6 text-mist-700">
            Form inviato (mock). L&rsquo;integrazione con la dashboard sarà collegata in seguito.
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
                  className="text-xs/5 font-medium text-mist-700 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
                >
                  Password dimenticata?
                </Link>
              ) : (
                <span className="text-xs/5 text-mist-700">Almeno 8 caratteri.</span>
              )
            }
          />

          {mode === 'signup' && (
            <label className="mt-2 flex items-start gap-2 text-xs/5 text-mist-700">
              <input
                type="checkbox"
                required
                className="mt-1 size-4 rounded border-mist-950/20 text-mist-950 focus:ring-mist-950"
              />
              <span>
                Accetto i{' '}
                <Link
                  href="/termini-e-condizioni"
                  className="font-medium text-mist-950 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
                >
                  Termini di servizio
                </Link>{' '}
                e la{' '}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-mist-950 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
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

      <div className="border-t border-mist-950/10 pt-6 text-sm/6 text-mist-700">
        {c.swapHint}{' '}
        <Link
          href={c.swapHref}
          className="font-medium text-mist-950 underline decoration-mist-950/30 underline-offset-4 hover:decoration-mist-950"
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
        <label htmlFor={id} className="text-sm/6 font-medium text-mist-950">
          {label}
        </label>
        {hint}
      </div>
      <input
        id={id}
        name={id}
        className="w-full rounded-md border border-mist-950/15 bg-white px-3 py-2 text-base/6 text-mist-950 placeholder:text-mist-500 focus:border-mist-950 focus:outline-none focus:ring-1 focus:ring-mist-950 sm:text-sm/6"
        {...props}
      />
    </div>
  )
}
