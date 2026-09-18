import type { Metadata } from "next"
import { DocumentDetailContent } from "./_components/document-detail-content"

export const metadata: Metadata = {
  title: "Documento",
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <DocumentDetailContent params={{ id }} />
}
