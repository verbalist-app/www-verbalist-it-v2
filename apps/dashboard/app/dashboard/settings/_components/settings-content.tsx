"use client"

import * as React from "react"
import {
  IconUser as User,
  IconMail as Mail,
  IconLock as Lock,
  IconBell as Bell,
  IconWorld as Globe
} from '@tabler/icons-react';
import { useDashboardLocale } from "../../_lib/dashboard-locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock user data
const user = {
  firstName: "Marco",
  lastName: "Rossi",
  email: "marco@agenzia.it",
  language: "it",
  notifications: {
    email: true,
    documentComplete: true,
    weeklyReport: false,
  },
}

export function SettingsContent() {
  const { locale, setLocale, t } = useDashboardLocale()
  const [firstName, setFirstName] = React.useState(user.firstName)
  const [lastName, setLastName] = React.useState(user.lastName)
  const [email, setEmail] = React.useState(user.email)
  const [notifications, setNotifications] = React.useState(user.notifications)

  const text = t({
    it: {
      title: "Impostazioni",
      subtitle: "Gestisci il tuo account e le preferenze",
      profile: "Profilo",
      profileDesc: "Le tue informazioni personali",
      changeAvatar: "Cambia avatar",
      avatarHint: "JPG, PNG. Max 2MB.",
      firstName: "Nome",
      lastName: "Cognome",
      saveChanges: "Salva modifiche",
      email: "Email",
      emailDesc: "L'email associata al tuo account",
      emailAddress: "Indirizzo email",
      updateEmail: "Aggiorna email",
      password: "Password",
      passwordDesc: "Aggiorna la password del tuo account",
      currentPassword: "Password attuale",
      newPassword: "Nuova password",
      confirmPassword: "Conferma password",
      changePassword: "Cambia password",
      language: "Lingua",
      languageDesc: "Seleziona la lingua dell'interfaccia",
      notifications: "Notifiche",
      notificationsDesc: "Configura le notifiche email",
      emailNotifications: "Notifiche email",
      emailNotificationsDesc: "Ricevi aggiornamenti via email",
      documentCompleted: "Documento completato",
      documentCompletedDesc: "Notifica quando un documento è pronto",
      weeklyReport: "Report settimanale",
      weeklyReportDesc: "Riepilogo settimanale dell'attività",
      dangerZone: "Zona pericolosa",
      dangerZoneDesc: "Azioni irreversibili sul tuo account",
      deleteAccount: "Elimina account",
      deleteAccountTitle: "Eliminare il tuo account?",
      deleteAccountDesc: "Tutti i tuoi dati, documenti e progetti verranno eliminati permanentemente. Questa azione non può essere annullata.",
      cancel: "Annulla",
    },
    en: {
      title: "Settings",
      subtitle: "Manage your account and preferences",
      profile: "Profile",
      profileDesc: "Your personal information",
      changeAvatar: "Change avatar",
      avatarHint: "JPG, PNG. Max 2MB.",
      firstName: "First name",
      lastName: "Last name",
      saveChanges: "Save changes",
      email: "Email",
      emailDesc: "The email associated with your account",
      emailAddress: "Email address",
      updateEmail: "Update email",
      password: "Password",
      passwordDesc: "Update your account password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      changePassword: "Change password",
      language: "Language",
      languageDesc: "Select interface language",
      notifications: "Notifications",
      notificationsDesc: "Configure email notifications",
      emailNotifications: "Email notifications",
      emailNotificationsDesc: "Receive email updates",
      documentCompleted: "Document completed",
      documentCompletedDesc: "Notify when a document is ready",
      weeklyReport: "Weekly report",
      weeklyReportDesc: "Weekly activity summary",
      dangerZone: "Danger zone",
      dangerZoneDesc: "Irreversible actions on your account",
      deleteAccount: "Delete account",
      deleteAccountTitle: "Delete your account?",
      deleteAccountDesc: "All your data, documents, and projects will be permanently deleted. This action cannot be undone.",
      cancel: "Cancel",
    },
  })

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-display tracking-tight lg:text-2xl">{text.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {text.subtitle}
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="size-5" />
            <CardTitle className="text-base">{text.profile}</CardTitle>
          </div>
          <CardDescription>
            {text.profileDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <User className="size-8 text-muted-foreground" />
            </div>
            <div>
              <Button variant="outline" size="sm">
                {text.changeAvatar}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                {text.avatarHint}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">{text.firstName}</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{text.lastName}</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>{text.saveChanges}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="size-5" />
            <CardTitle className="text-base">{text.email}</CardTitle>
          </div>
          <CardDescription>
            {text.emailDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{text.emailAddress}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button>{text.updateEmail}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="size-5" />
            <CardTitle className="text-base">{text.password}</CardTitle>
          </div>
          <CardDescription>
            {text.passwordDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{text.currentPassword}</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">{text.newPassword}</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{text.confirmPassword}</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>{text.changePassword}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-5" />
            <CardTitle className="text-base">{text.language}</CardTitle>
          </div>
          <CardDescription>
            {text.languageDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-xs">
            <Label>{text.language}</Label>
            <Select value={locale} onValueChange={(value) => setLocale(value as "it" | "en")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5" />
            <CardTitle className="text-base">{text.notifications}</CardTitle>
          </div>
          <CardDescription>
            {text.notificationsDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{text.emailNotifications}</p>
              <p className="text-sm text-muted-foreground">
                {text.emailNotificationsDesc}
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{text.documentCompleted}</p>
              <p className="text-sm text-muted-foreground">
                {text.documentCompletedDesc}
              </p>
            </div>
            <Switch
              checked={notifications.documentComplete}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, documentComplete: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{text.weeklyReport}</p>
              <p className="text-sm text-muted-foreground">
                {text.weeklyReportDesc}
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReport: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-base text-destructive">{text.dangerZone}</CardTitle>
          <CardDescription>
            {text.dangerZoneDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">{text.deleteAccount}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{text.deleteAccountTitle}</AlertDialogTitle>
                <AlertDialogDescription>
                  {text.deleteAccountDesc}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{text.cancel}</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {text.deleteAccount}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
