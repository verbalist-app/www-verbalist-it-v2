import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const SIDEBAR_W = 256
const PAD = 32

const NAV_ITEMS = ['Panoramica', 'Progetti', 'Documenti', 'Profilo', 'Impostazioni'] as const
const ACTIVE_NAV = 2

type SubtaskStatus = 'succeeded' | 'running' | 'queued'

type Subtask = {
  kind: string
  status: SubtaskStatus
  message: string
}

const SUBTASKS: Subtask[] = [
  { kind: 'RECUPERO TOP 10', status: 'succeeded', message: '10 risultati recuperati' },
  { kind: 'SCRAPING', status: 'succeeded', message: '8 pagine analizzate · 2 saltate' },
  { kind: 'ANALISI SERP', status: 'running', message: 'Estrazione titoli e headings…' },
  { kind: 'GENERAZIONE', status: 'queued', message: 'In attesa' },
]

const STATUS_LABEL: Record<SubtaskStatus, string> = {
  succeeded: 'Completato',
  running: 'In corso',
  queued: 'In coda',
}

const REASONING = [
  {
    title: 'Recupero top 10 da Google',
    status: 'succeeded' as const,
    history: [
      'Query inviata a Google (IT · desktop)',
      '10 URL recuperati con metadata',
    ],
  },
  {
    title: 'Scraping delle pagine SERP',
    status: 'succeeded' as const,
    history: [
      'HTML estratto da 8 pagine',
      '2 pagine ignorate per blocco anti-bot',
    ],
  },
  {
    title: 'Analisi del contenuto',
    status: 'running' as const,
    history: [
      'Estrazione titoli e headings completata',
      'Mappatura argomenti ricorrenti in corso',
    ],
  },
]

export function DashboardVisual({ className, ...props }: ComponentProps<'svg'>) {
  const mainX = SIDEBAR_W
  const mainW = 1709 - SIDEBAR_W

  const subTop = 200
  const subH = 192
  const subGap = 22
  const subW = (mainW - PAD * 2 - subGap * 3) / 4

  const timelineTop = subTop + subH + 32
  const timelineBottom = 968
  const timelineH = timelineBottom - timelineTop
  const timelineX = mainX + PAD
  const timelineW = mainW - PAD * 2

  return (
    <svg
      viewBox="0 0 1709 990"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('bg-mist-100', className)}
      role="img"
      aria-label="Schermata documento Verbalist: pipeline a 4 subtask in esecuzione sulla keyword miglior crm 2026 con cronologia del ragionamento"
      {...props}
    >
      {/* Sidebar */}
      <rect x={0} y={0} width={SIDEBAR_W} height={990} className="fill-white" />
      <line
        x1={SIDEBAR_W}
        y1={0}
        x2={SIDEBAR_W}
        y2={990}
        className="stroke-mist-950/5"
        strokeWidth={1}
      />

      <g transform="translate(28 36) scale(0.86)" className="fill-mist-950">
        <path d="m23.77-.078-4.454 7.84-2.691 4.734-2.566 4.516-1.473 2.593-3.227 5.684-.004.004 4.704 8.281 2.945-5.18 1.762-3.101.937-1.652 4.184-7.368 4.84-8.511ZM.309 9.816l4.058 7.149 2.895 5.09 4.789-8.13-2.332-4.109Zm30.347 4.22v3.472h6.621v1.883h-6.62v3.804h7.042v2.153H27.98V11.887h9.657v2.148Zm11.149 4.624h3.746q1.336 0 1.777-.469.439-.467.438-1.878.001-1.438-.38-1.86-.373-.417-1.656-.418h-3.925Zm-2.61 6.688V11.887h6.778q2.53-.001 3.484.86.956.856.957 3.1 0 2.045-.48 2.794-.476.749-1.957 1.035v.09q2.285.134 2.285 2.613v2.969h-2.606V22.89q0-2.08-2.097-2.078h-3.754v4.535Zm15.328-2.153h2.868l.922-.02q1.318 0 1.742-.363.417-.361.418-1.539c0-.812-.149-1.328-.442-1.539-.293-.207-1.011-.312-2.164-.312h-3.344Zm0-5.66h3.204q1.551 0 1.984-.332.429-.338.43-1.55c0-1.079-.63-1.618-1.88-1.618h-3.738Zm-2.613 7.813V11.887h6.774q2.384-.001 3.246.742c.578.496.863 1.434.863 2.809 0 1.664-.676 2.64-2.027 2.937v.05q2.362.354 2.363 3.204-.001 2.06-.91 2.89-.91.828-3.172.829Zm20.621-4.47-2.3-7.01-2.262 7.01Zm.586 1.884h-5.742l-.828 2.586h-2.672l4.426-13.461h3.793l4.496 13.46h-2.625Zm7.551-10.875v11.172h6.39v2.289h-8.972V11.887Zm7.887 13.46h2.242v-13.46h-2.242Zm14.64-9.488h-2.402a3 3 0 0 1-.02-.273c-.054-.742-.218-1.207-.484-1.399q-.397-.285-1.879-.285-1.752 0-2.285.328-.54.331-.54 1.387c0 .832.15 1.336.438 1.504.293.168 1.254.297 2.891.387q2.896.164 3.746.844.851.675.852 2.816.001 2.637-1 3.41-.996.769-4.399.77-3.057-.002-4.058-.754-1.003-.76-1.004-3.067l-.008-.484h2.39l.012.281q-.001 1.39.477 1.696.474.311 2.594.312 1.653 0 2.105-.36.457-.358.457-1.656c0-.64-.113-1.066-.348-1.273-.23-.211-.726-.34-1.496-.383l-1.355-.09c-2.055-.12-3.367-.414-3.934-.87q-.855-.689-.855-2.958 0-2.313 1.031-3.086c.684-.511 2.059-.77 4.117-.77q2.927 0 3.942.708c.68.472 1.015 1.39 1.02 2.761Zm7.508-1.687v11.176h-2.555V14.172h-3.89v-2.285h10.472v2.285Zm0 0" />
      </g>

      <rect
        x={28}
        y={96}
        width={200}
        height={44}
        rx={10}
        className="fill-mist-950/2.5"
      />
      <circle
        cx={50}
        cy={118}
        r={7}
        className="fill-none stroke-mist-700"
        strokeWidth={1.6}
      />
      <line
        x1={56}
        y1={124}
        x2={62}
        y2={130}
        className="stroke-mist-700"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <text
        x={72}
        y={123}
        className="fill-mist-700 font-sans"
        fontSize={15}
        fontWeight={400}
      >
        Cerca documento
      </text>

      {NAV_ITEMS.map((item, i) => {
        const y = 180 + i * 52
        const active = i === ACTIVE_NAV
        return (
          <g key={item}>
            {active && (
              <rect
                x={18}
                y={y - 18}
                width={220}
                height={38}
                rx={10}
                className="fill-mist-950/5"
              />
            )}
            <circle
              cx={36}
              cy={y + 1}
              r={4}
              className={active ? 'fill-mist-950' : 'fill-mist-700'}
            />
            <text
              x={56}
              y={y + 6}
              className={
                active
                  ? 'fill-mist-950 font-sans'
                  : 'fill-mist-700 font-sans'
              }
              fontSize={16}
              fontWeight={active ? 600 : 500}
              letterSpacing="-0.2"
            >
              {item}
            </text>
          </g>
        )
      })}

      <line
        x1={18}
        y1={904}
        x2={238}
        y2={904}
        className="stroke-mist-950/5"
        strokeWidth={1}
      />
      <circle cx={44} cy={940} r={18} className="fill-mist-950/5" />
      <text
        x={44}
        y={946}
        textAnchor="middle"
        className="fill-mist-700 font-sans"
        fontSize={13}
        fontWeight={600}
      >
        MR
      </text>
      <text
        x={72}
        y={938}
        className="fill-mist-950 font-sans"
        fontSize={15}
        fontWeight={600}
        letterSpacing="-0.2"
      >
        Marco Rossi
      </text>
      <text
        x={72}
        y={956}
        className="fill-mist-700 font-sans"
        fontSize={12}
        fontWeight={400}
      >
        Piano Pro
      </text>

      {/* Header */}
      <text
        x={mainX + PAD}
        y={64}
        className="fill-mist-700 font-sans"
        fontSize={14}
        fontWeight={500}
        letterSpacing="-0.2"
      >
        Documenti / Nuovo documento
      </text>
      <text
        x={mainX + PAD}
        y={120}
        className="fill-mist-950 font-display"
        fontSize={48}
        fontWeight={500}
        letterSpacing="-1.4"
      >
        miglior crm 2026
      </text>

      <g>
        {(() => {
          const label = 'Task in esecuzione'
          const pillH = 32
          const pillX = mainX + PAD
          const pillY = 140
          const dotCx = pillX + 18
          const labelStartX = pillX + 32
          const labelW = labelStartX + label.length * 7.4 + 16 - pillX
          return (
            <>
              <rect
                x={pillX}
                y={pillY}
                width={labelW}
                height={pillH}
                rx={pillH / 2}
                className="fill-mist-950"
              />
              <circle cx={dotCx} cy={pillY + pillH / 2} r={4} className="fill-white" />
              <text
                x={labelStartX}
                y={pillY + pillH / 2 + 5}
                className="fill-white font-sans"
                fontSize={13}
                fontWeight={600}
                letterSpacing="-0.2"
              >
                {label}
              </text>
              <text
                x={pillX + labelW + 16}
                y={pillY + pillH / 2 + 5}
                className="fill-mist-700 font-sans"
                fontSize={14}
                fontWeight={500}
              >
                Blog post · IT · google.it
              </text>
            </>
          )
        })()}
      </g>

      <g>
        <rect
          x={1709 - PAD - 168}
          y={78}
          width={168}
          height={42}
          rx={10}
          className="fill-none stroke-mist-950/10"
          strokeWidth={1}
        />
        <text
          x={1709 - PAD - 168 + 84}
          y={105}
          textAnchor="middle"
          className="fill-mist-950 font-sans"
          fontSize={15}
          fontWeight={500}
          letterSpacing="-0.2"
        >
          Salva bozza
        </text>
      </g>

      <line
        x1={mainX + PAD}
        y1={184}
        x2={1709 - PAD}
        y2={184}
        className="stroke-mist-950/5"
        strokeWidth={1}
      />

      {/* Subtask cards */}
      {SUBTASKS.map((s, i) => {
        const x = mainX + PAD + i * (subW + subGap)
        const y = subTop
        const isDim = s.status === 'queued'
        const isActive = s.status === 'running'
        const label = STATUS_LABEL[s.status]
        const fontSize = 13
        const charW = 7.2
        const padX = 14
        const hasIcon = s.status !== 'queued'
        const iconReserve = hasIcon ? 22 : 0
        const textW = label.length * charW
        const pillH = 30
        const labelW = padX + iconReserve + textW + padX
        const pillX = x + subW - 18 - labelW
        const pillY = y + 22
        const cy = pillY + pillH / 2
        const iconX = pillX + padX
        return (
          <g key={s.kind}>
            <rect
              x={x}
              y={y}
              width={subW}
              height={subH}
              rx={14}
              className={
                isDim ? 'fill-mist-950/2.5' : 'fill-white'
              }
            />
            <rect
              x={x + 0.5}
              y={y + 0.5}
              width={subW - 1}
              height={subH - 1}
              rx={13.5}
              className={
                isActive
                  ? 'fill-none stroke-mist-950/15'
                  : 'fill-none stroke-mist-950/5'
              }
              strokeWidth={isActive ? 1.5 : 1}
            />
            {/* icon placeholder */}
            <rect
              x={x + 22}
              y={y + 24}
              width={36}
              height={36}
              rx={8}
              className="fill-mist-950/5"
            />
            {/* status pill */}
            <rect
              x={pillX}
              y={pillY}
              width={labelW}
              height={pillH}
              rx={pillH / 2}
              className={
                s.status === 'queued'
                  ? 'fill-mist-950/5'
                  : 'fill-mist-950'
              }
            />
            {s.status === 'succeeded' && (
              <path
                d={`M${iconX},${cy} L${iconX + 4},${cy + 5} L${iconX + 14},${cy - 5}`}
                className="fill-none stroke-white"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {s.status === 'running' && (
              <circle cx={iconX + 7} cy={cy} r={4} className="fill-white" />
            )}
            <text
              x={pillX + padX + iconReserve}
              y={cy + 5}
              className={
                s.status === 'queued'
                  ? 'fill-mist-700 font-sans'
                  : 'fill-white font-sans'
              }
              fontSize={fontSize}
              fontWeight={600}
            >
              {label}
            </text>
            {/* kind */}
            <text
              x={x + 22}
              y={y + 102}
              className={
                isDim
                  ? 'fill-mist-700 font-sans'
                  : 'fill-mist-950 font-sans'
              }
              fontSize={14}
              fontWeight={700}
              letterSpacing="1.5"
            >
              {s.kind}
            </text>
            {/* message */}
            <text
              x={x + 22}
              y={y + 146}
              className="fill-mist-700 font-sans"
              fontSize={15}
              fontWeight={400}
              letterSpacing="-0.1"
            >
              {s.message}
            </text>
          </g>
        )
      })}

      {/* Reasoning timeline */}
      <g>
        <rect
          x={timelineX}
          y={timelineTop}
          width={timelineW}
          height={timelineH}
          rx={14}
          className="fill-white"
        />
        <rect
          x={timelineX + 0.5}
          y={timelineTop + 0.5}
          width={timelineW - 1}
          height={timelineH - 1}
          rx={13.5}
          className="fill-none stroke-mist-950/5"
          strokeWidth={1}
        />
        <text
          x={timelineX + 28}
          y={timelineTop + 44}
          className="fill-mist-950 font-sans"
          fontSize={18}
          fontWeight={500}
          letterSpacing="-0.4"
        >
          Ragionamento
        </text>
        <text
          x={timelineX + 28}
          y={timelineTop + 68}
          className="fill-mist-700 font-sans"
          fontSize={14}
          fontWeight={400}
        >
          Cronologia del task · 3 step su 4
        </text>
        <line
          x1={timelineX + 28}
          y1={timelineTop + 92}
          x2={timelineX + timelineW - 28}
          y2={timelineTop + 92}
          className="stroke-mist-950/5"
          strokeWidth={1}
        />

        {/* Vertical divider between Ragionamento and Bozza */}
        <line
          x1={timelineX + 720}
          y1={timelineTop + 28}
          x2={timelineX + 720}
          y2={timelineTop + timelineH - 28}
          className="stroke-mist-950/5"
          strokeWidth={1}
        />

        {/* Bozza preview header */}
        <text
          x={timelineX + 748}
          y={timelineTop + 44}
          className="fill-mist-950 font-sans"
          fontSize={18}
          fontWeight={500}
          letterSpacing="-0.4"
        >
          Bozza in costruzione
        </text>
        <text
          x={timelineX + 748}
          y={timelineTop + 68}
          className="fill-mist-700 font-sans"
          fontSize={14}
          fontWeight={400}
        >
          Anteprima del documento generato
        </text>

        {/* Article skeleton */}
        {(() => {
          const px = timelineX + 748
          const lines: Array<{ y: number; w: number; h: number; dark: boolean }> = []
          let cy = timelineTop + 134
          // Title
          lines.push({ y: cy, w: 380, h: 10, dark: true })
          cy += 22
          // Meta
          lines.push({ y: cy, w: 180, h: 4, dark: false })
          cy += 36
          // Section 1
          lines.push({ y: cy, w: 240, h: 8, dark: true })
          cy += 22
          ;[560, 540, 500, 380].forEach((w) => {
            lines.push({ y: cy, w, h: 4, dark: false })
            cy += 16
          })
          cy += 16
          // Section 2
          lines.push({ y: cy, w: 280, h: 8, dark: true })
          cy += 22
          ;[560, 530, 440].forEach((w) => {
            lines.push({ y: cy, w, h: 4, dark: false })
            cy += 16
          })
          cy += 16
          // Section 3 (in progress)
          lines.push({ y: cy, w: 220, h: 8, dark: true })
          cy += 22
          lines.push({ y: cy, w: 560, h: 4, dark: false })
          cy += 16
          const progressY = cy

          return (
            <>
              {lines.map((l, i) => (
                <rect
                  key={i}
                  x={px}
                  y={l.y}
                  width={l.w}
                  height={l.h}
                  rx={2}
                  className={
                    l.dark
                      ? 'fill-mist-950'
                      : 'fill-mist-950/15'
                  }
                />
              ))}
              {/* in-progress partial line + cursor */}
              <rect
                x={px}
                y={progressY}
                width={300}
                height={4}
                rx={2}
                className="fill-mist-950/15"
              />
              <rect
                x={px + 308}
                y={progressY - 4}
                width={2}
                height={12}
                className="fill-mist-950"
              />
            </>
          )
        })()}

        {(() => {
          const startY = timelineTop + 128
          const dotX = timelineX + 44
          const textX = timelineX + 78
          const stepGap = 130
          return REASONING.map((step, i) => {
            const sy = startY + i * stepGap
            const isDone = step.status === 'succeeded'
            const isRunning = step.status === 'running'
            return (
              <g key={step.title}>
                {i < REASONING.length - 1 && (
                  <line
                    x1={dotX}
                    y1={sy + 16}
                    x2={dotX}
                    y2={sy + stepGap - 6}
                    className={
                      isDone
                        ? 'stroke-mist-950'
                        : 'stroke-mist-950/10'
                    }
                    strokeWidth={1.5}
                    strokeDasharray={isDone ? undefined : '5 5'}
                  />
                )}
                <circle
                  cx={dotX}
                  cy={sy}
                  r={12}
                  className={
                    isDone || isRunning
                      ? 'fill-mist-950'
                      : 'fill-mist-950/5'
                  }
                />
                {isDone ? (
                  <path
                    d={`M${dotX - 5},${sy} L${dotX - 1},${sy + 4} L${dotX + 5},${sy - 4}`}
                    className="fill-none stroke-white"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : isRunning ? (
                  <circle cx={dotX} cy={sy} r={4} className="fill-white" />
                ) : null}
                <text
                  x={textX}
                  y={sy + 6}
                  className="fill-mist-950 font-sans"
                  fontSize={17}
                  fontWeight={600}
                  letterSpacing="-0.3"
                >
                  {step.title}
                </text>
                {step.history.map((h, hi) => (
                  <text
                    key={hi}
                    x={textX}
                    y={sy + 36 + hi * 26}
                    className="fill-mist-700 font-sans"
                    fontSize={14}
                    fontWeight={400}
                  >
                    · {h}
                  </text>
                ))}
              </g>
            )
          })
        })()}
      </g>
    </svg>
  )
}
