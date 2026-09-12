import { isShopifyConfigured, shopifyFetch } from "@/lib/shopify/client";
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
} from "@/lib/shopify/queries";
import { demoProducts, getDemoProduct } from "./demo-data";
import { Product } from "./types";
import { accentFor } from "./accent";

export { isShopifyConfigured };
export type { Product };

// Shape returned by the Shopify Storefront API (see queries.ts fragment).
type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  priceRange: Product["priceRange"];
  featuredImage: { url: string; altText: string | null } | null;
  options: { name: string; values: string[] }[];
  variants: { nodes: Product["variants"] };
};

// Tags are matched case-insensitively (Shopify's tag box auto-capitalizes,
// e.g. "Origin:" instead of "origin:"), and the value is everything after
// the first colon (so values can safely contain their own colons).
function findTagValue(tags: string[], prefix: string): string | undefined {
  const match = tags.find((t) => t.toLowerCase().startsWith(prefix));
  if (!match) return undefined;
  const value = match.slice(match.indexOf(":") + 1).trim();
  return value.length > 0 ? value : undefined;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

// NOTE: this catalog's `descriptionHtml` field turned out to be unreliable
// (some products have it double HTML-entity-escaped from however they were
// created), so paragraphs are derived from the plain `description` field
// instead. Shopify's plain-text conversion strips <p> tags without
// inserting any separator, so two paragraphs can end up glued together as
// "...detail.Next sentence..." with no space — that collapse always
// happens at a period immediately followed by a capital letter, so
// splitting there safely restores real paragraph breaks (joined with
// \n\n, matching demo-data.ts's convention) instead of the description
// rendering, and the auto-derived tagline duplicating, one run-on blob.
function splitIntoParagraphs(text: string): string[] {
  const decoded = decodeHtmlEntities(text).replace(/\.{2,}/g, ".");
  return decoded
    .split(/\n+/)
    .flatMap((chunk) => chunk.split(/(?<=\.)(?=[A-Z])/))
    .map((p) => p.trim())
    .filter(Boolean);
}

function firstSentence(text: string, maxLen = 140): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  const sentence = match ? match[0] : text;
  return sentence.length > maxLen
    ? `${sentence.slice(0, maxLen - 1).trimEnd()}…`
    : sentence;
}

function mapShopifyProduct(node: ShopifyProductNode): Product {
  const paragraphs = splitIntoParagraphs(node.description);
  const description = paragraphs.length
    ? paragraphs.join("\n\n")
    : node.description;
  const tagline = paragraphs.length
    ? firstSentence(paragraphs[0])
    : node.description.split("\n")[0]?.slice(0, 120) ?? "";

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    tagline,
    description,
    specs: {
      origin: findTagValue(node.tags, "origin:") ?? "—",
      process: findTagValue(node.tags, "process:") ?? "—",
      roast: findTagValue(node.tags, "roast:") ?? "—",
      notes: findTagValue(node.tags, "notes:") ?? "—",
    },
    accent: accentFor(node.handle),
    image: node.featuredImage
      ? { url: node.featuredImage.url, alt: node.featuredImage.altText ?? node.title }
      : null,
    category: node.tags.includes("equipment")
      ? "equipment"
      : node.tags.includes("merch")
      ? "merch"
      : "coffee",
    priceRange: node.priceRange,
    options: node.options,
    variants: node.variants.nodes,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isShopifyConfigured) return demoProducts;

  const data = await shopifyFetch<{
    products: { nodes: ShopifyProductNode[] };
  }>({ query: GET_ALL_PRODUCTS_QUERY });

  return data.products.nodes.map(mapShopifyProduct);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return getDemoProduct(handle);

  const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  return data.product ? mapShopifyProduct(data.product) : undefined;
}
