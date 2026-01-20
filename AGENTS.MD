You are working on an existing Astro theme that currently uses Astro Content Collections as its only data source.

Your task is to add optional support for Sanity CMS while preserving full compatibility with Content Collections. Customers must be able to choose either data source without changing any pages or components.

This task is discovery-driven. You must read the project before writing code.

════════════════════════════════════
MANDATORY FILES & PRECEDENCE (STRICT)
════════════════════════════════════

You MUST read and obey the following files, in this exact order of authority:

1. agents.md  
   - Defines architectural rules and conventions  
   - Overrides this prompt if conflicts exist

2. README.md  
   - Provides usage, setup, and expectations

3. Source code  
   - `src/content/config.ts`
   - `src/content/**`
   - `src/pages/**`

If any instruction conflicts:
- agents.md always wins
- README.md is advisory
- Source code is the final truth for data shape and behavior

If a required file is missing or unclear, STOP and explain what is missing. Do not guess.

════════════════════════════════════
SOURCE OF TRUTH (NON-NEGOTIABLE)
════════════════════════════════════

The canonical content model lives in:
- `src/content/config.ts`
- `src/content/**` (folder structure + markdown frontmatter)

You MUST NOT:
- Invent content types
- Assume common collections (posts, authors, etc.)
- Add fields that do not exist
- Rename or reshape data returned to components

All Sanity schemas, GROQ queries, migration logic, and transforms must be derived mechanically from what already exists on disk.

If something does not exist in Content Collections, it does not exist in Sanity.

════════════════════════════════════
HIGH-LEVEL GOAL
════════════════════════════════════

Convert the project into a pnpm monorepo that supports two interchangeable data sources:

- Astro Content Collections (default, works out of the box)
- Sanity CMS (optional)

The component and page interfaces must remain unchanged.
Only the data source may change.

════════════════════════════════════
TARGET PROJECT STRUCTURE
════════════════════════════════════

Convert the project to a monorepo with:

- `apps/web/`       → Astro website (move current project here)
- `apps/studio/`    → Sanity Studio
- `scripts/`        → Migration utilities
- `pnpm-workspace.yaml` at the root

All structure and conventions must follow agents.md.

════════════════════════════════════
MANDATORY IMPLEMENTATION ORDER
════════════════════════════════════

You MUST follow this order. Do not skip or reorder steps.

1. Read agents.md and README.md
2. Inspect `src/content/config.ts`
3. Inspect `src/content/**` to identify collections and fields
4. Inspect `src/pages/**` to understand data consumption
5. Infer the unified component-level data shape
6. Create Sanity schemas
7. Create GROQ queries
8. Create TypeScript types
9. Create transform functions
10. Create migration script
11. Create central data utility with toggle
12. Update pages/components to use the data utility

If you cannot complete a step due to missing information, stop and explain.

════════════════════════════════════
REQUIRED IMPLEMENTATIONS
════════════════════════════════════

1. **Sanity Schemas** (`apps/studio/schemas/`)
   - One schema per content collection
   - Exact field parity with Content Collections
   - Equivalent required/optional rules
   - Image fields must support hotspot and alt text
   - No extra fields allowed

2. **Sanity Studio Structure** (`apps/studio/structure.ts`)
   - All content types in the sidebar
   - Appropriate icons
   - Singletons where implied by the model

3. **Central Data Utility** (`apps/web/src/lib/data.ts`)
   - `USE_SANITY` boolean (default: false)
   - When false → Content Collections
   - When true → Sanity
   - Identical return shapes
   - Export all data access functions

4. **Sanity Client** (`apps/web/src/lib/sanity/client.ts`)
   - Must handle missing `SANITY_PROJECT_ID`
   - Project must build with zero Sanity config when `USE_SANITY = false`

5. **GROQ Queries** (`apps/web/src/lib/sanity/queries.ts`)
   - Queries for every collection
   - getAll, getBySlug, getByTag, getAllTags where applicable
   - Handle references exactly as defined

6. **TypeScript Types** (`apps/web/src/lib/sanity/types.ts`)
   - Raw Sanity document types
   - Unified component-level types
   - Image fields must support:
     - `ImageMetadata` (Astro)
     - `string` URLs (Sanity)

7. **Transform Functions** (`apps/web/src/lib/sanity/transforms.ts`)
   - Convert Sanity data into Content Collection shape
   - Use `@sanity/image-url`
   - Defensive handling of optional fields

8. **Migration Script** (`scripts/migrate-to-sanity.ts`)
   - Read markdown from `src/content/**`
   - Parse frontmatter with `gray-matter`
   - Upload images to Sanity assets
   - Convert markdown to Portable Text
   - Create documents with correct references
   - Fail loudly on missing required fields or broken references
   - Require `SANITY_TOKEN`

9. **Pages & Components**
   - Replace direct `getCollection()` usage
   - Do NOT change component props or APIs
   - No conditional logic in components for data source

10. **Dependencies**
   - `apps/web`: `sharp`, `@sanity/client`, `@sanity/image-url`
   - `apps/studio`: standard Sanity Studio deps
   - Root: `gray-matter`, `tsx`

11. **Environment Files**
   - Create `.env.example` files only
   - Never commit real IDs or tokens

12. **README Updates**
   - Content Collections quick start
   - Sanity setup guide
   - Migration usage
   - `USE_SANITY` toggle documentation

════════════════════════════════════
CRITICAL CONSTRAINTS
════════════════════════════════════

- The project must build with `USE_SANITY = false` and no Sanity config
- No Sanity code executes unless `USE_SANITY = true`
- Data normalization happens once, centrally
- Components must not know or care about the data source
- Content Collections define the model; Sanity mirrors it

════════════════════════════════════
FINAL INSTRUCTION
════════════════════════════════════

Read the files.
Infer the model from what exists.
Mirror it exactly.
Do not assume. Do not invent. Do not reshape.

Only the data source may change.
	