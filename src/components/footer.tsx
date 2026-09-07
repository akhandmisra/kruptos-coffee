import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-wide text-bone">
              KRUPTOS
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm text-bone-dim">
              Chhattisgarh&apos;s first specialty coffee roastery. Every roast
              ships with a QR code to the playlist we roasted it to.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
              Shop
            </p>
            <ul className="mt-3 space-y-2 font-sans text-sm text-bone-dim">
              <li>
                <Link href="/shop" className="hover:text-bone">
                  All roasts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=merch" className="hover:text-bone">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-bone">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
              Studio
            </p>
            <ul className="mt-3 space-y-2 font-sans text-sm text-bone-dim">
              <li>
                <Link href="/about" className="hover:text-bone">
                  The Genesis
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bone">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-bone/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kruptos Coffee Roasters</span>
          <span>Chhattisgarh, India</span>
        </div>
      </div>
    </footer>
  );
}
