import { promises as fs } from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import { marked } from 'marked'

export type PostCategory = 'seo' | 'content-marketing' | 'ai-automation' | 'guide' | 'news'

export type PostFrontmatter = {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author?: string
  category: PostCategory
  tags?: string[]
  summary?: string
}

export type Post = {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  html: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export const categoryLabels: Record<PostCategory, string> = {
  seo: 'SEO',
  'content-marketing': 'Content marketing',
  'ai-automation': 'AI & automation',
  guide: 'Guide',
  news: 'News',
}

export const categoryWallpaper: Record<PostCategory, 'blue' | 'purple' | 'green' | 'brown'> = {
  'ai-automation': 'blue',
  seo: 'purple',
  guide: 'green',
  'content-marketing': 'brown',
  news: 'blue',
}

export function getRelatedPosts(all: Post[], slug: string, category: PostCategory, limit = 3): Post[] {
  const others = all.filter((p) => p.slug !== slug)
  const sameCategory = others.filter((p) => p.frontmatter.category === category)
  const rest = others.filter((p) => p.frontmatter.category !== category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(POSTS_DIR)
  const posts = await Promise.all(
    files.filter((f) => f.endsWith('.md')).map((f) => readPost(f.replace(/\.md$/, ''))),
  )
  return posts.sort((a, b) => {
    const da = new Date(a.frontmatter.publishedAt).getTime()
    const db = new Date(b.frontmatter.publishedAt).getTime()
    return db - da
  })
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    return await readPost(slug)
  } catch {
    return null
  }
}

async function readPost(slug: string): Promise<Post> {
  const file = await fs.readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(file)
  const rawHtml = await marked.parse(content, { async: true })
  const html = rawHtml
    .replace(/<table>/g, '<div class="overflow-x-auto"><table>')
    .replace(/<\/table>/g, '</table></div>')
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    html,
  }
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}
