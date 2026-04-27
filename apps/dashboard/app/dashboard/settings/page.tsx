import type { Metadata } from "next"
import { SettingsContent } from "./_components/settings-content"

export const metadata: Metadata = {
  title: "Impostazioni",
}

export default function SettingsPage() {
  return <SettingsContent />
}
