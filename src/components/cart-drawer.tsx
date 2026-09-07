"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    currencyCode,
    updateQuantity,
    removeItem,
    liveMode,
    checkoutUrl,
  } = useCart();
  const [showNotice, setShowNotice] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (liveMode && checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      setShowNotice(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-ink-raised">
        <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
          <h2 className="font-display text-2xl tracking-wide">Your Crate</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="font-sans text-sm text-bone-dim">
              Your crate is empty. Go find something worth playing.
            </p>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div
                    className="h-16 w-16 shrink-0 rounded-sm"
                    style={{ background: line.accent }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-sans text-sm font-semibold text-bone">
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
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-bone/20">
                        <button
                          onClick={() =>
                            line.quantity > 1
                              ? updateQuantity(line.id, line.quantity - 1)
                              : removeItem(line.id)
                          }
                          className="px-2.5 py-1 font-mono text-sm text-bone-dim hover:text-crema"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center font-mono text-sm">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="px-2.5 py-1 font-mono text-sm text-bone-dim hover:text-crema"
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
          )}
        </div>

        <div className="border-t border-bone/10 px-6 py-5">
          {showNotice && !liveMode && (
            <p className="mb-4 rounded-sm border border-crema/30 bg-crema/10 px-3 py-2 font-sans text-xs text-crema">
              Checkout isn&apos;t connected yet — this store is still in
              setup. Once Shopify + payments are live, this button will take
              you straight to checkout.
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
            disabled={lines.length === 0}
            className="w-full rounded-full bg-crema py-3 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Checkout
          </button>
          <Link
            href="/cart"
            onClick={closeCart}
            className="mt-3 block text-center font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema"
          >
            View full cart
          </Link>
        </div>
      </div>
    </div>
  );
}
