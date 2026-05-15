import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const COLS = 10
const ROWS = 5
const FILLED_PER_ROW = [10, 8, 5, 3, 2] as const
const ROW_PERCENTS = ['100%', '80%', '50%', '30%', '20%'] as const

const RADIUS = 42
const SPACING_X = 118
const SPACING_Y = 106
const MATRIX_W = (COLS - 1) * SPACING_X
const MATRIX_H = (ROWS - 1) * SPACING_Y
const START_X = (1709 - MATRIX_W) / 2 - 90
const START_Y = 320

export function AnalisiSerpVisual({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 1709 990"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('bg-mist-50', className)}
      role="img"
      aria-label="Verbalist analizza le top 10 di Google estraendo titoli, headings, entità, domande e schema"
      {...props}
    >
      <text
        x={140}
        y={170}
        className="fill-mist-950 font-display"
        fontSize={64}
        fontWeight={500}
        letterSpacing="-1.8"
      >
        Top 10 SERP
      </text>
      <text
        x={140}
        y={222}
        className="fill-mist-700 font-sans"
        fontSize={30}
        fontWeight={400}
      >
        5 dimensioni estratte
      </text>

      {FILLED_PER_ROW.map((fillCount, rowIdx) =>
        Array.from({ length: COLS }, (_, colIdx) => {
          const filled = colIdx < fillCount
          return (
            <circle
              key={`r${rowIdx}c${colIdx}`}
              cx={START_X + colIdx * SPACING_X}
              cy={START_Y + rowIdx * SPACING_Y}
              r={RADIUS}
              className={
                filled
                  ? 'fill-mist-900'
                  : 'fill-mist-950/2.5'
              }
            />
          )
        }),
      )}

      {ROW_PERCENTS.map((p, rowIdx) => (
        <text
          key={p}
          x={1569}
          y={START_Y + rowIdx * SPACING_Y + 14}
          textAnchor="end"
          className="fill-mist-700 font-sans"
          fontSize={38}
          fontWeight={500}
          letterSpacing="-0.6"
        >
          {p}
        </text>
      ))}

      <text
        x={140}
        y={900}
        className="fill-mist-950 font-sans"
        fontSize={28}
        fontWeight={500}
      >
        Pagine analizzate
      </text>
      <text
        x={854}
        y={900}
        textAnchor="middle"
        className="fill-mist-950 font-sans"
        fontSize={28}
        fontWeight={500}
      >
        Argomenti
      </text>
      <text
        x={1569}
        y={900}
        textAnchor="end"
        className="fill-mist-950 font-sans"
        fontSize={28}
        fontWeight={500}
      >
        Domande coperte
      </text>
    </svg>
  )
}
