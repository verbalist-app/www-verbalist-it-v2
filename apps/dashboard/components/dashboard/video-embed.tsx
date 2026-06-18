"use client"

import * as React from "react"
import { Play } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"

interface VideoEmbedProps {
  /**
   * Video source. Accepts:
   *  - YouTube `/embed/ID` (or youtube-nocookie), Vimeo player URL, Loom `/embed/ID`
   *  - a Google Drive share link (`/file/d/ID/view`) or `/preview` URL
   *  - a direct video file (.mp4/.webm/.ogg) served from /public
   * When omitted, renders a "coming soon" placeholder — used while the asset is pending.
   */
  src?: string
  /** Optional poster image shown before play (cleaner first paint, lighter load). */
  poster?: string
  /** Accessible title; also used as the iframe title. */
  title: string
  /** Label for the pending state (no `src` yet). */
  comingSoonLabel?: string
  className?: string
}

type Embed = { url: string; kind: "file" | "drive" | "iframe" }

function resolveEmbed(src: string): Embed {
  // Direct video file (self-hosted in /public).
  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(src)) return { url: src, kind: "file" }

  // Google Drive: accept any share link and normalize to the /preview embed URL.
  if (/drive\.google\.com/i.test(src)) {
    const id = src.match(/\/file\/d\/([^/]+)/)?.[1] ?? src.match(/[?&]id=([^&]+)/)?.[1]
    if (id) return { url: `https://drive.google.com/file/d/${id}/preview`, kind: "drive" }
  }

  // YouTube / Vimeo / Loom: autoplay on click (the iframe is only mounted after the
  // user presses play, so no third-party JS/cookies load until then). Drive ignores this.
  const sep = src.includes("?") ? "&" : "?"
  return { url: `${src}${sep}autoplay=1`, kind: "iframe" }
}

/**
 * Facade video embed: shows a poster (or muted backdrop) + play button and only
 * injects the <iframe>/<video> on click. Faster, and privacy-friendly by default.
 */
export function VideoEmbed({
  src,
  poster,
  title,
  comingSoonLabel = "Video in arrivo",
  className,
}: VideoEmbedProps) {
  const [playing, setPlaying] = React.useState(false)
  const embed = src ? resolveEmbed(src) : null

  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn("overflow-hidden rounded-lg border bg-muted", className)}
    >
      {!embed ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <Play className="size-6" />
          <span className="text-xs font-medium">{comingSoonLabel}</span>
        </div>
      ) : playing ? (
        embed.kind === "file" ? (
          <video src={embed.url} className="size-full" controls autoPlay playsInline />
        ) : (
          <iframe
            src={embed.url}
            title={title}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={title}
          className="group relative flex size-full items-center justify-center"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
          )}
          <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-border transition-transform group-hover:scale-105">
            <Play className="size-5 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </AspectRatio>
  )
}
