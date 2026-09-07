"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";
import { useState } from "react";

export default function CartPage() {
  const {
    lines,
    subtotal,
    currencyCode,
    updateQuantity,
    removeItem,
    liveMode,
    checkoutUrl,
  } = useCart();
  const [showNotice, setShowNotice] = useState(false);

  const handleCheckout = () => {
    if (liveMode && checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      setShowNotice(true);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-5xl text-bone sm:text-6xl">
        Your Crate
      </h1>

      {lines.length === 0 ? (
        <div className="mt-10">
          <p className="font-sans text-sm text-bone-dim">
            Nothing in here yet.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-crema px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink hover:opacity-90"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <ul className="space-y-6 sm:col-span-2">
            {lines.map((line) => (
              <li
                key={line.id}
                className="flex gap-4 border-b border-bone/10 pb-6"
              >
                <div
                  className="h-20 w-20 shrink-0 rounded-sm"
                  style={{ background: line.accent }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-sans text-base font-semibold text-bone">
                        {line.title}
                      </p>
                      <p className="font-mono text-xs text-bone-dim">
                        {line.variantTitle}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-crema">
                      {formatMoney(
                        Number(line.price.amount) * line.quantity,
                        line.price.currencyCode
                      )}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-bone/20">
                      <button
                        onClick={() =>
                          line.quantity > 1
                            ? updateQuantity(line.id, line.quantity - 1)
                            : removeItem(line.id)
                        }
                        className="px-3 py-1.5 font-mono text-sm text-bone-dim hover:text-crema"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center font-mono text-sm">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="px-3 py-1.5 font-mono text-sm text-bone-dim hover:text-crema"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(line.id)}
                      className="font-mono text-xs uppercase tracking-[0.15em] text-bone-dim hover:text-rust"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-sm border border-bone/10 bg-ink-raised p-6">
            {showNotice && !liveMode && (
              <p className="mb-4 rounded-sm border border-crema/30 bg-crema/10 px-3 py-2 font-sans text-xs text-crema">
                Checkout isn&apos;t connected yet — this store is still in
                setup.
              </p>
            )}
            <div className="mb-4 flex items-center justify-between font-sans text-sm">
              <span className="text-bone-dim">Subtotal</span>
              <span className="font-mono text-base text-bone">
                {formatMoney(subtotal, currencyCode)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-crema py-3 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink hover:opacity-90"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
