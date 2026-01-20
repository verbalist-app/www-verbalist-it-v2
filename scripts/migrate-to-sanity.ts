/**
 * Migration Script: Content Collections → Sanity
 *
 * This script reads your existing markdown content and uploads it to Sanity,
 * including images.
 *
 * Usage:
 *   cd scripts
 *   SANITY_TOKEN=your-token npx tsx migrate-to-sanity.ts
 *
 * The script automatically reads SANITY_PROJECT_ID from apps/web/.env
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { config } from "dotenv";

// Load environment variables from apps/web/.env
const webEnvPath = path.join(__dirname, "../apps/web/.env");
if (fs.existsSync(webEnvPath)) {
  config({ path: webEnvPath });
}

// Sanity client configuration
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";

if (!projectId) {
  console.error("\n❌ Error: SANITY_PROJECT_ID is missing.");
  console.log("\nMake sure apps/web/.env exists with:");
  console.log("  SANITY_PROJECT_ID=your-project-id");
  console.log("\nOr pass it directly:");
  console.log(
    "  SANITY_PROJECT_ID=your-project-id SANITY_TOKEN=your-token npx tsx migrate-to-sanity.ts"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  useCdn: false,
});

const WEB_PATH = path.join(__dirname, "../apps/web/src");
const CONTENT_PATH = path.join(WEB_PATH, "content");
const IMAGES_PATH = path.join(WEB_PATH, "images");

// Track uploaded images to avoid duplicates
const uploadedImages: Map<string, string> = new Map();

// Helper to read markdown files from a directory
function readMarkdownFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    console.log(`  Directory not found: ${dir}, skipping...`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content: body } = matter(content);
    const slug = path.basename(file, ".md");
    return { slug, frontmatter: data, body };
  });
}

// Upload an image to Sanity and return the asset reference
async function uploadImage(imagePath: string, altText: string = "") {
  // Handle different image path formats
  let relativePath = imagePath;
  if (imagePath.startsWith("/src/images/")) {
    relativePath = imagePath.replace(/^\/src\/images\//, "");
  } else if (imagePath.startsWith("@/images/")) {
    relativePath = imagePath.replace(/^@\/images\//, "");
  } else if (imagePath.startsWith("../images/")) {
    relativePath = imagePath.replace(/^\.\.\/images\//, "");
  } else if (imagePath.startsWith("../../images/")) {
    relativePath = imagePath.replace(/^\.\.\/\.\.\/images\//, "");
  }

  const fullPath = path.join(IMAGES_PATH, relativePath);

  // Check if already uploaded
  if (uploadedImages.has(fullPath)) {
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: uploadedImages.get(fullPath),
      },
      alt: altText,
    };
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`    ⚠ Image not found: ${fullPath}`);
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload("image", imageBuffer, {
      filename: path.basename(fullPath),
    });

    uploadedImages.set(fullPath, asset._id);

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`    ✗ Failed to upload image: ${fullPath}`, error);
    return null;
  }
}

// Convert markdown to Portable Text blocks
function markdownToPortableText(markdown: string) {
  const blocks: any[] = [];
  const lines = markdown.split("\n");
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) {
        blocks.push({
          _type: "block",
          _key: Math.random().toString(36).substr(2, 9),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).substr(2, 9),
              text: text,
              marks: [],
            },
          ],
        });
      }
      currentParagraph = [];
    }
  };

  const flushList = (listType: "bullet" | "number") => {
    if (listItems.length > 0) {
      for (const item of listItems) {
        blocks.push({
          _type: "block",
          _key: Math.random().toString(36).substr(2, 9),
          style: "normal",
          listItem: listType,
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).substr(2, 9),
              text: item,
              marks: [],
            },
          ],
        });
      }
      listItems = [];
      inList = false;
    }
  };

  for (const line of lines) {
    // Headers
    if (line.startsWith("#### ")) {
      flushParagraph();
      flushList("bullet");
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substr(2, 9),
        style: "h4",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).substr(2, 9),
            text: line.replace(/^#### /, ""),
            marks: [],
          },
        ],
      });
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList("bullet");
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substr(2, 9),
        style: "h3",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).substr(2, 9),
            text: line.replace(/^### /, ""),
            marks: [],
          },
        ],
      });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList("bullet");
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substr(2, 9),
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).substr(2, 9),
            text: line.replace(/^## /, ""),
            marks: [],
          },
        ],
      });
    } else if (line.startsWith("# ")) {
      flushParagraph();
      flushList("bullet");
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substr(2, 9),
        style: "h1",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).substr(2, 9),
            text: line.replace(/^# /, ""),
            marks: [],
          },
        ],
      });
    }
    // Bullet list items
    else if (line.match(/^[-*] /)) {
      flushParagraph();
      inList = true;
      listItems.push(line.replace(/^[-*] /, ""));
    }
    // Numbered list items
    else if (line.match(/^\d+\. /)) {
      flushParagraph();
      inList = true;
      listItems.push(line.replace(/^\d+\. /, ""));
    }
    // Blockquote
    else if (line.startsWith("> ")) {
      flushParagraph();
      flushList("bullet");
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substr(2, 9),
        style: "blockquote",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).substr(2, 9),
            text: line.replace(/^> /, ""),
            marks: [],
          },
        ],
      });
    }
    // Empty line
    else if (line.trim() === "") {
      if (inList) {
        flushList("bullet");
      }
      flushParagraph();
    }
    // Skip images, tables for now
    else if (!line.startsWith("![") && !line.startsWith("|")) {
      currentParagraph.push(line);
    }
  }

  if (inList) {
    flushList("bullet");
  }
  flushParagraph();

  return blocks;
}

// =============================================================================
// MIGRATION FUNCTIONS
// =============================================================================

async function migrateTeamMembers() {
  console.log("\n👥 Migrating Team Members...");
  const members = readMarkdownFiles(path.join(CONTENT_PATH, "team"));
  const memberMap: Record<string, string> = {};

  for (const member of members) {
    const { slug, frontmatter, body } = member;
    console.log(`  - ${frontmatter.name} (${slug})`);

    // Upload image
    let image = null;
    if (frontmatter.image?.url) {
      image = await uploadImage(frontmatter.image.url, frontmatter.image.alt);
    }

    const doc = {
      _type: "teamMember",
      _id: `team-${slug}`,
      name: frontmatter.name,
      slug: { _type: "slug", current: slug },
      role: frontmatter.role,
      bio: frontmatter.bio,
      bgColor: frontmatter.bgColor,
      image,
      socials: frontmatter.socials || undefined,
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      const result = await client.createOrReplace(doc);
      memberMap[slug] = result._id;
      console.log(`    ✓ Created team member: ${frontmatter.name}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create team member: ${frontmatter.name}`,
        error
      );
    }
  }

  return memberMap;
}

async function migratePosts(teamMap: Record<string, string>) {
  console.log("\n📰 Migrating Posts...");
  const posts = readMarkdownFiles(path.join(CONTENT_PATH, "posts"));

  for (const post of posts) {
    const { slug, frontmatter, body } = post;
    console.log(`  - ${frontmatter.title} (${slug})`);

    // Upload image
    let image = null;
    if (frontmatter.image?.url) {
      image = await uploadImage(frontmatter.image.url, frontmatter.image.alt);
    }

    // Get team member reference
    const teamRef =
      frontmatter.team && teamMap[frontmatter.team]
        ? { _type: "reference", _ref: teamMap[frontmatter.team] }
        : undefined;

    const doc = {
      _type: "post",
      _id: `post-${slug}`,
      title: frontmatter.title,
      slug: { _type: "slug", current: slug },
      description: frontmatter.description,
      pubDate: new Date(frontmatter.pubDate).toISOString(),
      bgColor: frontmatter.bgColor,
      image,
      tags: frontmatter.tags || [],
      team: teamRef,
      body: markdownToPortableText(body),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created post: ${frontmatter.title}`);
    } catch (error) {
      console.error(`    ✗ Failed to create post: ${frontmatter.title}`, error);
    }
  }
}

async function migrateCustomers() {
  console.log("\n🏢 Migrating Customers...");
  const customers = readMarkdownFiles(path.join(CONTENT_PATH, "customers"));

  for (const customer of customers) {
    const { slug, frontmatter, body } = customer;
    console.log(`  - ${frontmatter.customer} (${slug})`);

    // Upload images
    let avatar = null;
    if (frontmatter.avatar?.url) {
      avatar = await uploadImage(
        frontmatter.avatar.url,
        frontmatter.avatar.alt
      );
    }

    let logo = null;
    if (frontmatter.logo?.url) {
      logo = await uploadImage(frontmatter.logo.url, frontmatter.logo.alt);
    }

    // Convert details object to array
    const detailsArray = frontmatter.details
      ? Object.entries(frontmatter.details).map(([key, value]) => ({
          _key: Math.random().toString(36).substr(2, 9),
          key,
          value: value as string,
        }))
      : [];

    const doc = {
      _type: "customer",
      _id: `customer-${slug}`,
      customer: frontmatter.customer,
      slug: { _type: "slug", current: slug },
      bgColor: frontmatter.bgColor,
      ctaTitle: frontmatter.ctaTitle,
      testimonial: frontmatter.testimonial,
      partnership: frontmatter.partnership,
      about: frontmatter.about,
      challengesAndSolutions: (frontmatter.challengesAndSolutions || []).map(
        (item: any) => ({
          _key: Math.random().toString(36).substr(2, 9),
          title: item.title,
          content: item.content,
        })
      ),
      results: frontmatter.results || [],
      details: detailsArray,
      avatar,
      logo,
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created customer: ${frontmatter.customer}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create customer: ${frontmatter.customer}`,
        error
      );
    }
  }
}

async function migrateIntegrations() {
  console.log("\n🔌 Migrating Integrations...");
  const integrations = readMarkdownFiles(
    path.join(CONTENT_PATH, "integrations")
  );

  for (const integration of integrations) {
    const { slug, frontmatter, body } = integration;
    console.log(`  - ${frontmatter.integration} (${slug})`);

    // Upload logo
    let logo = null;
    if (frontmatter.logo?.url) {
      logo = await uploadImage(frontmatter.logo.url, frontmatter.logo.alt);
    }

    const doc = {
      _type: "integration",
      _id: `integration-${slug}`,
      integration: frontmatter.integration,
      slug: { _type: "slug", current: slug },
      email: frontmatter.email,
      description: frontmatter.description,
      permissions: frontmatter.permissions || [],
      details: (frontmatter.details || []).map((item: any) => ({
        _key: Math.random().toString(36).substr(2, 9),
        title: item.title,
        value: item.value,
        url: item.url,
      })),
      logo,
      tags: frontmatter.tags || [],
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created integration: ${frontmatter.integration}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create integration: ${frontmatter.integration}`,
        error
      );
    }
  }
}

async function migrateHelpcenter() {
  console.log("\n❓ Migrating Help Center...");
  const articles = readMarkdownFiles(path.join(CONTENT_PATH, "helpcenter"));

  for (const article of articles) {
    const { slug, frontmatter, body } = article;
    console.log(`  - ${frontmatter.page} (${slug})`);

    const doc = {
      _type: "helpcenter",
      _id: `helpcenter-${slug}`,
      page: frontmatter.page,
      slug: { _type: "slug", current: slug },
      iconId: frontmatter.iconId,
      description: frontmatter.description,
      category: frontmatter.category,
      keywords: frontmatter.keywords || [],
      lastUpdated: frontmatter.lastUpdated,
      faq: (frontmatter.faq || []).map((item: any) => ({
        _key: Math.random().toString(36).substr(2, 9),
        question: item.question,
        answer: item.answer,
      })),
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created help article: ${frontmatter.page}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create help article: ${frontmatter.page}`,
        error
      );
    }
  }
}

async function migrateChangelog() {
  console.log("\n📋 Migrating Changelog...");
  const entries = readMarkdownFiles(path.join(CONTENT_PATH, "changelog"));

  for (const entry of entries) {
    const { slug, frontmatter, body } = entry;
    console.log(`  - ${frontmatter.page} (${slug})`);

    const doc = {
      _type: "changelog",
      _id: `changelog-${slug}`,
      page: frontmatter.page,
      slug: { _type: "slug", current: slug },
      bgColor: frontmatter.bgColor,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.pubDate).toISOString(),
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created changelog entry: ${frontmatter.page}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create changelog entry: ${frontmatter.page}`,
        error
      );
    }
  }
}

async function migrateInfopages() {
  console.log("\n📄 Migrating Info Pages...");
  const pages = readMarkdownFiles(path.join(CONTENT_PATH, "infopages"));

  for (const page of pages) {
    const { slug, frontmatter, body } = page;
    console.log(`  - ${frontmatter.page} (${slug})`);

    const doc = {
      _type: "infopage",
      _id: `infopage-${slug}`,
      page: frontmatter.page,
      slug: { _type: "slug", current: slug },
      pubDate: new Date(frontmatter.pubDate).toISOString(),
      body: body ? markdownToPortableText(body) : undefined,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`    ✓ Created info page: ${frontmatter.page}`);
    } catch (error) {
      console.error(
        `    ✗ Failed to create info page: ${frontmatter.page}`,
        error
      );
    }
  }
}

// =============================================================================
// MAIN MIGRATION
// =============================================================================

async function migrate() {
  console.log("🚀 Starting migration to Sanity...\n");
  console.log("Project ID:", projectId);
  console.log("Dataset:", dataset);
  console.log("Content Path:", CONTENT_PATH);

  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "\n❌ Error: SANITY_WRITE_TOKEN or SANITY_TOKEN environment variable is required."
    );
    console.log("\nTo get a token:");
    console.log("1. Go to https://www.sanity.io/manage → Your Project → API");
    console.log("2. Create a new token with 'Editor' permissions");
    console.log("3. Run: SANITY_TOKEN=your-token npx tsx migrate-to-sanity.ts");
    process.exit(1);
  }

  try {
    // Migrate in dependency order
    // 1. Team members first (posts reference them)
    const teamMap = await migrateTeamMembers();

    // 2. Posts (reference team members)
    await migratePosts(teamMap);

    // 3. Other collections (no dependencies)
    await migrateCustomers();
    await migrateIntegrations();
    await migrateHelpcenter();
    await migrateChangelog();
    await migrateInfopages();

    console.log("\n✅ Migration complete!");
    console.log("\nNext steps:");
    console.log("1. Open Sanity Studio: cd apps/studio && pnpm dev");
    console.log("2. View your content at http://localhost:3333");
    console.log("3. Set USE_SANITY=true in apps/web/.env to use Sanity data");
    console.log("4. Run the site: cd apps/web && pnpm dev");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
