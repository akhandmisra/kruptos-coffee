"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=equipment", label: "Equipment" },
  { href: "/about", label: "The Genesis" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide text-bone sm:text-3xl">
            KRUPTOS
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-crema sm:inline">
            Coffee Roasters
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-crema"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          aria-label="Open cart"
          className="group relative flex items-center gap-2 rounded-full border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-crema hover:text-crema"
        >
          Cart
          {itemCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crema font-mono text-[11px] font-bold text-ink">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <nav className="flex items-center gap-6 overflow-x-auto border-t border-bone/10 px-5 py-2 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
