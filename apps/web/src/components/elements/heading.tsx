import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Heading({
  children,
  color = 'dark/light',
  size = 'lg',
  className,
  ...props
}: { color?: 'dark/light' | 'light'; size?: 'lg' | 'md' } & ComponentProps<'h1'>) {
  return (
    <h1
      className={clsx(
        'font-display leading-[1.05] tracking-[-0.04em] text-balance',
        size === 'lg' && 'text-[clamp(2.5rem,6.5vw,4rem)]',
        size === 'md' && 'text-[clamp(2rem,5vw,3rem)]',
        color === 'dark/light' && 'text-mist-950',
        color === 'light' && 'text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
