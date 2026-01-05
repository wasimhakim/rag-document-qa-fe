export function normalizeMarkdown(text: string): string {
  if (!text) return ''

  return text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '  ')
    .replace(/\r\n/g, '\n')
    .trim()
}
