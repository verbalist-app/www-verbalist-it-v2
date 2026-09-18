import type { Metadata } from "next"
import { ProjectDetailContent } from "./_components/project-detail-content"

export const metadata: Metadata = {
  title: "Progetto",
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectDetailContent params={{ id }} />
}
