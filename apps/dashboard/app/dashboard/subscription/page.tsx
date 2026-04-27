import type { Metadata } from "next"
import { SubscriptionContent } from "./_components/subscription-content"

export const metadata: Metadata = {
  title: "Abbonamento",
}

export default function SubscriptionPage() {
  return <SubscriptionContent />
}
