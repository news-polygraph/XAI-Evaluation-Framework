export function xaiHighlight(content: string | string[]): string {
  const str = Array.isArray(content) ? content.join(' ') : content;
  return str
    .replace(/<mark>/g, '<span class="xai-highlight">')
    .replace(/<\/mark>/g, '</span>')
    .replace(/<sentiment>/g, '<span class="sentiment-highlight">')
    .replace(/<\/sentiment>/g, '</span>');
}
export function getHighlightedSentences(highlightedContent: string | string[]): string[] {
  const items = Array.isArray(highlightedContent)
    ? highlightedContent
    : highlightedContent.match(/<mark>(.+?)<\/mark>/g) ?? [];

  return items
    .filter((s) => /<mark>/.test(s))
    .map((s) =>
      s
        .replace(/<mark>/g, '<span class="xai-highlight">')
        .replace(/<\/mark>/g, '</span>')
        .replace(/<sentiment>/g, '<span class="sentiment-highlight">')
        .replace(/<\/sentiment>/g, '</span>')
    );
}

export function buildHighlightMap(highlightedContent: string[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of highlightedContent) {
    const plain = entry
      .replace(/<\/?mark>/g, '')
      .replace(/<\/?sentiment>/g, '')
      .trim();
    map.set(plain, entry);
  }
  return map;
}