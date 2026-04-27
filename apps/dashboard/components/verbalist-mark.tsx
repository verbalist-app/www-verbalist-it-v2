import * as React from "react"
import { cn } from "@/lib/utils"

/** Verbalist symbol — same paths as apps/web Logo.astro; uses currentColor (no legacy brown #473424). */
export function VerbalistMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 224.87999 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
      {...props}
    >
      <g clipPath="url(#verbalist-mark-clip)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M 169.160156 0.242188 L 139.300781 52.546875 L 121.253906 84.148438 L 104.054688 114.273438 L 94.179688 131.566406 L 72.527344 169.492188 L 72.515625 169.515625 L 104.058594 224.757812 L 123.785156 190.207031 L 135.597656 169.515625 L 141.894531 158.484375 L 169.949219 109.355469 L 202.382812 52.542969 Z M 13.082031 66.277344 L 40.484375 113.84375 L 60 147.71875 L 92.324219 93.625 L 76.570312 66.277344 Z M 13.082031 66.277344"
        />
      </g>
      <defs>
        <clipPath id="verbalist-mark-clip">
          <path
            d="M 13.082031 0.0585938 L 202.734375 0.0585938 L 202.734375 224.9375 L 13.082031 224.9375 Z M 13.082031 0.0585938"
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
