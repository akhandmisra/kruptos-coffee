"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products/types";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";
import { MembershipVerifyPanel } from "@/components/membership-verify-panel";

export function AddToCart({
  product,
  rentalEnabled = false,
  initialVerifiedMemberName = null,
}: {
  product: Product;
  /** Master kill-switch for the whole rental feature — see src/lib/membership/session.ts. */
  rentalEnabled?: boolean;
  /** Set server-side from the "kruptos_member" cookie — see the product page. */
  initialVerifiedMemberName?: string | null;
}) {
  const { addItem, isLoading } = useCart();
  const [verifiedMemberName, setVerifiedMemberName] = useState(initialVerifiedMemberName);
  const isRentable = product.category === "equipment" && rentalEnabled;
  const canRent = isRentable && verifiedMemberName !== null;

  // Non-members never see "Rent" as an option at all — only Buy. Coffee and
  // merch products are unaffected (they don't have a Type option to begin with).
  const visibleOptions = useMemo(() => {
    return product.options.map((option) => {
      if (option.name !== "Type" || product.category !== "equipment") return option;
      return {
        ...option,
        values: canRent ? option.values : option.values.filter((v) => v !== "Rent"),
      };
    });
  }, [product.options, product.category, canRent]);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of visibleOptions) {
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

  async function handleLogout() {
    await fetch("/api/membership/logout", { method: "POST" });
    setVerifiedMemberName(null);
    setSelected((prev) => (prev["Type"] === "Rent" ? { ...prev, Type: "Buy" } : prev));
  }

  return (
    <div className="space-y-6">
      {visibleOptions.map((option) => (
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

      {isRentable && (
        <div>
          {canRent ? (
            <p className="font-sans text-xs text-bone-dim">
              Verified 1DM member ({verifiedMemberName}) — rental available, no
              deposit.{" "}
              <button
                onClick={handleLogout}
                className="underline decoration-dotted underline-offset-4"
              >
                Not you?
              </button>
            </p>
          ) : (
            <MembershipVerifyPanel onVerified={(name) => setVerifiedMemberName(name)} />
          )}
        </div>
      )}

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
      {/* Deposits no longer apply under the member-gated rental model — see
          claude/kruptos-coffee-status.md. Verified members rent with no
          deposit, and non-members never reach a Rent option at all. */}
    </div>
  );
}
