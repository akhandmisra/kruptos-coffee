import { Product } from "@/lib/products/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="font-sans text-sm text-bone-dim">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
