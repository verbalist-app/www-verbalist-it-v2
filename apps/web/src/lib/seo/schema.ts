/**
 * Schema.org JSON-LD builders for Verbalist.
 *
 * Conventions:
 *  - NUR S.r.l. is the legal Organization (publisher / provider).
 *  - Verbalist is the product (SoftwareApplication) and the WebSite name.
 *  - All URLs are absolute and use the canonical site origin.
 */

export const SITE_URL = "https://www.verbalist.it";
export const SITE_NAME = "Verbalist";
export const SITE_DESCRIPTION =
  "Crea contenuti SEO a partire dai dati di ricerca, ottimizzati per Google e per le AI search.";
export const ORG_NAME = "NUR S.r.l.";
export const ORG_LOGO = `${SITE_URL}/logo.svg`;

/** Organization schema — the legal entity behind Verbalist. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };
}

/** WebSite schema — the marketing site itself, published by NUR S.r.l. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "it-IT",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Build an absolute URL on the canonical site origin. */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

/** BreadcrumbList schema. Items are rendered in order, position starts at 1. */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** BlogPosting schema for a single blog post. */
export function blogPostingSchema(opts: {
  title: string;
  description: string;
  pubDate: string | Date;
  url: string;
  image?: string;
  tags?: string[];
  author?: { name: string; role?: string };
}) {
  const isoDate = new Date(opts.pubDate).toISOString();
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${opts.url}#blogposting`,
    headline: opts.title,
    description: opts.description,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: "it-IT",
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    author: {
      "@type": "Person",
      name: opts.author?.name || SITE_NAME,
      ...(opts.author?.role ? { jobTitle: opts.author.role } : {}),
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  if (opts.tags && opts.tags.length > 0) {
    schema.keywords = opts.tags.join(", ");
  }
  if (opts.image) {
    schema.image = {
      "@type": "ImageObject",
      url: opts.image,
    };
  }
  return schema;
}

/** SoftwareApplication schema — the Verbalist product. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    description:
      "Verbalist trasforma keyword, risultati Google e competitor in contenuti SEO strutturati, completi e pronti anche per la ricerca con AI.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEO Software",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: "it-IT",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: "Free trial disponibile",
    },
    featureList: [
      "Analisi SERP",
      "Scraping competitor",
      "Generazione contenuti SEO",
      "Ottimizzazione contenuti",
      "Brand & Tone of voice",
      "Multi-lingua",
    ],
  };
}
