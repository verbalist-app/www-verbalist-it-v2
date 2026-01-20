import groq from "groq";

// =============================================================================
// POSTS
// =============================================================================

// Shared post fields projection
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  pubDate,
  bgColor,
  tags,
  "team": team->slug.current,
  image {
    asset->,
    alt
  }
`;

// All posts (for listing)
export const allPostsQuery = groq`
  *[_type == "post"] | order(pubDate desc) {
    ${postFields},
    "body": pt::text(body)
  }
`;

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

// Posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && $tag in tags] | order(pubDate desc) {
    ${postFields},
    "body": pt::text(body)
  }
`;

// All unique tags from posts
export const allPostTagsQuery = groq`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`;

// Related posts (by tags, excluding current)
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && count((tags)[@ in $tags]) > 0] | order(pubDate desc) [0...3] {
    ${postFields},
    "body": pt::text(body)
  }
`;

// =============================================================================
// TEAM MEMBERS
// =============================================================================

const teamMemberFields = groq`
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  bgColor,
  image {
    asset->,
    alt
  },
  socials
`;

// All team members
export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(name asc) {
    ${teamMemberFields}
  }
`;

// Single team member by slug
export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    ${teamMemberFields},
    body
  }
`;

// =============================================================================
// CUSTOMERS
// =============================================================================

const customerFields = groq`
  _id,
  customer,
  "slug": slug.current,
  bgColor,
  ctaTitle,
  testimonial,
  partnership,
  about,
  challengesAndSolutions[] {
    title,
    content
  },
  results,
  details[] {
    key,
    value
  },
  avatar {
    asset->,
    alt
  },
  logo {
    asset->,
    alt
  }
`;

// All customers
export const allCustomersQuery = groq`
  *[_type == "customer"] {
    ${customerFields}
  }
`;

// Single customer by slug
export const customerBySlugQuery = groq`
  *[_type == "customer" && slug.current == $slug][0] {
    ${customerFields},
    body
  }
`;

// =============================================================================
// INTEGRATIONS
// =============================================================================

const integrationFields = groq`
  _id,
  integration,
  "slug": slug.current,
  email,
  description,
  permissions,
  details[] {
    title,
    value,
    url
  },
  logo {
    asset->,
    alt
  },
  tags
`;

// All integrations
export const allIntegrationsQuery = groq`
  *[_type == "integration"] | order(integration asc) {
    ${integrationFields}
  }
`;

// Single integration by slug
export const integrationBySlugQuery = groq`
  *[_type == "integration" && slug.current == $slug][0] {
    ${integrationFields},
    body
  }
`;

// All unique tags from integrations
export const allIntegrationTagsQuery = groq`
  array::unique(*[_type == "integration" && defined(tags)].tags[])
`;

// Integrations by tag
export const integrationsByTagQuery = groq`
  *[_type == "integration" && $tag in tags] | order(integration asc) {
    ${integrationFields}
  }
`;

// =============================================================================
// HELP CENTER
// =============================================================================

const helpcenterFields = groq`
  _id,
  page,
  "slug": slug.current,
  iconId,
  description,
  category,
  keywords,
  lastUpdated,
  faq[] {
    question,
    answer
  }
`;

// All help center articles
export const allHelpcenterQuery = groq`
  *[_type == "helpcenter"] {
    ${helpcenterFields}
  }
`;

// Single help center article by slug
export const helpcenterBySlugQuery = groq`
  *[_type == "helpcenter" && slug.current == $slug][0] {
    ${helpcenterFields},
    body
  }
`;

// =============================================================================
// CHANGELOG
// =============================================================================

const changelogFields = groq`
  _id,
  page,
  "slug": slug.current,
  bgColor,
  description,
  pubDate
`;

// All changelog entries
export const allChangelogQuery = groq`
  *[_type == "changelog"] | order(pubDate desc) {
    ${changelogFields}
  }
`;

// Single changelog entry by slug
export const changelogBySlugQuery = groq`
  *[_type == "changelog" && slug.current == $slug][0] {
    ${changelogFields},
    body
  }
`;

// =============================================================================
// INFO PAGES (Privacy, Terms, etc.)
// =============================================================================

const infopageFields = groq`
  _id,
  page,
  "slug": slug.current,
  pubDate
`;

// All info pages
export const allInfopagesQuery = groq`
  *[_type == "infopage"] {
    ${infopageFields}
  }
`;

// Single info page by slug
export const infopageBySlugQuery = groq`
  *[_type == "infopage" && slug.current == $slug][0] {
    ${infopageFields},
    body
  }
`;

// =============================================================================
// LEGACY QUERIES (kept for backward compatibility)
// =============================================================================

// Alias for post tags
export const allTagsQuery = allPostTagsQuery;

// =============================================================================
// SITE SETTINGS
// =============================================================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    siteUrl,
    ogImage {
      asset->,
      alt
    },
    twitterHandle,
    navigation[] {
      label,
      href
    },
    footer {
      text,
      links[] {
        label,
        href
      }
    },
    socials[] {
      platform,
      url
    }
  }
`;
