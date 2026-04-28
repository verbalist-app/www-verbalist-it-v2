import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import matter from "gray-matter";

// Compute unapproved customer slugs at config-load time so we can exclude
// them from the sitemap. Customers default to `approved: false` and stay
// out of the sitemap (and emit `noindex` via CustomersLayout) until the
// referent has explicitly approved the case study.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const customersDir = path.join(__dirname, "src/content/customers");
const unapprovedCustomers = new Set(
  readdirSync(customersDir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => {
      const { data } = matter(readFileSync(path.join(customersDir, f), "utf-8"));
      return data.approved !== true;
    })
    .map((f) => f.replace(/\.md$/, ""))
);

export default defineConfig({
  experimental: {
    svgo: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: "https://www.verbalist.it",
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude theme debug pages
        if (page.includes("/system/")) return false;
        // Exclude mock auth forms (real auth lives on app.verbalist.it)
        if (page.includes("/forms/sign-")) return false;
        // Exclude unapproved customer case studies (soft launch)
        const customerMatch = page.match(/\/customers\/([^/]+)\/?$/);
        if (
          customerMatch &&
          customerMatch[1] !== "home" &&
          unapprovedCustomers.has(customerMatch[1])
        ) {
          return false;
        }
        return true;
      },
    }),
  ],
});
