import type { Metadata } from "next"
import { NewDocumentContent } from "./_components/new-document-content"

export const metadata: Metadata = {
  title: "Nuovo Documento",
}

export default function NewDocumentPage() {
  return <NewDocumentContent />
}
