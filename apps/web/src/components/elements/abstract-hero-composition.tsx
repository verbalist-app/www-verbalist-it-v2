function VerbalistMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28.62 33.43"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Verbalist"
    >
      <path d="m23.77-.078-4.454 7.84-2.691 4.734-2.566 4.516-1.473 2.593-3.227 5.684-.004.004 4.704 8.281 2.945-5.18 1.762-3.101.937-1.652 4.184-7.368 4.84-8.511Z" />
      <path d="M.309 9.816l4.058 7.149 2.895 5.09 4.789-8.13-2.332-4.109Z" />
    </svg>
  )
}

export function AbstractHeroComposition() {
  return (
    <div
      className="aspect-[1709/990] h-full bg-mist-50 ring-1 ring-black/10 rounded-tl-lg"
      style={{ containerType: 'size' }}
      role="img"
      aria-label="Illustrazione astratta della dashboard Verbalist: pipeline editoriale in corso"
    >
      <div className="flex h-full flex-col">
        {/* Top bar */}
        <header className="flex h-[6cqh] shrink-0 items-center justify-between border-b border-mist-200 bg-white px-[1.4cqw]">
          <div className="flex items-center gap-[1cqw]">
            <VerbalistMark className="h-[2.6cqh] w-auto text-mist-900" />
            <span className="h-[1.4cqh] w-[12cqw] rounded-full bg-mist-100" />
          </div>
          <div className="flex items-center gap-[1cqw]">
            <span className="h-[1.4cqh] w-[5cqw] rounded-full bg-mist-100" />
            <span className="h-[1.4cqh] w-[3cqw] rounded-full bg-mist-100" />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="flex w-[18cqw] shrink-0 flex-col gap-[1cqw] border-r border-mist-200 bg-white p-[1.2cqw]">
            <div className="h-[2.6cqh] rounded-md bg-mist-100" />
            <div className="mt-[0.6cqw] text-[0.85cqw] uppercase tracking-[0.18em] text-mist-400">
              Menu
            </div>
            <div className="flex flex-col gap-[0.4cqw]">
              <NavItem />
              <NavItem />
              <NavItem indent />
              <NavItem indent />
              <NavItem indent />
              <NavItem active />
            </div>
            <div className="mt-[0.8cqw] text-[0.85cqw] uppercase tracking-[0.18em] text-mist-400">
              Account
            </div>
            <div className="flex flex-col gap-[0.4cqw]">
              <NavItem />
              <NavItem />
            </div>
          </aside>

          {/* Main */}
          <main className="flex flex-1 flex-col gap-[1.8cqw] overflow-hidden bg-mist-50 p-[2.4cqw]">
            {/* Page header */}
            <div className="flex items-end justify-between gap-[1cqw]">
              <div className="flex flex-col gap-[0.6cqw]">
                <span className="text-[0.95cqw] uppercase tracking-[0.18em] text-mist-500">
                  Pipeline editoriale
                </span>
                <span className="font-display text-[2.4cqw] leading-[1.05] tracking-[-0.04em] text-balance text-mist-900">
                  Articolo per &laquo;seo 2025&raquo;
                </span>
              </div>
              <div className="flex items-center gap-[0.6cqw] rounded-full bg-mist-100 px-[1cqw] py-[0.5cqw]">
                <span className="size-[0.8cqw] rounded-full bg-mist-900" />
                <span className="text-[0.9cqw] text-mist-700">In corso</span>
              </div>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-4 gap-[1cqw]">
              {steps.map((s, i) => (
                <StepCard
                  key={s.label}
                  index={i + 1}
                  state={s.state}
                  label={s.label}
                  meta={s.meta}
                />
              ))}
            </div>

            {/* Two-column block */}
            <div className="grid flex-1 grid-cols-2 gap-[1cqw]">
              <DetailCard eyebrow="Argomenti coperti" content="topics" />
              <DetailCard eyebrow="Word count" content="bars" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

const steps = [
  { label: 'Analisi SERP', state: 'done' as const, meta: '10/10' },
  { label: 'Pattern', state: 'done' as const, meta: 'estratti' },
  { label: 'Generazione', state: 'active' as const, meta: '78%' },
  { label: 'Export', state: 'todo' as const, meta: '—' },
]

function NavItem({ active, indent }: { active?: boolean; indent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-[0.6cqw] rounded-md px-[0.6cqw] py-[0.45cqw] ${
        active ? 'bg-mist-100' : ''
      } ${indent ? 'ml-[1.4cqw]' : ''}`}
    >
      <span className="size-[1.2cqw] shrink-0 rounded-[0.2cqw] bg-mist-200" />
      <span
        className={`h-[0.7cqw] flex-1 rounded-full ${active ? 'bg-mist-400' : 'bg-mist-200'}`}
      />
    </div>
  )
}

function StepCard({
  index,
  state,
  label,
  meta,
}: {
  index: number
  state: 'done' | 'active' | 'todo'
  label: string
  meta: string
}) {
  return (
    <div
      className={`rounded-md border p-[1cqw] ${
        state === 'active'
          ? 'border-mist-900 bg-white shadow-sm'
          : 'border-mist-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-[0.6cqw]">
        <StepBadge index={index} state={state} />
        <span className="text-[0.85cqw] uppercase tracking-[0.14em] text-mist-500">
          Step {index}
        </span>
      </div>
      <div className="mt-[0.7cqw] font-display text-[1.2cqw] leading-[1.05] tracking-[-0.04em] text-mist-900">
        {label}
      </div>
      <div className="mt-[0.4cqw] text-[0.85cqw] text-mist-500 tabular-nums">{meta}</div>
    </div>
  )
}

function StepBadge({ index, state }: { index: number; state: 'done' | 'active' | 'todo' }) {
  if (state === 'done') {
    return (
      <span className="flex size-[1.6cqw] items-center justify-center rounded-full bg-mist-900">
        <svg viewBox="0 0 16 16" className="size-[1cqw] text-white" aria-hidden="true">
          <path
            d="M3 8l3.5 3.5L13 5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span className="flex size-[1.6cqw] items-center justify-center rounded-full bg-mist-900 font-display text-[0.85cqw] font-medium text-white">
        {index}
      </span>
    )
  }
  return (
    <span className="flex size-[1.6cqw] items-center justify-center rounded-full bg-mist-100 font-display text-[0.85cqw] text-mist-400">
      {index}
    </span>
  )
}

function DetailCard({ eyebrow, content }: { eyebrow: string; content: 'topics' | 'bars' }) {
  return (
    <div className="flex flex-col gap-[0.9cqw] rounded-md border border-mist-200 bg-white p-[1.2cqw]">
      <div className="text-[0.8cqw] uppercase tracking-[0.18em] text-mist-500">
        {eyebrow}
      </div>
      {content === 'topics' ? (
        <div className="flex flex-col gap-[0.55cqw]">
          {['96%', '92%', '88%', '94%', '78%', '90%', '84%', '68%'].map((w, i) => (
            <div
              key={i}
              className="h-[0.6cqw] rounded-full bg-mist-200"
              style={{ width: w }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-end gap-[0.7cqw] pt-[0.4cqw]">
          {[42, 60, 38, 75, 95, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-mist-300"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
