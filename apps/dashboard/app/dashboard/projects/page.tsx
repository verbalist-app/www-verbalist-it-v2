import type { Metadata } from "next"
import { ProjectsContent } from "./_components/projects-content"

export const metadata: Metadata = {
  title: "Progetti",
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
