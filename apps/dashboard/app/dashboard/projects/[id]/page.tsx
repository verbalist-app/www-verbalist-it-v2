import type { Metadata } from "next"
import { ProjectDetailContent } from "./_components/project-detail-content"

export const metadata: Metadata = {
  title: "Progetto",
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <ProjectDetailContent params={params} />
}
