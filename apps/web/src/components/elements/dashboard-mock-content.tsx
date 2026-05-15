export function AbstractContentGen() {
  return (
    <div
      className="aspect-[1709/990] w-full bg-mist-50"
      style={{ containerType: 'size' }}
      role="img"
      aria-label="Illustrazione astratta: generazione di un articolo SEO strutturato in Markdown"
    >
      <div className="flex h-full flex-col gap-[2.6cqw] px-[5cqw] py-[4.5cqh]">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-[2cqw] border-b border-mist-200 pb-[2cqw]">
          <div className="flex flex-col gap-[0.7cqw]">
            <span className="text-[1.5cqw] uppercase tracking-[0.18em] text-mist-500">
              Generazione
            </span>
            <span className="font-display text-[3.2cqw] leading-[1.05] tracking-[-0.04em] text-balance text-mist-900">
              Articolo per &laquo;seo 2025&raquo;
            </span>
          </div>
          <span className="text-[1.4cqw] text-mist-500">Markdown &middot; 2.450 parole</span>
        </div>

        {/* Body: documento generato */}
        <div className="flex flex-1 flex-col justify-between">
          {sections.map((s, i) => (
            <DocSection key={i} heading={s.heading} paragraphs={s.paragraphs} />
          ))}
        </div>
      </div>
    </div>
  )
}

const sections = [
  { heading: '62%', paragraphs: ['96%', '88%', '74%'] },
  { heading: '48%', paragraphs: ['92%', '80%'] },
  { heading: '54%', paragraphs: ['94%', '70%'] },
]

function DocSection({
  heading,
  paragraphs,
}: {
  heading: string
  paragraphs: string[]
}) {
  return (
    <div className="flex flex-col gap-[1.2cqw]">
      <div
        className="h-[1.6cqw] rounded-full bg-mist-400"
        style={{ width: heading }}
      />
      <div className="flex flex-col gap-[0.9cqw]">
        {paragraphs.map((w, i) => (
          <div
            key={i}
            className="h-[1cqw] rounded-full bg-mist-200"
            style={{ width: w }}
          />
        ))}
      </div>
    </div>
  )
}
