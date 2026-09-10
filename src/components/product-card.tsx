import Link from "next/link";
import { Product } from "@/lib/products/types";
import { ProductSleeve } from "./product-sleeve";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const buyVariant = product.variants.find((v) =>
    v.selectedOptions.some((o) => o.name === "Type" && o.value === "Buy")
  );
  const rentVariant = product.variants.find((v) =>
    v.selectedOptions.some((o) => o.name === "Type" && o.value === "Rent")
  );

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
        {product.category === "equipment" && buyVariant ? (
          <div className="whitespace-nowrap text-right">
            <span className="block font-mono text-sm text-crema">
              {formatMoney(buyVariant.price.amount, buyVariant.price.currencyCode)}
            </span>
            {rentVariant && (
              <span className="block font-mono text-[11px] text-bone-dim">
                or {formatMoney(rentVariant.price.amount, rentVariant.price.currencyCode)}/mo
              </span>
            )}
          </div>
        ) : (
          <span className="whitespace-nowrap font-mono text-sm text-crema">
            {formatMoney(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            )}
          </span>
        )}
      </div>
    </Link>
  );
}
