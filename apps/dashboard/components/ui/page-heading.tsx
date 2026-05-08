import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function PageEyebrow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sm/7 font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function PageHeading({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-display font-medium tracking-tight text-xl lg:text-2xl",
        className,
      )}
      {...props}
    />
  )
}

export function PageDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    />
  )
}
