/**
 * Central Data Utility
 *
 * Thin wrapper around Astro Content Collections that exposes a simple
 * `{ slug, data, render }` shape to pages and components, regardless of
 * the underlying collection.
 *
 * Components and pages should import from this module, not from
 * `astro:content` directly, so that we keep a single point to evolve
 * data fetching (caching, sorting, filtering) without touching consumers.
 */

import { getCollection, getEntry, render } from "astro:content";

// =============================================================================
// POSTS
// =============================================================================

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    slug: post.id,
    data: post.data,
    body: post.body,
    render: async () => render(post),
  }));
}

export async function getPostBySlug(slug: string) {
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
  const allPosts = await getCollection("posts");
  const filteredPosts = allPosts.filter((post) =>
    post.data.tags.includes(tag)
  );
  return filteredPosts.map((post) => ({
    slug: post.id,
    data: post.data,
    body: post.body,
    render: async () => render(post),
  }));
}

export async function getAllPostTags(): Promise<string[]> {
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
  const members = await getCollection("team");
  return members.map((member) => ({
    slug: member.id,
    data: member.data,
    render: async () => render(member),
  }));
}

export async function getTeamMemberBySlug(slug: string) {
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
  const customers = await getCollection("customers");
  return customers.map((customer) => ({
    slug: customer.id,
    data: customer.data,
    render: async () => render(customer),
  }));
}

export async function getCustomerBySlug(slug: string) {
  const customer = await getEntry("customers", slug);
  if (!customer) return null;
  return {
    slug: customer.id,
    data: customer.data,
    render: async () => render(customer),
  };
}

// =============================================================================
// FEATURES
// =============================================================================

export async function getAllFeatures() {
  const features = await getCollection("features");
  return features.map((feature) => ({
    slug: feature.id,
    data: feature.data,
    render: async () => render(feature),
  }));
}

export async function getFeatureBySlug(slug: string) {
  const feature = await getEntry("features", slug);
  if (!feature) return null;
  return {
    slug: feature.id,
    data: feature.data,
    render: async () => render(feature),
  };
}

export async function getAllFeatureTags(): Promise<string[]> {
  const features = await getCollection("features");
  const tags = new Set<string>();
  for (const feature of features) {
    for (const tag of feature.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

// =============================================================================
// HELP CENTER
// =============================================================================

export async function getAllHelpcenter() {
  const articles = await getCollection("helpcenter");
  return articles.map((article) => ({
    slug: article.id,
    data: article.data,
    render: async () => render(article),
  }));
}

export async function getHelpcenterBySlug(slug: string) {
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
  const entries = await getCollection("changelog");
  return entries.map((entry) => ({
    slug: entry.id,
    data: entry.data,
    render: async () => render(entry),
  }));
}

export async function getChangelogBySlug(slug: string) {
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
  const pages = await getCollection("infopages");
  return pages.map((page) => ({
    slug: page.id,
    data: page.data,
    render: async () => render(page),
  }));
}

export async function getInfopageBySlug(slug: string) {
  const page = await getEntry("infopages", slug);
  if (!page) return null;
  return {
    slug: page.id,
    data: page.data,
    render: async () => render(page),
  };
}
