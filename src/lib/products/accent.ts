// Deterministic fallback accent colors for live Shopify products, in case
// the store hasn't set an "accent" metafield. Cycles through the brand's
// signature palette so cards stay visually distinct.
const ACCENT_CYCLE = [
  "#B4472B",
  "#5C6B4F",
  "#C9A227",
  "#8A6FB0",
  "#1F1B18",
  "#D98C3C",
  "#9C6B3F",
  "#3E6259",
  "#4B5563",
  "#2B2B2B",
  "#8C7A5C",
];

export function accentFor(handle: string) {
  let hash = 0;
  for (let i = 0; i < handle.length; i++)
    hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  return ACCENT_CYCLE[hash % ACCENT_CYCLE.length];
}
