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

function mapShopifyProduct(node: ShopifyProductNode): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    tagline: node.description.split("\n")[0]?.slice(0, 120) ?? "",
    description: node.description,
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
    category: node.tags.includes("merch") ? "merch" : "coffee",
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
