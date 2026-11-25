import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { journalArticles } from "@/lib/journal";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/shop", "/wholesale", "/coffee-machine-rental", "/coffee-equipment-supplier", "/coffee-beans-raipur", "/brewing-gadgets-dealer-chhattisgarh", "/espresso-machines-chhattisgarh", "/custom-coffee-roasting", "/journal", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((p) => ({ url: `${siteUrl}/products/${p.handle}`, lastModified: new Date() }));
  } catch {
    // If the product source is briefly unreachable, still serve the static routes.
  }

  const journalRoutes = journalArticles.map((a) => ({
    url: `${siteUrl}/journal/${a.slug}`,
    lastModified: a.publishedAt,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
