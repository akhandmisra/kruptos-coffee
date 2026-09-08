/**
 * Minimal Shopify Storefront API client.
 *
 * This app runs in two modes:
 *  - DEMO MODE (default): no Shopify credentials set, all product/cart data
 *    comes from src/lib/products/demo-data.ts so the site is fully browsable
 *    before a Shopify store exists.
 *  - LIVE MODE: once SHOPIFY_STORE_DOMAIN and
 *    SHOPIFY_STOREFRONT_ACCESS_TOKEN are set (see .env.local.example),
 *    every product/cart call below hits the real Shopify Storefront API.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
const apiVersion = "2025-01";

export const isShopifyConfigured = Boolean(domain && token);

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local."
    );
  }

  const res = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token as string,
      },
      body: JSON.stringify({ query, variables }),
      cache,
    }
  );

  if (!res.ok) {
    const text = await res.text();
      throw new Error(`Shopify Storefront API error (${res.status}): ${text} [debug] domain="${domain}" tokenLength=${token?.length ?? 0} tokenStart="${token?.slice(0, 6)}"`);

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      `Shopify Storefront API returned errors: ${JSON.stringify(json.errors)}`
    );
  }

  return json.data as T;
}
