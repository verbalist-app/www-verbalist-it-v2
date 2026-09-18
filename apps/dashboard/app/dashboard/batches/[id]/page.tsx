import type { Metadata } from "next"
import { BatchDetailContent } from "./_components/batch-detail-content"

export const metadata: Metadata = {
  title: "Lotto",
}

export default async function BatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <BatchDetailContent params={{ id }} />
}
