import { notFound } from "next/navigation";
import { getAllProducts, getProduct } from "@/lib/products";
import { ProductSleeve } from "@/components/product-sleeve";
import { AddToCart } from "@/components/add-to-cart";
import { getVerifiedMember, isRentalEnabled } from "@/lib/membership/session";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = await getProduct(handle);
  return { title: product ? `${product.title} — Kruptos Coffee` : "Not found" };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  // rentalEnabled doubles as the general "1DM membership program is live"
  // flag — it gates the Rent option (equipment only) AND the 10% member
  // discount (every category), so verification status is needed everywhere,
  // not just on equipment pages.
  const rentalEnabled = isRentalEnabled();
  const verifiedMember = rentalEnabled ? await getVerifiedMember() : null;

  const specEntries =
    product.category === "coffee"
      ? [
          ["Origin", product.specs.origin],
          ["Process", product.specs.process],
          ["Roast", product.specs.roast],
          ["Tasting Notes", product.specs.notes],
        ]
      : product.category === "equipment"
      ? [
          ["Material", product.specs.origin],
          ["Compatible Brew", product.specs.process],
          ["Capacity", product.specs.roast],
          ["Care", product.specs.notes],
        ]
      : [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-12 sm:grid-cols-2">
        <div className="sm:sticky sm:top-24 sm:self-start">
          <ProductSleeve
            title={product.title}
            accent={product.accent}
            category={product.category}
            image={product.image}
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
            {product.category === "coffee"
              ? "Now Playing"
              : product.category === "equipment"
              ? "Equipment & Tools"
              : "Merch"}
          </p>
          <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">
            {product.title}
          </h1>
          <p className="mt-3 font-sans text-base text-bone-dim">
            {product.tagline}
          </p>

          <div className="mt-8 space-y-2 whitespace-pre-line font-sans text-sm leading-relaxed text-bone-dim">
            {product.description}
          </div>

          {specEntries.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-bone/10 py-6 font-mono text-xs">
              {specEntries.map(([label, value]) => (
                <div key={label}>
                  <dt className="uppercase tracking-[0.2em] text-slate">
                    {label}
                  </dt>
                  <dd className="mt-1 text-bone">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8">
            <AddToCart
              product={product}
              rentalEnabled={rentalEnabled}
              initialVerifiedMemberName={verifiedMember?.name ?? null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
