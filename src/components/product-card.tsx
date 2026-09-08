import Link from "next/link";
import { Product } from "@/lib/products/types";
import { ProductSleeve } from "./product-sleeve";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <ProductSleeve
        title={product.title}
        accent={product.accent}
        category={product.category}
        image={product.image}
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-base font-semibold text-bone group-hover:text-crema">
            {product.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-bone-dim">
            {product.tagline}
          </p>
        </div>
        <span className="whitespace-nowrap font-mono text-sm text-crema">
          {formatMoney(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode
          )}
        </span>
      </div>
    </Link>
  );
}
