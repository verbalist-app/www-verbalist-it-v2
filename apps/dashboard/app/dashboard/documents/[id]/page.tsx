import type { Metadata } from "next"
import { DocumentDetailContent } from "./_components/document-detail-content"

export const metadata: Metadata = {
  title: "Documento",
}

export default function DocumentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <DocumentDetailContent params={params} />
}
