import { getImageUrl } from "./image";
import { portableTextToHtml } from "./portableText";
import type {
  SanityPost,
  SanityTeamMember,
  SanityCustomer,
  SanityIntegration,
  SanityHelpcenter,
  SanityChangelog,
  SanityInfopage,
  Post,
  TeamMember,
  Customer,
  Integration,
  Helpcenter,
  Changelog,
  Infopage,
} from "./types";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * Transform Sanity post to UI-friendly shape
 * Matches the original Astro content collection structure
 */
export function transformPost(post: SanityPost): Post {
  return {
    slug: post.slug,
    data: {
      title: post.title,
      description: post.description,
      pubDate: new Date(post.pubDate),
      bgColor: post.bgColor,
      tags: post.tags || [],
      team: post.team || "",
      image: {
        url: getImageUrl(post.image?.asset),
        alt: post.image?.alt || post.title || "",
      },
    },
    // Body is plain text (from pt::text) for reading time calculation
    body: typeof post.body === "string" ? post.body : "",
    render: async () => ({
      Content: () => portableTextToHtml(post.body as PortableTextBlock[]),
    }),
  };
}

/**
 * Transform Sanity team member to UI-friendly shape
 */
export function transformTeamMember(member: SanityTeamMember): TeamMember {
  return {
    slug: member.slug,
    data: {
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      bgColor: member.bgColor,
      image: {
        url: getImageUrl(member.image?.asset),
        alt: member.image?.alt || member.name || "",
      },
      socials: member.socials,
    },
    body: member.body,
    render: member.body
      ? async () => ({
          Content: () => portableTextToHtml(member.body as PortableTextBlock[]),
        })
      : undefined,
  };
}

/**
 * Transform Sanity customer to UI-friendly shape
 */
export function transformCustomer(customer: SanityCustomer): Customer {
  // Convert details array to record
  const detailsRecord: Record<string, string> = {};
  if (customer.details) {
    for (const detail of customer.details) {
      detailsRecord[detail.key] = detail.value;
    }
  }

  return {
    slug: customer.slug,
    data: {
      customer: customer.customer,
      bgColor: customer.bgColor,
      ctaTitle: customer.ctaTitle,
      testimonial: customer.testimonial,
      partnership: customer.partnership,
      about: customer.about,
      challengesAndSolutions: customer.challengesAndSolutions || [],
      results: customer.results || [],
      details: detailsRecord,
      avatar: {
        url: getImageUrl(customer.avatar?.asset),
        alt: customer.avatar?.alt || "",
      },
      logo: {
        url: getImageUrl(customer.logo?.asset),
        alt: customer.logo?.alt || "",
      },
    },
    body: customer.body,
    render: customer.body
      ? async () => ({
          Content: () =>
            portableTextToHtml(customer.body as PortableTextBlock[]),
        })
      : undefined,
  };
}

/**
 * Transform Sanity integration to UI-friendly shape
 */
export function transformIntegration(
  integration: SanityIntegration
): Integration {
  return {
    slug: integration.slug,
    data: {
      integration: integration.integration,
      email: integration.email,
      description: integration.description,
      permissions: integration.permissions || [],
      details: integration.details || [],
      logo: {
        url: getImageUrl(integration.logo?.asset),
        alt: integration.logo?.alt || integration.integration || "",
      },
      tags: integration.tags || [],
    },
    body: integration.body,
    render: integration.body
      ? async () => ({
          Content: () =>
            portableTextToHtml(integration.body as PortableTextBlock[]),
        })
      : undefined,
  };
}

/**
 * Transform Sanity help center article to UI-friendly shape
 */
export function transformHelpcenter(article: SanityHelpcenter): Helpcenter {
  return {
    slug: article.slug,
    data: {
      page: article.page,
      iconId: article.iconId,
      description: article.description,
      category: article.category,
      keywords: article.keywords,
      lastUpdated: article.lastUpdated,
      faq: article.faq,
    },
    body: article.body,
    render: article.body
      ? async () => ({
          Content: () =>
            portableTextToHtml(article.body as PortableTextBlock[]),
        })
      : undefined,
  };
}

/**
 * Transform Sanity changelog entry to UI-friendly shape
 */
export function transformChangelog(entry: SanityChangelog): Changelog {
  return {
    slug: entry.slug,
    data: {
      page: entry.page,
      bgColor: entry.bgColor,
      description: entry.description,
      pubDate: new Date(entry.pubDate),
    },
    body: entry.body,
    render: entry.body
      ? async () => ({
          Content: () => portableTextToHtml(entry.body as PortableTextBlock[]),
        })
      : undefined,
  };
}

/**
 * Transform Sanity info page to UI-friendly shape
 */
export function transformInfopage(page: SanityInfopage): Infopage {
  return {
    slug: page.slug,
    data: {
      page: page.page,
      pubDate: new Date(page.pubDate),
    },
    body: page.body,
    render: page.body
      ? async () => ({
          Content: () => portableTextToHtml(page.body as PortableTextBlock[]),
        })
      : undefined,
  };
}
