import Link from 'next/link'

import { Wallpaper } from '@/components/elements/wallpaper'
import { categoryLabels, categoryWallpaper, formatDate, type Post } from '@/lib/posts'

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const category = categoryLabels[post.frontmatter.category] ?? post.frontmatter.category
  const date = formatDate(post.frontmatter.publishedAt)
  const wallpaperColor = categoryWallpaper[post.frontmatter.category]

  return (
    <li
      className={`flex flex-col gap-4 text-sm/7 ${
        featured ? 'sm:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex flex-col gap-4 ${
          featured ? 'lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-6' : ''
        }`}
      >
        <div
          className={`relative w-full overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 dark:outline-white/5 ${
            featured ? 'aspect-16/9' : 'aspect-4/3'
          }`}
        >
          <Wallpaper color={wallpaperColor} className="size-full" />
          <div
            className={`absolute inset-0 z-10 flex items-end ${featured ? 'p-6' : 'p-4'}`}
          >
            <p className="text-sm/7 font-semibold text-white/90">{category}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p
            className={`font-display font-medium tracking-[-0.02em] text-mist-950 dark:text-white ${
              featured ? 'text-3xl/9 sm:text-4xl/12' : 'text-lg/7'
            }`}
          >
            {post.frontmatter.title}
          </p>
          {featured && (
            <p className="text-base text-mist-700 dark:text-mist-400">
              {post.frontmatter.description}
            </p>
          )}
          <p className="text-mist-700 dark:text-mist-400">{date}</p>
        </div>
      </Link>
    </li>
  )
}
