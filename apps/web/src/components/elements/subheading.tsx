import { clsx } from 'clsx/lite'
import { type ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'font-display text-[clamp(1.625rem,4.5vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance text-mist-950',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
