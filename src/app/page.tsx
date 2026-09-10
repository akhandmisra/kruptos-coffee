import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.category === "coffee").slice(0, 3);
  const gear = products.filter((p) => p.category === "equipment").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-bone/10">
        <div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/estate-poster.jpg"
          >
            <source src="/videos/estate.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="animate-in font-mono text-xs uppercase tracking-[0.3em] text-crema">
            Chhattisgarh&apos;s First Specialty Roastery
          </p>
          <h1
            className="animate-in mt-4 font-display text-6xl leading-[0.85] text-bone sm:text-8xl md:text-9xl"
            style={{ animationDelay: "80ms" }}
          >
            COFFEE,
            <br />
            PRESSED LIKE
            <br />
            A RECORD.
          </h1>
          <p
            className="animate-in mt-6 max-w-lg font-sans text-base text-bone-dim sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Every Kruptos roast ships with a QR code straight to the playlist
            we roasted it to. Micro-lots sourced direct from planters across
            India and beyond, fully traceable, hand-processed, hand-roasted.
          </p>
          <div
            className="animate-in mt-8 flex flex-wrap gap-4"
            style={{ animationDelay: "220ms" }}
          >
            <Link
              href="/shop"
              className="rounded-full bg-crema px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink hover:opacity-90"
            >
              Shop the roasts
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-bone/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-bone hover:border-crema hover:text-crema"
            >
              The Genesis
            </Link>
          </div>
        </div>
      </section>

      {/* Featured roasts */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
              The Debut Drops
            </p>
            <h2 className="mt-2 font-display text-4xl text-bone sm:text-5xl">
              Now Playing
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema sm:block"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Pairing note */}
      <section className="border-y border-bone/10 bg-ink-raised">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
              Side A / Side B
            </p>
            <h2 className="mt-2 font-display text-4xl text-bone sm:text-5xl">
              A playlist in every bag.
            </h2>
          </div>
          <p className="self-center font-sans text-base text-bone-dim sm:text-lg">
            Five years of R&amp;D, direct training with the Coffee Board of
            India, and a habit of pairing every roast profile with the music
            we drank it to while dialling it in. Scan the code on the bag,
            press play, brew.
          </p>
        </div>
      </section>

      {/* Equipment & Tools */}
      {gear.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
                Buy Or Rent
              </p>
              <h2 className="mt-2 font-display text-4xl text-bone sm:text-5xl">
                Equipment &amp; Tools
              </h2>
              <p className="mt-3 max-w-md font-sans text-sm text-bone-dim">
                Everything to brew like the bar does — own it outright, or
                rent it monthly with a refundable deposit while you figure
                out what you like.
              </p>
            </div>
            <Link
              href="/shop?category=equipment"
              className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema sm:block"
            >
              View all →
            </Link>
          </div>
          <ProductGrid products={gear} />
        </section>
      )}

      {/* Visit */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="rounded-sm border border-bone/10 bg-ink-raised p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
            Also Available At
          </p>
          <h2 className="mt-2 font-display text-3xl text-bone sm:text-4xl">
            10+ 1DollarCoffee outlets, across multiple cities.
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm text-bone-dim">
            Can&apos;t wait for shipping? Kruptos roasts are already pouring
            at select 1DollarCoffee locations.
          </p>
        </div>
      </section>
    </div>
  );
}
