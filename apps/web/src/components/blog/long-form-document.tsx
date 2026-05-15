import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '@/components/elements/container'
import { Document } from '@/components/elements/document'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'

const prose = clsx(
  // headings beyond h2 (kit only styles h2)
  '[&_h3]:text-sm/7 [&_h3]:font-semibold [&_h3]:text-mist-950 [&_h3]:not-first:mt-6',
  '[&_h4]:text-sm/7 [&_h4]:font-semibold [&_h4]:text-mist-700 [&_h4]:not-first:mt-4',
  // blockquote
  '[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-mist-950/15 [&_blockquote]:pl-4 [&_blockquote]:text-mist-950 [&_blockquote]:italic',
  // inline code
  '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-mist-950/5 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs [&_:not(pre)>code]:text-mist-950 >code]:bg-white/10 >code]:text-white',
  // code blocks
  '[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:bg-mist-950/5 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs/6 [&_pre]:text-mist-950 [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:text-inherit',
  // tables
  '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm/7',
  '[&_th]:border-b [&_th]:border-mist-950/15 [&_th]:py-2 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-mist-950',
  '[&_td]:border-b [&_td]:border-mist-950/10 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top',
  // hr
  '[&_hr]:my-8 [&_hr]:border-mist-950/10',
  // images
  '[&_img]:my-4 [&_img]:rounded-sm',
)

export function LongFormDocument({ className, ...props }: ComponentProps<typeof Document>) {
  return <Document {...props} className={clsx(prose, className)} />
}

export function LongFormSection({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="flex flex-col items-center gap-6">
          <Heading className="max-w-5xl text-center">{headline}</Heading>
          {subheadline && (
            <Text size="lg" className="flex max-w-xl flex-col gap-4 text-center">
              {subheadline}
            </Text>
          )}
        </div>
        <LongFormDocument className="mx-auto max-w-2xl">{children}</LongFormDocument>
      </Container>
    </section>
  )
}
