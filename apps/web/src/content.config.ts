import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const customers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/customers" }),
  schema: z.object({
    customer: z.string(),
    bgColor: z.string().optional(),
    ctaTitle: z.string().optional(),
    testimonial: z.string().optional(),
    partnership: z.string().optional(),
    avatar: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    challengesAndSolutions: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    ),
    results: z.array(z.string()),
    about: z.string(),
    details: z.record(z.string(), z.string()),
    logo: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});

const features = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/features" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    permissions: z.array(z.string()),
    details: z.array(
      z.object({
        title: z.string(),
        value: z.string(),
        url: z.string().optional(),
      })
    ),
    logo: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

const helpcenter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/helpcenter" }),
  schema: z.object({
    iconId: z.string().optional(),
    page: z.string(),
    description: z.string(),
    category: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    lastUpdated: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
  schema: z.object({
    page: z.string(),
    bgColor: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
  }),
});

const infopages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/infopages" }),
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    role: z.string().optional(),
    bgColor: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    socials: z
      .object({
        twitter: z.string().optional(),
        website: z.string().optional(),
        linkedin: z.string().optional(),
        email: z.string().optional(),
      })
      .optional(),
  }),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    team: z.string(),
    bgColor: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  team,
  customers,
  changelog,
  infopages,
  helpcenter,
  posts: postsCollection,
  features,
};
