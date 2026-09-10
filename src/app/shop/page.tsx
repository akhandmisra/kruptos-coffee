import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import Link from "next/link";

export const metadata = { title: "Shop — Kruptos Coffee Roasters" };

export default async function ShopPage({
  searchParams,
}: PageProps<"/shop">) {
  const { category } = await searchParams;
  const products = await getAllProducts();
  const filtered =
    category === "merch"
      ? products.filter((p) => p.category === "merch")
      : category === "coffee"
      ? products.filter((p) => p.category === "coffee")
      : category === "equipment"
      ? products.filter((p) => p.category === "equipment")
      : products;

  const tabs = [
    { label: "All", value: undefined },
    { label: "Coffee", value: "coffee" },
    { label: "Equipment", value: "equipment" },
    { label: "Merch", value: "merch" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
        The Catalogue
      </p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">Shop</h1>

      <div className="mt-8 flex gap-3">
        {tabs.map((tab) => {
          const isActive = category === tab.value || (!category && !tab.value);
          const href = tab.value ? `/shop?category=${tab.value}` : "/shop";
          return (
            <Link
              key={tab.label}
              href={href}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] ${
                isActive
                  ? "border-crema bg-crema text-ink"
                  : "border-bone/20 text-bone-dim hover:border-bone/50 hover:text-bone"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
