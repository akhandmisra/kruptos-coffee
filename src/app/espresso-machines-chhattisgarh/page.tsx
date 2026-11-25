import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/products/types";
import { ProductGrid } from "@/components/product-grid";
import { LeadForm } from "@/components/lead-form";
import { BREWING_GADGETS_URL, contact, siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "Espresso & Commercial Coffee Machines in Chhattisgarh — Buy or Rent | Raipur, Bhilai, Bilaspur",
  description:
    "Buy or rent high-end espresso machines and commercial coffee grinders in Raipur, Bhilai and Bilaspur. Mahlkönig, Meraki, DF64, Fellow in stock; La Marzocco, Victoria Arduino, Nuova Simonelli, Eureka and Acaia to order through our Brewing Gadgets dealership. Installation, barista training and support in Chhattisgarh.",
  alternates: { canonical: "/espresso-machines-chhattisgarh" },
};

// Machines and grinders we stock (pulled live from the shop) — matched by handle.
const HIGH_END_HANDLES = [
  "meraki-espresso-machine",
  "mahlkonig-x64-sd",
  "mahlkonig-x54-grinder",
  "df64-gen-2-grinder",
  "fellow-ode-brew-grinder-gen-2",
  "xbloom-studio-brewer",
  "baratza-encore-esp",
];

// Premium brands available to order through Kruptos's Brewing Gadgets dealership.
const toOrder = [
  { name: "La Marzocco", what: "Commercial and home espresso machines — the Linea, GS3 and Micra families." },
  { name: "Victoria Arduino", what: "Commercial espresso machines built for high-volume specialty cafes." },
  { name: "Nuova Simonelli", what: "Reliable commercial espresso machines for cafes, hotels and restaurants." },
  { name: "Eureka", what: "On-demand espresso grinders for cafes and home bars." },
  { name: "Mahlkönig", what: "The full range of commercial espresso and filter grinders." },
  { name: "Acaia", what: "Brewing and espresso scales used on specialty bars." },
];

const setups = [
  {
    t: "Home espresso bar",
    d: "A dual-boiler espresso machine with a single-dose grinder — cafe-quality espresso and milk drinks at home. Rent first if you're unsure.",
  },
  {
    t: "Office (20–60 cups a day)",
    d: "A prosumer or single-group commercial machine with an on-demand grinder, plus a regular delivery of fresh beans.",
  },
  {
    t: "Cafe or restaurant",
    d: "A two- or three-group commercial espresso machine, a commercial on-demand grinder for espresso and one for filter — installed, dialled in and with your team trained.",
  },
  {
    t: "Hotel & high-volume",
    d: "Commercial machines sized for breakfast rushes and banquets, with a service plan and barista training for staff.",
  },
];

const faqs = [
  {
    q: "Where can I buy an espresso machine in Raipur or Chhattisgarh?",
    a: "Kruptos Coffee Roasters, the roastery behind 1DM's cafes, supplies home and commercial espresso machines and grinders in Raipur, Bhilai and Bilaspur — some in stock, and premium brands like La Marzocco, Victoria Arduino and Nuova Simonelli to order through our Brewing Gadgets dealership.",
  },
  {
    q: "Can I rent an espresso machine instead of buying?",
    a: "Yes. Machines and grinders in our range can be rented monthly — our espresso machine rents for about ₹7,000 a month — and you can buy later.",
  },
  {
    q: "Which espresso machine should a new cafe buy?",
    a: "It depends on your cups per day and menu. Most new specialty cafes do well with a two-group commercial machine and two grinders (espresso and filter). Tell us your expected volume and we'll recommend a setup and quote.",
  },
  {
    q: "Do you install the machine and train staff?",
    a: "Yes. We install, dial in the recipe with fresh coffee, and train your baristas — the same way we set up the bars at 1DM's cafes across Chhattisgarh.",
  },
  {
    q: "How long does it take to get a La Marzocco or Victoria Arduino machine?",
    a: "Premium commercial machines are ordered for you. Ask us for current price and lead time for the model you want.",
  },
];

export default async function EspressoMachinesPage() {
  let machines: Product[] = [];
  try {
    const all = await getAllProducts();
    machines = HIGH_END_HANDLES.map((h) => all.find((p) => p.handle === h)).filter((p): p is Product => Boolean(p));
  } catch {
    // Product source briefly unreachable — the rest of the page still renders.
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Espresso and commercial coffee machine supply and rental",
    alternateName: ["Espresso machine supplier Chhattisgarh", "Commercial coffee machine Raipur", "Coffee machine on rent Chhattisgarh"],
    serviceType: "Espresso machine and coffee grinder sales, rental, installation and training",
    provider: { "@id": `${siteUrl}/#organization` },
    brand: ["La Marzocco", "Victoria Arduino", "Nuova Simonelli", "Eureka", "Mahlkönig", "Acaia", "Meraki", "DF64", "Fellow"].map(
      (name) => ({ "@type": "Brand", name })
    ),
    areaServed: [
      { "@type": "City", name: "Raipur" },
      { "@type": "City", name: "Bhilai" },
      { "@type": "City", name: "Bilaspur" },
      { "@type": "City", name: "Durg" },
      { "@type": "City", name: "Jagdalpur" },
      { "@type": "State", name: "Chhattisgarh" },
    ],
    url: `${siteUrl}/espresso-machines-chhattisgarh`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Buy · Rent · Install · Train</p>
      <h1 className="mt-2 max-w-4xl font-display text-5xl text-bone sm:text-6xl">
        Espresso &amp; commercial coffee machines in Chhattisgarh.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        High-end espresso machines and grinders for homes, offices, cafes and hotels in Raipur, Bhilai, Bilaspur and across
        the state — bought outright or{" "}
        <Link href="/coffee-machine-rental" className="text-crema underline">
          rented monthly
        </Link>
        , installed and dialled in by the coffee team behind 1DM&apos;s cafes.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.whatsappHref("Hi, I'm looking for an espresso machine.")}
          className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
        >
          WhatsApp us
        </a>
        <a href="#quote" className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          Get a quote
        </a>
      </div>

      {machines.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl text-bone">In stock — buy or rent</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm text-bone-dim">
            Espresso machines, commercial grinders and automated brewers we hold in Chhattisgarh. Monthly rent is shown
            where available.
          </p>
          <div className="mt-8">
            <ProductGrid products={machines} />
          </div>
        </section>
      )}

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">Premium brands to order</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-bone-dim">
          As the authorised{" "}
          <Link href="/brewing-gadgets-dealer-chhattisgarh" className="text-crema underline">
            Brewing Gadgets dealer in Chhattisgarh
          </Link>
          , we can order high-end machines from the{" "}
          <a href={BREWING_GADGETS_URL} target="_blank" rel="noopener" className="text-crema underline">
            Brewing Gadgets
          </a>{" "}
          range for you — ask for price and lead time.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toOrder.map((b) => (
            <div key={b.name} className="rounded-sm border border-bone/10 p-5">
              <h3 className="font-display text-xl text-bone">{b.name}</h3>
              <p className="mt-1 font-sans text-sm leading-relaxed text-bone-dim">{b.what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">Which machine do you need?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {setups.map((s) => (
            <div key={s.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
              <h3 className="font-display text-2xl text-bone">{s.t}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-4xl text-bone">Get a machine quote</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
            Tell us where the machine is going and roughly how many cups a day. We&apos;ll recommend a setup — buy or rent
            — with prices, usually the same day. Or call{" "}
            <a href={contact.phoneHref} className="text-crema underline">
              {contact.phone}
            </a>
            .
          </p>
          <p className="mt-4 font-sans text-sm text-bone-dim">
            See all{" "}
            <Link href="/coffee-equipment-supplier" className="text-crema underline">
              coffee equipment we supply
            </Link>{" "}
            and{" "}
            <Link href="/wholesale" className="text-crema underline">
              wholesale coffee for cafes
            </Link>
            .
          </p>
        </div>
        <LeadForm
          interests={[
            "Espresso machine for home",
            "Espresso machine for office",
            "Commercial machine for cafe / restaurant",
            "Commercial machine for hotel",
            "Rent an espresso machine",
            "La Marzocco / Victoria Arduino / premium order",
          ]}
          source="kruptoscoffee.com/espresso-machines-chhattisgarh"
        />
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="font-display text-4xl text-bone">Questions</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-sans text-lg font-semibold text-bone">{f.q}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
