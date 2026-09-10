"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products/types";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";

export function AddToCart({ product }: { product: Product }) {
  const { addItem, isLoading } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      initial[option.name] = option.values[0];
    }
    return initial;
  });
  const [added, setAdded] = useState(false);

  const variant = useMemo(() => {
    return product.variants.find((v) =>
      v.selectedOptions.every((opt) => selected[opt.name] === opt.value)
    );
  }, [product.variants, selected]);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-6">
      {product.options.map((option) => (
        <div key={option.name}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
            {option.name}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isActive = selected[option.name] === value;
              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [option.name]: value }))
                  }
                  className={`rounded-full border px-4 py-1.5 font-sans text-sm transition-colors ${
                    isActive
                      ? "border-crema bg-crema text-ink"
                      : "border-bone/25 text-bone-dim hover:border-bone/60 hover:text-bone"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <span className="font-mono text-xl text-bone">
          {variant ? (
            <>
              {formatMoney(variant.price.amount, variant.price.currencyCode)}
              {variant.rentalPeriod && (
                <span className="text-sm text-bone-dim">
                  /{variant.rentalPeriod}
                </span>
              )}
            </>
          ) : (
            "—"
          )}
        </span>
        <button
          onClick={handleAdd}
          disabled={!variant || !variant.availableForSale || isLoading}
          className="flex-1 rounded-full bg-crema py-3 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {!variant || !variant.availableForSale
            ? "Sold out"
            : added
            ? "Added"
            : "Add to crate"}
        </button>
      </div>
      {variant?.rentalDeposit && (
        <p className="font-mono text-xs text-bone-dim">
          + {formatMoney(variant.rentalDeposit.amount, variant.rentalDeposit.currencyCode)}{" "}
          refundable deposit, collected at pickup and returned when the
          equipment comes back in working order.
        </p>
      )}
    </div>
  );
}
