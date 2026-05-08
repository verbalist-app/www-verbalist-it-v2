import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'space-y-4 text-sm/7 text-mist-700 dark:text-mist-400',
        // links
        '[&_a]:font-semibold [&_a]:text-mist-950 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white',
        // headings
        '[&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:text-mist-950 [&_h2]:not-first:mt-8 dark:[&_h2]:text-white',
        '[&_h3]:text-sm/7 [&_h3]:font-semibold [&_h3]:text-mist-950 [&_h3]:not-first:mt-6 dark:[&_h3]:text-white',
        '[&_h4]:text-sm/7 [&_h4]:font-semibold [&_h4]:text-mist-700 [&_h4]:not-first:mt-4 dark:[&_h4]:text-mist-300',
        // strong
        '[&_strong]:font-semibold [&_strong]:text-mist-950 dark:[&_strong]:text-white',
        // lists
        '[&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-[square] [&_ul]:pl-6 [&_ul]:marker:text-mist-400 dark:[&_ul]:marker:text-mist-600',
        // blockquote
        '[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-mist-300 [&_blockquote]:pl-4 [&_blockquote]:text-mist-950 [&_blockquote]:italic dark:[&_blockquote]:border-mist-700 dark:[&_blockquote]:text-white',
        // inline code
        '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-mist-100 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs [&_:not(pre)>code]:text-mist-950 dark:[&_:not(pre)>code]:bg-mist-800 dark:[&_:not(pre)>code]:text-white',
        // code blocks
        '[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:bg-mist-100 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs/6 [&_pre]:text-mist-950 dark:[&_pre]:bg-mist-900 dark:[&_pre]:text-white [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:text-inherit',
        // tables
        '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm/7',
        '[&_th]:border-b [&_th]:border-mist-200 [&_th]:py-2 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-mist-950 dark:[&_th]:border-mist-800 dark:[&_th]:text-white',
        '[&_td]:border-b [&_td]:border-mist-200 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top dark:[&_td]:border-mist-800',
        // hr
        '[&_hr]:my-8 [&_hr]:border-mist-200 dark:[&_hr]:border-mist-800',
        // images
        '[&_img]:my-4 [&_img]:rounded-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
