/**
 * Central Data Utility
 *
 * This module provides a unified interface for fetching content from either:
 * - Astro Content Collections (default)
 * - Sanity CMS (when USE_SANITY is true)
 *
 * Components and pages should ONLY import from this module.
 * The data shape is identical regardless of the source.
 */

import { getCollection, getEntry, render } from "astro:content";

// Import types statically (these don't affect runtime)
import type {
  SanityPost,
  SanityTeamMember,
  SanityCustomer,
  SanityIntegration,
  SanityHelpcenter,
  SanityChangelog,
  SanityInfopage,
} from "./sanity/types";

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Toggle data source between Content Collections and Sanity.
 *
 * Set to `true` to use Sanity CMS as the data source.
 * Set to `false` (default) to use Astro Content Collections.
 *
 * When USE_SANITY is false, the project works without any Sanity configuration.
 */
export const USE_SANITY = import.meta.env.USE_SANITY === "true";

// =============================================================================
// LAZY SANITY IMPORTS
// =============================================================================

// Only import Sanity modules when USE_SANITY is true
// This prevents Sanity client initialization when not needed
async function getSanityModule() {
  if (!USE_SANITY) {
    throw new Error(
      "Sanity module should not be loaded when USE_SANITY is false"
    );
  }
  return import("./sanity");
}

// =============================================================================
// POSTS
// =============================================================================

export async function getAllPosts() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const posts = await sanity.sanityFetch<SanityPost[]>(sanity.allPostsQuery);
    return posts.map(sanity.transformPost);
  }

  const posts = await getCollection("posts");
  return posts.map((post) => ({
    slug: post.id,
    data: post.data,
    body: post.body,
    render: async () => render(post),
  }));
}

export async function getPostBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const post = await sanity.sanityFetch<SanityPost>(sanity.postBySlugQuery, {
      slug,
    });
    if (!post) return null;
    return sanity.transformPost(post);
  }

  const post = await getEntry("posts", slug);
  if (!post) return null;
  return {
    slug: post.id,
    data: post.data,
    body: post.body,
    render: async () => render(post),
  };
}

export async function getPostsByTag(tag: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const posts = await sanity.sanityFetch<SanityPost[]>(
      sanity.postsByTagQuery,
      { tag }
    );
    return posts.map(sanity.transformPost);
  }

  const allPosts = await getCollection("posts");
  const filteredPosts = allPosts.filter((post) => post.data.tags.includes(tag));
  return filteredPosts.map((post) => ({
    slug: post.id,
    data: post.data,
    body: post.body,
    render: async () => render(post),
  }));
}

export async function getAllPostTags(): Promise<string[]> {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    return sanity.sanityFetch<string[]>(sanity.allPostTagsQuery);
  }

  const posts = await getCollection("posts");
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

// =============================================================================
// TEAM MEMBERS
// =============================================================================

export async function getAllTeamMembers() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const members = await sanity.sanityFetch<SanityTeamMember[]>(
      sanity.allTeamMembersQuery
    );
    return members.map(sanity.transformTeamMember);
  }

  const members = await getCollection("team");
  return members.map((member) => ({
    slug: member.id,
    data: member.data,
    render: async () => render(member),
  }));
}

export async function getTeamMemberBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const member = await sanity.sanityFetch<SanityTeamMember>(
      sanity.teamMemberBySlugQuery,
      { slug }
    );
    if (!member) return null;
    return sanity.transformTeamMember(member);
  }

  const member = await getEntry("team", slug);
  if (!member) return null;
  return {
    slug: member.id,
    data: member.data,
    render: async () => render(member),
  };
}

// =============================================================================
// CUSTOMERS
// =============================================================================

export async function getAllCustomers() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const customers = await sanity.sanityFetch<SanityCustomer[]>(
      sanity.allCustomersQuery
    );
    return customers.map(sanity.transformCustomer);
  }

  const customers = await getCollection("customers");
  return customers.map((customer) => ({
    slug: customer.id,
    data: customer.data,
    render: async () => render(customer),
  }));
}

export async function getCustomerBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const customer = await sanity.sanityFetch<SanityCustomer>(
      sanity.customerBySlugQuery,
      { slug }
    );
    if (!customer) return null;
    return sanity.transformCustomer(customer);
  }

  const customer = await getEntry("customers", slug);
  if (!customer) return null;
  return {
    slug: customer.id,
    data: customer.data,
    render: async () => render(customer),
  };
}

// =============================================================================
// INTEGRATIONS
// =============================================================================

export async function getAllIntegrations() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const integrations = await sanity.sanityFetch<SanityIntegration[]>(
      sanity.allIntegrationsQuery
    );
    return integrations.map(sanity.transformIntegration);
  }

  const integrations = await getCollection("integrations");
  return integrations.map((integration) => ({
    slug: integration.id,
    data: integration.data,
    render: async () => render(integration),
  }));
}

export async function getIntegrationBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const integration = await sanity.sanityFetch<SanityIntegration>(
      sanity.integrationBySlugQuery,
      { slug }
    );
    if (!integration) return null;
    return sanity.transformIntegration(integration);
  }

  const integration = await getEntry("integrations", slug);
  if (!integration) return null;
  return {
    slug: integration.id,
    data: integration.data,
    render: async () => render(integration),
  };
}

export async function getAllIntegrationTags(): Promise<string[]> {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    return sanity.sanityFetch<string[]>(sanity.allIntegrationTagsQuery);
  }

  const integrations = await getCollection("integrations");
  const tags = new Set<string>();
  for (const integration of integrations) {
    for (const tag of integration.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

// =============================================================================
// HELP CENTER
// =============================================================================

export async function getAllHelpcenter() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const articles = await sanity.sanityFetch<SanityHelpcenter[]>(
      sanity.allHelpcenterQuery
    );
    return articles.map(sanity.transformHelpcenter);
  }

  const articles = await getCollection("helpcenter");
  return articles.map((article) => ({
    slug: article.id,
    data: article.data,
    render: async () => render(article),
  }));
}

export async function getHelpcenterBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const article = await sanity.sanityFetch<SanityHelpcenter>(
      sanity.helpcenterBySlugQuery,
      { slug }
    );
    if (!article) return null;
    return sanity.transformHelpcenter(article);
  }

  const article = await getEntry("helpcenter", slug);
  if (!article) return null;
  return {
    slug: article.id,
    data: article.data,
    render: async () => render(article),
  };
}

// =============================================================================
// CHANGELOG
// =============================================================================

export async function getAllChangelog() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const entries = await sanity.sanityFetch<SanityChangelog[]>(
      sanity.allChangelogQuery
    );
    return entries.map(sanity.transformChangelog);
  }

  const entries = await getCollection("changelog");
  return entries.map((entry) => ({
    slug: entry.id,
    data: entry.data,
    render: async () => render(entry),
  }));
}

export async function getChangelogBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const entry = await sanity.sanityFetch<SanityChangelog>(
      sanity.changelogBySlugQuery,
      { slug }
    );
    if (!entry) return null;
    return sanity.transformChangelog(entry);
  }

  const entry = await getEntry("changelog", slug);
  if (!entry) return null;
  return {
    slug: entry.id,
    data: entry.data,
    render: async () => render(entry),
  };
}

// =============================================================================
// INFO PAGES
// =============================================================================

export async function getAllInfopages() {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const pages = await sanity.sanityFetch<SanityInfopage[]>(
      sanity.allInfopagesQuery
    );
    return pages.map(sanity.transformInfopage);
  }

  const pages = await getCollection("infopages");
  return pages.map((page) => ({
    slug: page.id,
    data: page.data,
    render: async () => render(page),
  }));
}

export async function getInfopageBySlug(slug: string) {
  if (USE_SANITY) {
    const sanity = await getSanityModule();
    const page = await sanity.sanityFetch<SanityInfopage>(
      sanity.infopageBySlugQuery,
      { slug }
    );
    if (!page) return null;
    return sanity.transformInfopage(page);
  }

  const page = await getEntry("infopages", slug);
  if (!page) return null;
  return {
    slug: page.id,
    data: page.data,
    render: async () => render(page),
  };
}

// =============================================================================
// TYPE EXPORTS (for components that need them)
// =============================================================================

// Re-export types so components can import from data.ts
export type {
  Post,
  TeamMember,
  Customer,
  Integration,
  Helpcenter,
  Changelog,
  Infopage,
  UnifiedImage,
} from "./sanity/types";
