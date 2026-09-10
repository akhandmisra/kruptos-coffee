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

function mapShopifyProduct(node: ShopifyProductNode): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    tagline: node.description.split("\n")[0]?.slice(0, 120) ?? "",
    description: node.description,
    specs: {
      origin: node.tags.find((t) => t.startsWith("origin:"))?.split(":")[1] ?? "—",
      process: node.tags.find((t) => t.startsWith("process:"))?.split(":")[1] ?? "—",
      roast: node.tags.find((t) => t.startsWith("roast:"))?.split(":")[1] ?? "—",
      notes: node.tags.find((t) => t.startsWith("notes:"))?.split(":")[1] ?? "—",
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
