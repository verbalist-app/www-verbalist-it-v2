function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function applyInline(text: string): string {
  let escaped = escapeHtml(text)
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  escaped = escaped.replace(/(^|\s)\*(?!\s)(.+?)(?<!\s)\*/g, "$1<em>$2</em>")
  escaped = escaped.replace(/`(.+?)`/g, "<code>$1</code>")
  return escaped
}

export function markdownToHtml(content: string): string {
  const lines = content.split("\n")
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i++
      continue
    }

    if (line.startsWith("### ")) {
      out.push(`<h3>${applyInline(line.slice(4))}</h3>`)
      i++
      continue
    }
    if (line.startsWith("## ")) {
      out.push(`<h2>${applyInline(line.slice(3))}</h2>`)
      i++
      continue
    }
    if (line.startsWith("# ")) {
      out.push(`<h1>${applyInline(line.slice(2))}</h1>`)
      i++
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(`<li>${applyInline(lines[i].slice(2))}</li>`)
        i++
      }
      out.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${applyInline(lines[i].replace(/^\d+\.\s/, ""))}</li>`)
        i++
      }
      out.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    out.push(`<p>${applyInline(line)}</p>`)
    i++
  }

  return out.join("\n")
}

export function markdownToPlainText(content: string): string {
  return content
    .split("\n")
    .map((line) =>
      line
        .replace(/^#{1,6}\s+/, "")
        .replace(/^\s*-\s+/, "• ")
        .replace(/^\s*\d+\.\s+/, (m) => m.trimStart())
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/(^|\s)\*(?!\s)(.+?)(?<!\s)\*/g, "$1$2")
        .replace(/`(.+?)`/g, "$1"),
    )
    .join("\n")
}

export function buildHtmlDocument(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(title)}</title>
</head>
<body>
${body}
</body>
</html>
`
}

export function downloadBlob(filename: string, content: string, mime: string) {
  if (typeof window === "undefined") return
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = window.document.createElement("a")
  link.href = url
  link.download = filename
  window.document.body.appendChild(link)
  link.click()
  window.document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
