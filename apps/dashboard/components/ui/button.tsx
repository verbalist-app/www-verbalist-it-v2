import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants aligned with the Oatmeal monochrome system:
 * - default → muted grey pill (secondary actions)
 * - accent  → black pill (primary CTA — "ink on paper")
 * - outline → transparent with border (tertiary)
 * - ghost   → transparent, hover muted (icon buttons, navigation)
 * - destructive → red (delete/dangerous actions)
 * - link    → underlined text link
 * Pill shape (rounded-full) and font-medium keep brand identity coherent with the marketing site.
 */
const buttonVariants = cva(
    'cursor-pointer active:scale-99 duration-150 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ease-in-out focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-muted text-foreground hover:bg-secondary',
                accent: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'text-foreground border border-border bg-transparent hover:bg-muted',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
                ghost: 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-11 px-6',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
