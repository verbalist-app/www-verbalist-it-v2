import type { StructureBuilder } from "sanity/structure";
import {
  DocumentIcon,
  UsersIcon,
  CogIcon,
  PackageIcon,
  HelpCircleIcon,
  CalendarIcon,
  DocumentsIcon,
  ComposeIcon,
} from "@sanity/icons";

// Singleton document IDs
const SITE_SETTINGS_ID = "siteSettings";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Posts
      S.listItem()
        .title("Blog Posts")
        .icon(DocumentIcon)
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog Posts")),

      // Team Members
      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .schemaType("teamMember")
        .child(S.documentTypeList("teamMember").title("Team Members")),

      // Customers
      S.listItem()
        .title("Customers")
        .icon(ComposeIcon)
        .schemaType("customer")
        .child(S.documentTypeList("customer").title("Customers")),

      // Integrations
      S.listItem()
        .title("Integrations")
        .icon(PackageIcon)
        .schemaType("integration")
        .child(S.documentTypeList("integration").title("Integrations")),

      S.divider(),

      // Help Center
      S.listItem()
        .title("Help Center")
        .icon(HelpCircleIcon)
        .schemaType("helpcenter")
        .child(S.documentTypeList("helpcenter").title("Help Center Articles")),

      // Changelog
      S.listItem()
        .title("Changelog")
        .icon(CalendarIcon)
        .schemaType("changelog")
        .child(S.documentTypeList("changelog").title("Changelog Entries")),

      S.divider(),

      // Info Pages (Privacy, Terms, etc.)
      S.listItem()
        .title("Info Pages")
        .icon(DocumentsIcon)
        .schemaType("infopage")
        .child(S.documentTypeList("infopage").title("Info Pages")),

      S.divider(),

      // Site Settings (singleton)
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_ID)
            .title("Site Settings")
        ),
    ]);
