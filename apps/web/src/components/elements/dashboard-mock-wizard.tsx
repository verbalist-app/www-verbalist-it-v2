export function AbstractSerpResults() {
  return (
    <div
      className="aspect-[1709/990] w-full bg-mist-50"
      style={{ containerType: 'size' }}
      role="img"
      aria-label="Illustrazione astratta: analisi SERP dei primi risultati di Google per una keyword"
    >
      <div className="flex h-full flex-col gap-[3.4cqw] px-[5cqw] py-[4.5cqh]">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-[2cqw] border-b border-mist-200 pb-[2cqw]">
          <div className="flex flex-col gap-[0.7cqw]">
            <span className="text-[1.5cqw] uppercase tracking-[0.18em] text-mist-500">
              Analisi SERP
            </span>
            <span className="font-display text-[3.2cqw] leading-[1.05] tracking-[-0.04em] text-balance text-mist-900">
              Top 10 organici per &laquo;seo 2025&raquo;
            </span>
          </div>
          <span className="text-[1.4cqw] text-mist-500">Google.it &middot; lingua IT</span>
        </div>

        {/* Lista risultati */}
        <div className="flex flex-col gap-[3.4cqw]">
          {ranks.map((r) => (
            <SerpRow
              key={r.rank}
              rank={r.rank}
              titleWidth={r.titleWidth}
              snippetWidth={r.snippetWidth}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ranks = [
  { rank: '1', titleWidth: '84%', snippetWidth: '66%' },
  { rank: '2', titleWidth: '72%', snippetWidth: '54%' },
  { rank: '3', titleWidth: '60%', snippetWidth: '44%' },
]

function SerpRow({
  rank,
  titleWidth,
  snippetWidth,
}: {
  rank: string
  titleWidth: string
  snippetWidth: string
}) {
  return (
    <div className="flex items-center gap-[2.8cqw]">
      <span className="flex size-[5.6cqw] shrink-0 items-center justify-center rounded-[0.7cqw] bg-mist-900 font-display text-[2.6cqw] font-medium text-white tabular-nums">
        {rank}
      </span>
      <div className="flex flex-1 flex-col gap-[1.2cqw]">
        <div
          className="h-[1.6cqw] rounded-full bg-mist-300"
          style={{ width: titleWidth }}
        />
        <div
          className="h-[1.1cqw] rounded-full bg-mist-200"
          style={{ width: snippetWidth }}
        />
      </div>
      <div className="rounded-[0.6cqw] bg-mist-100 px-[2cqw] py-[1.2cqw]">
        <div className="h-[1cqw] w-[7cqw] rounded-full bg-mist-300" />
      </div>
    </div>
  )
}

export { AbstractSerpResults as DashboardMockWizard }
