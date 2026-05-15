import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function Stat({
  stat,
  text,
  className,
  ...props
}: { stat: ReactNode; text: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('border-l border-mist-950/20 pl-6', className)} {...props}>
      <div className="text-2xl/10 tracking-tight text-mist-950">{stat}</div>
      <p className="mt-2 text-sm/7 text-mist-700">{text}</p>
    </div>
  )
}

export function StatsWithGraph({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </Section>
  )
}
