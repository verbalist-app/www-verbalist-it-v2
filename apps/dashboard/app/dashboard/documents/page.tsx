import type { Metadata } from "next"
import { DocumentsContent } from "./_components/documents-content"

export const metadata: Metadata = {
  title: "Documenti",
}

export default function DocumentsPage() {
  return <DocumentsContent />
}
