import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageMetadata } from "astro";

// =============================================================================
// SHARED IMAGE TYPES
// =============================================================================

export interface SanityImage {
  asset: SanityImageSource;
  alt?: string;
}

/**
 * Unified image type that works with both Astro and Sanity
 * - Astro Content Collections: ImageMetadata (for local images)
 * - Sanity: string URL
 */
export type UnifiedImage = {
  url: ImageMetadata | string;
  alt: string;
};

// =============================================================================
// POST TYPES
// =============================================================================

/**
 * Post data as returned from Sanity queries
 */
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  bgColor?: string;
  tags: string[];
  team: string; // Slug of the team member
  image: SanityImage;
  body: PortableTextBlock[] | string; // string when using pt::text() for plain text
}

/**
 * Post shape expected by UI components (mirrors Astro Content Collection shape)
 */
export interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    bgColor?: string;
    tags: string[];
    team: string;
    image: UnifiedImage;
  };
  body?: string; // Plain text for reading time calculation
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// TEAM MEMBER TYPES
// =============================================================================

export interface SanityTeamMember {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  bgColor?: string;
  image: SanityImage;
  socials?: {
    twitter?: string;
    website?: string;
    linkedin?: string;
    email?: string;
  };
  body?: PortableTextBlock[];
}

/**
 * Team member shape expected by UI components
 */
export interface TeamMember {
  slug: string;
  data: {
    name: string;
    role?: string;
    bio?: string;
    bgColor?: string;
    image: UnifiedImage;
    socials?: {
      twitter?: string;
      website?: string;
      linkedin?: string;
      email?: string;
    };
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// CUSTOMER TYPES
// =============================================================================

export interface SanityCustomer {
  _id: string;
  customer: string;
  slug: string;
  bgColor?: string;
  ctaTitle?: string;
  testimonial?: string;
  partnership?: string;
  about: string;
  challengesAndSolutions: Array<{
    title: string;
    content: string;
  }>;
  results: string[];
  details: Array<{
    key: string;
    value: string;
  }>;
  avatar: SanityImage;
  logo: SanityImage;
  body?: PortableTextBlock[];
}

/**
 * Customer shape expected by UI components
 */
export interface Customer {
  slug: string;
  data: {
    customer: string;
    bgColor?: string;
    ctaTitle?: string;
    testimonial?: string;
    partnership?: string;
    about: string;
    challengesAndSolutions: Array<{
      title: string;
      content: string;
    }>;
    results: string[];
    details: Record<string, string>;
    avatar: UnifiedImage;
    logo: UnifiedImage;
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// INTEGRATION TYPES
// =============================================================================

export interface SanityIntegration {
  _id: string;
  integration: string;
  slug: string;
  email: string;
  description: string;
  permissions: string[];
  details: Array<{
    title: string;
    value: string;
    url?: string;
  }>;
  logo: SanityImage;
  tags: string[];
  body?: PortableTextBlock[];
}

/**
 * Integration shape expected by UI components
 */
export interface Integration {
  slug: string;
  data: {
    integration: string;
    email: string;
    description: string;
    permissions: string[];
    details: Array<{
      title: string;
      value: string;
      url?: string;
    }>;
    logo: UnifiedImage;
    tags: string[];
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// HELP CENTER TYPES
// =============================================================================

export interface SanityHelpcenter {
  _id: string;
  page: string;
  slug: string;
  iconId?: string;
  description: string;
  category?: string;
  keywords?: string[];
  lastUpdated?: string;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  body?: PortableTextBlock[];
}

/**
 * Help center shape expected by UI components
 */
export interface Helpcenter {
  slug: string;
  data: {
    page: string;
    iconId?: string;
    description: string;
    category?: string;
    keywords?: string[];
    lastUpdated?: string;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// CHANGELOG TYPES
// =============================================================================

export interface SanityChangelog {
  _id: string;
  page: string;
  slug: string;
  bgColor?: string;
  description: string;
  pubDate: string;
  body?: PortableTextBlock[];
}

/**
 * Changelog shape expected by UI components
 */
export interface Changelog {
  slug: string;
  data: {
    page: string;
    bgColor?: string;
    description: string;
    pubDate: Date;
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// INFO PAGE TYPES
// =============================================================================

export interface SanityInfopage {
  _id: string;
  page: string;
  slug: string;
  pubDate: string;
  body?: PortableTextBlock[];
}

/**
 * Info page shape expected by UI components
 */
export interface Infopage {
  slug: string;
  data: {
    page: string;
    pubDate: Date;
  };
  body?: PortableTextBlock[];
  render?: () => Promise<{ Content: any }>;
}

// =============================================================================
// SITE SETTINGS TYPES
// =============================================================================

export interface SiteSettings {
  title?: string;
  description?: string;
  siteUrl?: string;
  ogImage?: SanityImage;
  twitterHandle?: string;
  navigation?: Array<{
    label: string;
    href: string;
  }>;
  footer?: {
    text?: string;
    links?: Array<{
      label: string;
      href: string;
    }>;
  };
  socials?: Array<{
    platform: string;
    url: string;
  }>;
}
