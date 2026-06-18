import type { Metadata } from "next"
import { Suspense } from "react"
import { HelpContent } from "./_components/help-content"

export const metadata: Metadata = {
  title: "Aiuto",
}

export default function HelpPage() {
  // HelpContent reads the active tab from the URL (?tab=), so it needs a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <HelpContent />
    </Suspense>
  )
}
