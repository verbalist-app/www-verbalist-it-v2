import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const sx = (x: number) => (x * 1709) / 699
const sy = (y: number) => (y * 990) / 441

const PILL_W = sx(33.9137)
const PILL_RX = sx(16.9569)
const BOTTOM_Y = sy(348.5577)
const ACTIVE_INDEX = 3

const TRACKS: Array<{ x: number; topBg: number; topDark: number }> = [
  { x: 37.6816, topBg: 154.496, topDark: 216.671 },
  { x: 101.741, topBg: 139.423, topDark: 250.585 },
  { x: 165.801, topBg: 184.641, topDark: 231.744 },
  { x: 229.859, topBg: 126.234, topDark: 192.178 },
  { x: 293.919, topBg: 154.496, topDark: 278.846 },
  { x: 357.979, topBg: 139.423, topDark: 237.396 },
  { x: 422.038, topBg: 154.496, topDark: 252.469 },
  { x: 486.097, topBg: 131.887, topDark: 222.323 },
  { x: 550.156, topBg: 184.641, topDark: 275.078 },
  { x: 614.216, topBg: 131.887, topDark: 237.396 },
]

const DOT_LINE_Y = sy(197.83)
const DOT_R = sx(3.76819)
const DOT_X_START = sx(41.4498)
const DOT_X_STEP = sx(22.609)
const DOT_COUNT = 29

const NUMBER_LABELS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'] as const

export function GenerazioneContenutiVisual({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 1709 990"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('bg-mist-50', className)}
      role="img"
      aria-label="Verbalist genera contenuti regolando i parametri di tono, lunghezza e struttura"
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
        Tone of voice
      </text>
      <text
        x={140}
        y={222}
        className="fill-mist-700 font-sans"
        fontSize={30}
        fontWeight={400}
      >
        10 parametri regolabili
      </text>

      {TRACKS.map((t, i) => {
        const isActive = i === ACTIVE_INDEX
        const x = sx(t.x)
        const bgY = sy(t.topBg)
        const darkY = sy(t.topDark)
        return (
          <g key={`track-${i}`}>
            <rect
              x={x}
              y={bgY}
              width={PILL_W}
              height={BOTTOM_Y - bgY}
              rx={PILL_RX}
              className="fill-mist-950/2.5"
            />
            <rect
              x={x}
              y={darkY}
              width={PILL_W}
              height={BOTTOM_Y - darkY}
              rx={PILL_RX}
              className={
                isActive ? 'fill-mist-950' : 'fill-mist-900'
              }
            />
          </g>
        )
      })}

      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <circle
          key={`dot-${i}`}
          cx={DOT_X_START + i * DOT_X_STEP}
          cy={DOT_LINE_Y}
          r={DOT_R}
          className="fill-mist-950/15"
        />
      ))}

      {(() => {
        const tag = TRACKS[ACTIVE_INDEX]
        const tagW = sx(155)
        const tagH = sy(34.5364)
        const tagX = sx(tag.x) + PILL_W / 2 - tagW / 2
        const tagY = sy(175.852)
        return (
          <g>
            <rect
              x={tagX}
              y={tagY}
              width={tagW}
              height={tagH}
              rx={tagH / 2}
              className="fill-mist-950"
            />
            <text
              x={tagX + tagW / 2}
              y={tagY + tagH / 2 + sy(7)}
              textAnchor="middle"
              className="fill-white font-sans"
              fontSize={32}
              fontWeight={500}
              letterSpacing="-0.4"
            >
              1.2k parole
            </text>
          </g>
        )
      })()}

      {NUMBER_LABELS.map((label, i) => (
        <text
          key={label}
          x={sx(TRACKS[i].x) + PILL_W / 2}
          y={sy(379.515)}
          textAnchor="middle"
          className="fill-mist-700 font-sans"
          fontSize={28}
          fontWeight={500}
          letterSpacing="-0.4"
        >
          {label}
        </text>
      ))}

      <text
        x={1569}
        y={900}
        textAnchor="end"
        className="fill-mist-700 font-sans"
        fontSize={28}
        fontWeight={400}
      >
        Brand voice attiva
      </text>
    </svg>
  )
}
