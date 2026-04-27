"use client"

import Link from "next/link"
import {
  IconCheck as Check,
  IconBolt as Zap,
  IconClock as Clock,
  IconCreditCard as CreditCard,
  IconArrowRight as ArrowRight,
  IconExternalLink as ExternalLink
} from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDashboardLocale } from "../../_lib/dashboard-locale"

// Mock subscription data (non-translatable fields)
const subscription = {
  plan: "Professional",
  status: "active",
  creditsUsed: 156,
  creditsTotal: 500,
  daysRemaining: 23,
  price: "149",
}

export function SubscriptionContent() {
  const { locale, t } = useDashboardLocale()
  const creditsPercentage = (subscription.creditsUsed / subscription.creditsTotal) * 100

  const text = t({
    it: {
      title: "Abbonamento",
      subtitle: "Gestisci il tuo piano e la fatturazione",
      currentPlan: "Piano attuale",
      yourSubscription: "Il tuo abbonamento Verbalist",
      active: "Attivo",
      perMonth: "/mese",
      creditsUsed: "Crediti utilizzati",
      daysRemaining: "giorni rimanenti",
      period: "Periodo:",
      manageSubscription: "Gestisci abbonamento",
      paymentMethod: "Metodo di pagamento",
      expires: "Scade",
      updateCard: "Aggiorna carta",
      planIncludes: "Cosa include il tuo piano",
      allPlans: "Tutti i piani",
      contactUs: "Contattaci",
      switchTo: "Passa a ",
      billingHistory: "Storico fatturazione",
      recentInvoices: "Le tue fatture recenti",
      viewAll: "Vedi tutte",
      professionalPlan: "Piano Professional",
      paid: "Pagato",
      startDate: "1 Gennaio 2025",
      endDate: "31 Gennaio 2025",
      starterDesc: "Per freelancer e piccoli progetti",
      professionalDesc: "Per team SEO e agenzie in crescita",
      enterpriseDesc: "Per grandi organizzazioni",
      features: {
        contents10: "10 contenuti al mese",
        serpBase: "Analisi SERP base",
        project1: "1 progetto",
        emailSupport: "Supporto email",
        contents50: "50 contenuti al mese",
        serpAdvanced: "Analisi SERP avanzata",
        projects5: "5 progetti",
        competitorScraping: "Scraping competitor",
        patternAnalysis: "Analisi pattern",
        prioritySupport: "Supporto prioritario",
        unlimitedContents: "Contenuti illimitati",
        allFeatures: "Tutte le funzionalità",
        unlimitedProjects: "Progetti illimitati",
        apiAccess: "API access",
        dedicatedManager: "Account manager dedicato",
        guaranteedSla: "SLA garantito",
      },
      invoices: [
        { date: "1 Gen 2025", amount: "€149.00" },
        { date: "1 Dic 2024", amount: "€149.00" },
        { date: "1 Nov 2024", amount: "€149.00" },
      ],
    },
    en: {
      title: "Subscription",
      subtitle: "Manage your plan and billing",
      currentPlan: "Current plan",
      yourSubscription: "Your Verbalist subscription",
      active: "Active",
      perMonth: "/month",
      creditsUsed: "Credits used",
      daysRemaining: "days remaining",
      period: "Period:",
      manageSubscription: "Manage subscription",
      paymentMethod: "Payment method",
      expires: "Expires",
      updateCard: "Update card",
      planIncludes: "What your plan includes",
      allPlans: "All plans",
      contactUs: "Contact Us",
      switchTo: "Switch to ",
      billingHistory: "Billing history",
      recentInvoices: "Your recent invoices",
      viewAll: "View all",
      professionalPlan: "Professional Plan",
      paid: "Paid",
      startDate: "January 1, 2025",
      endDate: "January 31, 2025",
      starterDesc: "For freelancers and small projects",
      professionalDesc: "For growing SEO teams and agencies",
      enterpriseDesc: "For large organizations",
      features: {
        contents10: "10 contents per month",
        serpBase: "Basic SERP Analysis",
        project1: "1 project",
        emailSupport: "Email Support",
        contents50: "50 contents per month",
        serpAdvanced: "Advanced SERP Analysis",
        projects5: "5 projects",
        competitorScraping: "Competitor Scraping",
        patternAnalysis: "Pattern Analysis",
        prioritySupport: "Priority Support",
        unlimitedContents: "Unlimited Contents",
        allFeatures: "All Features",
        unlimitedProjects: "Unlimited Projects",
        apiAccess: "API access",
        dedicatedManager: "Dedicated Account Manager",
        guaranteedSla: "Guaranteed SLA",
      },
      invoices: [
        { date: "Jan 1, 2025", amount: "€149.00" },
        { date: "Dec 1, 2024", amount: "€149.00" },
        { date: "Nov 1, 2024", amount: "€149.00" },
      ],
    },
  })

  const subscriptionFeatures = [
    text.features.contents50,
    text.features.serpAdvanced,
    text.features.projects5,
    text.features.competitorScraping,
    text.features.patternAnalysis,
    text.features.prioritySupport,
  ]

  const plans = [
    {
      name: "Starter",
      price: "49",
      description: text.starterDesc,
      features: [
        text.features.contents10,
        text.features.serpBase,
        text.features.project1,
        text.features.emailSupport,
      ],
      current: false,
    },
    {
      name: "Professional",
      price: "149",
      description: text.professionalDesc,
      features: [
        text.features.contents50,
        text.features.serpAdvanced,
        text.features.projects5,
        text.features.competitorScraping,
        text.features.patternAnalysis,
        text.features.prioritySupport,
      ],
      current: true,
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: text.enterpriseDesc,
      features: [
        text.features.unlimitedContents,
        text.features.allFeatures,
        text.features.unlimitedProjects,
        text.features.apiAccess,
        text.features.dedicatedManager,
        text.features.guaranteedSla,
      ],
      current: false,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-display tracking-tight lg:text-2xl">{text.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {text.subtitle}
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">{text.currentPlan}</CardTitle>
                <CardDescription>
                  {text.yourSubscription}
                </CardDescription>
              </div>
              <span className="inline-flex items-center rounded-full bg-status-success/10 px-2.5 py-0.5 text-xs font-medium text-status-success">
                {text.active}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium">{subscription.plan}</h3>
                <p className="text-sm text-muted-foreground">
                  €{subscription.price}{text.perMonth}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{text.creditsUsed}</span>
                  <span className="font-medium tabular-nums">
                    {subscription.creditsUsed}/{subscription.creditsTotal}
                  </span>
                </div>
                <Progress value={creditsPercentage} className="h-2" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium tabular-nums">{subscription.daysRemaining}</span>
                  <span className="text-muted-foreground"> {text.daysRemaining}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                {text.period} {text.startDate} - {text.endDate}
              </div>
              <Button variant="outline" size="sm">
                {text.manageSubscription}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{text.paymentMethod}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">{text.expires} 12/2026</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              {text.updateCard}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{text.planIncludes}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptionFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="size-4 text-status-success" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Plans */}
      <div>
        <h2 className="text-lg font-display mb-4">{text.allPlans}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "border-border bg-muted/50 shadow-none"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  {plan.current && (
                    <span className="text-xs text-muted-foreground">
                      {text.currentPlan}
                    </span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-3xl font-medium">
                    {plan.price === "Custom" ? "" : "€"}
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">{text.perMonth}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-status-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current
                    ? text.currentPlan
                    : plan.price === "Custom"
                    ? text.contactUs
                    : text.switchTo + plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">{text.billingHistory}</CardTitle>
            <CardDescription>{text.recentInvoices}</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            {text.viewAll}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {text.invoices.map((invoice) => (
              <div
                key={invoice.date}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {text.professionalPlan}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{invoice.amount}</span>
                  <span className="text-xs text-status-success">{text.paid}</span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
