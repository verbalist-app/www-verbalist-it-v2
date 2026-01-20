# Theme Name

![Theme preview](https://lexingtonthemes.com/OpenGraph/theme-name/twitter.png)


## Links
- **Theme specs:** https://lexingtonthemes.com/templates/theme-name  
- **Documentation:** https://lexingtonthemes.com/documentation  
- **Changelog:** https://lexingtonthemes.com/changelog/theme-name  
- **Support:** https://lexingtonthemes.com/legal/support/  
- **Get the bundle:** https://lexingtonthemes.com  

---

## Two Ways to Use This Theme

This theme supports **two data sources** — choose what works best for you:

### Option A: Content Collections (No CMS Required)

Use markdown files in `apps/web/src/content/`. Perfect for:

- Quick setup with no external services
- Git-based content workflow
- Developers comfortable editing markdown

### Option B: Sanity CMS (Recommended for Clients)

Use Sanity Studio for a visual editing experience. Perfect for:

- Non-technical content editors
- Teams collaborating on content
- Dynamic content updates without code changes

**By default, the theme uses Content Collections.** Follow the instructions below to switch to Sanity.

---

## Quick Start (Content Collections)

If you just want to get started without Sanity:

```bash
# Install dependencies
pnpm install

# Start the website
pnpm dev:web
```

Open http://localhost:4321 — your site is ready with sample content!

Edit content in `apps/web/src/content/`:

- `posts/` — Blog posts
- `team/` — Team member profiles
- `customers/` — Customer case studies
- `integrations/` — Integration pages
- `helpcenter/` — Help center articles
- `changelog/` — Changelog entries
- `infopages/` — Info pages (Privacy, Terms, etc.)

---

## Getting Started with Sanity

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org)
- **pnpm** — Install with `npm install -g pnpm`
- **Sanity account** — Free at [sanity.io](https://sanity.io)

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Create Your Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Sign up or log in
3. Click **"Create project"**
4. Give it a name (e.g., "My Website")
5. Choose the **Free** plan
6. **Create a dataset** named `production`
7. Copy your **Project ID** (you'll need this next)

### Step 3: Set Up Environment Variables

**For the website** — Create `apps/web/.env`:

```bash
cp apps/web/.env.example apps/web/.env
```

Open `apps/web/.env` and add your Project ID:

```env
SANITY_PROJECT_ID=your-project-id-here
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

**For the CMS** — Create `apps/studio/.env`:

```bash
cp apps/studio/.env.example apps/studio/.env
```

Open `apps/studio/.env` and add the same Project ID:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id-here
SANITY_STUDIO_DATASET=production
```

### Step 4: Enable Sanity Mode

In `apps/web/.env`, set:

```env
USE_SANITY=true
```

Or open `apps/web/src/lib/data.ts` and change the default:

```typescript
export const USE_SANITY = import.meta.env.USE_SANITY === "true";
```

### Step 5: Migrate Your Content (Optional)

Want to use the existing sample content? Run the migration script:

1. Get a Sanity API token:
   - Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → API
   - Click **"Add API token"**
   - Name it "Migration" with **Editor** permissions
   - Copy the token

2. Add the token to `apps/web/.env`:

```env
SANITY_WRITE_TOKEN=your-token-here
```

3. Run the migration:

```bash
pnpm migrate
```

The script automatically reads `SANITY_PROJECT_ID` and `SANITY_WRITE_TOKEN` from `apps/web/.env`.

This uploads all content from `apps/web/src/content/` to your Sanity project, including images.

### Step 6: Start Development

```bash
pnpm dev
```

This starts:

- **Website** → http://localhost:4321
- **Sanity Studio (CMS)** → http://localhost:3333

### Step 7: Add Content in Studio

1. Go to http://localhost:3333
2. Create or edit content (posts, team members, etc.)
3. Click **Publish** so updates show up on http://localhost:4321

---

## Switching Between Data Sources

The `USE_SANITY` environment variable controls the data source:

**In `apps/web/.env`:**

```env
# Use Sanity CMS
USE_SANITY=true

# Use Content Collections (markdown files)
USE_SANITY=false
```

Both options use the same components and layouts — just different data sources.

**Key features:**

- `USE_SANITY=false` (default): Works with zero Sanity configuration
- `USE_SANITY=true`: Uses Sanity CMS for content
- Components remain unchanged regardless of data source
- Data shape is normalized in `apps/web/src/lib/data.ts`

---

## Project Structure

```
/
├── apps/
│   ├── web/              # Your Astro website
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── lib/sanity/  # Sanity integration
│   │   │   ├── pages/
│   │   │   └── styles/
│   │   └── .env.example
│   │
│   └── studio/           # Sanity CMS
│       ├── schemas/      # Content models
│       └── .env.example
│
├── scripts/              # Utility scripts (migrations, cleanup)
├── pnpm-workspace.yaml
└── package.json
```

---

## Content Types

### Blog Posts

- Title, slug, description
- Cover image with alt text
- Publish date and team member (author)
- Tags for categorization
- Background color
- Rich text body content

### Team Members

- Name, role, bio
- Profile image
- Background color
- Social media links (Twitter, LinkedIn, Website, Email)

### Customers

- Customer name, about
- Avatar and logo images
- CTA title, testimonial, partnership
- Challenges and solutions
- Results and details
- Background color

### Integrations

- Integration name, email
- Description, permissions
- Details with URLs
- Logo image
- Tags

### Help Center

- Page title, description
- Icon ID, category
- Keywords, last updated
- FAQ items
- Rich text content

### Changelog

- Page title, description
- Publish date
- Background color
- Rich text content

### Info Pages

- Page title (Privacy, Terms, etc.)
- Publish date
- Rich text content

### Site Settings

- Site title and description
- Navigation links
- Footer content
- Social media links

---

## Website Routes

| URL                       | Page               |
| ------------------------- | ------------------ |
| `/`                       | Homepage           |
| `/about`                  | About page         |
| `/blog/home`              | Blog listing       |
| `/blog/posts/[slug]`      | Blog post          |
| `/blog/tags`              | All tags           |
| `/blog/tags/[tag]`        | Posts by tag       |
| `/team/home`              | Team listing       |
| `/team/[slug]`            | Team member        |
| `/customers/home`         | Customers listing  |
| `/customers/[slug]`       | Customer case      |
| `/integrations/home`      | Integrations       |
| `/integrations/[slug]`    | Integration page   |
| `/helpcenter/home`        | Help center        |
| `/helpcenter/[slug]`      | Help article       |
| `/changelog/home`         | Changelog listing  |
| `/changelog/[slug]`       | Changelog entry    |
| `/infopages/[slug]`       | Info pages         |

---

## Deployment

### Deploy the Website

**Vercel (recommended):**

```bash
cd apps/web
npx vercel
```

**Netlify:**

```bash
cd apps/web
npx netlify deploy --prod
```

Add these environment variables in your hosting dashboard:

- `USE_SANITY` (set to `true` to use Sanity, omit or `false` for Content Collections)
- `SANITY_PROJECT_ID` (only if USE_SANITY=true)
- `SANITY_DATASET` (only if USE_SANITY=true)
- `SANITY_API_VERSION` (only if USE_SANITY=true)

### Deploy the CMS

Deploy to Sanity's free hosting:

```bash
cd apps/studio
pnpm deploy
```

You'll get a URL like `https://your-project.sanity.studio`

---

## Customization

### Styling

Edit `apps/web/src/styles/global.css` for global styles. This theme uses Tailwind CSS v4.

### Adding New Content Types

1. Create schema in `apps/studio/schemas/`
2. Register in `apps/studio/schemas/index.ts`
3. Add to `apps/studio/structure.ts`
4. Create query in `apps/web/src/lib/sanity/queries.ts`
5. Add types in `apps/web/src/lib/sanity/types.ts`

---

## Troubleshooting

### "Cannot find module" errors?

Run `pnpm install` in the project root to reinstall dependencies.

### Content not showing?

- Make sure you clicked **"Publish"** in Sanity Studio
- Check that your Project ID is correct in both `.env` files
- Verify your dataset name matches (default: `production`)

### "Failed to fetch" error?

- Your Project ID might be wrong
- Go to [sanity.io/manage](https://sanity.io/manage) and verify the ID

### Images not loading?

- Images must be uploaded directly to Sanity
- Check that your image fields have the required `asset` data

### CORS errors?

- Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → API → CORS Origins
- Add `http://localhost:4321` for development
- Add your production URL for deployment

---

## Useful Commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm install`    | Install all dependencies                       |
| `pnpm dev`        | Start website + CMS                            |
| `pnpm dev:web`    | Start website only                             |
| `pnpm dev:studio` | Start CMS only                                 |
| `pnpm build`      | Build both for production                      |
| `pnpm migrate`    | Migrate content to Sanity (requires token)     |
| `pnpm clean`      | Remove node_modules/.env/dist before packaging |

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lexington Themes](https://lexingtonthemes.com)

---

## License

MIT — Use freely for personal and commercial projects.
