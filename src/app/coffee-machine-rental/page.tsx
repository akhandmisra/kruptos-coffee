import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/products/types";
import { ProductGrid } from "@/components/product-grid";
import { LeadForm } from "@/components/lead-form";
import { contact, siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "Coffee Machine on Rent in Raipur — Espresso Machines, Grinders & Brewers",
  description:
    "Rent a coffee machine in Raipur, Bhilai or Bilaspur from Kruptos Coffee Roasters and 1DM — espresso machines, grinders and brewers on monthly rent for home, office and cafe, set up and dialled in with fresh specialty coffee.",
  alternates: { canonical: "/coffee-machine-rental" },
};

const interests = [
  "Coffee machine on rent for home",
  "Coffee machine on rent for office",
  "Espresso machine on rent for my cafe / restaurant",
  "Coffee machine for an event",
  "Grinder or brewer on rent",
];

const uses = [
  {
    t: "For home",
    d: "Try an espresso machine or a good grinder for a few months before you spend lakhs on one. Rent from ₹120 a month for brewing gear.",
  },
  {
    t: "For offices",
    d: "A proper espresso machine and grinder for your team instead of instant-coffee vending, with fresh beans from our roastery delivered on a schedule.",
  },
  {
    t: "For cafes & restaurants",
    d: "Open or upgrade your coffee bar without the upfront cost of commercial equipment. We set the machine up, dial in your recipe and train your staff.",
  },
  {
    t: "For events",
    d: (
      <>
        For weddings, launches and corporate events we bring the machine with a 1DM barista — see{" "}
        <a href="https://www.1dm.coffee/coffee-catering" className="text-crema underline">
          coffee catering
        </a>
        .
      </>
    ),
  },
];

const steps = [
  { t: "Pick a machine", d: "Choose from the espresso machines, grinders and brewers below, or tell us what you need and we'll suggest one." },
  { t: "Try it", d: "1DM Elite members get a 3-day free trial before they commit." },
  { t: "We set it up", d: "Delivery, installation and a recipe dialled in on your machine with fresh Kruptos specialty coffee." },
  { t: "Rent monthly, buy later", d: "Keep it as long as you like. Elite members get 10% of every rent payment credited toward buying that machine." },
];

const faqs = [
  {
    q: "Where can I rent a coffee machine in Raipur?",
    a: "Kruptos Coffee Roasters and 1DM rent espresso machines, coffee grinders and brewers in Raipur, Bhilai and Bilaspur. Fill in the form on this page or WhatsApp +91 9179241042 and we'll confirm availability.",
  },
  {
    q: "How much does it cost to rent a coffee machine?",
    a: "Brewing equipment starts at ₹120 a month. Espresso machines and grinders are priced per machine — the monthly rent is shown on each product, or ask us on WhatsApp for a quote.",
  },
  {
    q: "Is there a deposit?",
    a: "Rentals normally carry a refundable deposit. 1DM Elite Club members rent with zero deposit and get a 3-day free trial.",
  },
  {
    q: "Can I rent an espresso machine for my office or cafe?",
    a: "Yes. We rent espresso machines and grinders to offices, co-working spaces, cafes and restaurants, and supply the coffee beans, recipe and staff training to go with them.",
  },
  {
    q: "Can I buy the machine after renting it?",
    a: "Yes. You can buy any machine you've been renting, and 1DM Elite members get 10% of the rent they've paid credited toward the purchase.",
  },
  {
    q: "Do you rent coffee machines for events?",
    a: "For events we usually provide the full setup — machine, barista and coffee — through 1DM's coffee catering service in Raipur, Bhilai and Bilaspur.",
  },
];

export default async function CoffeeMachineRentalPage() {
  let equipment: Product[] = [];
  try {
    equipment = (await getAllProducts()).filter((p) => p.category === "equipment");
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
    name: "Coffee machine rental",
    alternateName: ["Coffee machine on rent", "Espresso machine rental"],
    serviceType: "Coffee machine and espresso machine rental",
    description: metadata.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "City", name: "Raipur" },
      { "@type": "City", name: "Bhilai" },
      { "@type": "City", name: "Bilaspur" },
      { "@type": "State", name: "Chhattisgarh" },
    ],
    offers: { "@type": "Offer", priceCurrency: "INR", price: "120", description: "Brewing equipment on rent from ₹120 per month" },
    url: `${siteUrl}/coffee-machine-rental`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Raipur · Bhilai · Bilaspur</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl text-bone sm:text-6xl">Coffee machine on rent in Raipur.</h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        Espresso machines, grinders and brewers on monthly rent — for your home, office or cafe. Set up and dialled in
        by the roasters who run the coffee at 1DM&apos;s cafes, with fresh specialty beans to go with it.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.whatsappHref("Hi, I'd like to rent a coffee machine.")}
          className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
        >
          WhatsApp us
        </a>
        <a href="#enquire" className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          Get a rental quote
        </a>
      </div>

      <section className="mt-16 grid gap-5 sm:grid-cols-2">
        {uses.map((u) => (
          <div key={u.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
            <h2 className="font-display text-2xl text-bone">Coffee machine on rent {u.t.toLowerCase()}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{u.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">How renting works</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-sm border border-bone/10 p-6">
              <p className="font-mono text-xs text-crema">0{i + 1}</p>
              <h3 className="mt-2 font-display text-xl text-bone">{s.t}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-sans text-sm text-bone-dim">
          Zero deposit, the free trial and purchase credit come with{" "}
          <a href="https://www.1dm.coffee/club" className="text-crema underline">
            1DM Elite Club
          </a>{" "}
          membership.
        </p>
      </section>

      {equipment.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl text-bone">Machines and gear you can rent</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm text-bone-dim">
            Monthly rent is shown where a machine is available to rent. Everything here can also be bought outright.
          </p>
          <div className="mt-8">
            <ProductGrid products={equipment} />
          </div>
        </section>
      )}

      <section id="enquire" className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-4xl text-bone">Get a rental quote</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
            Tell us where the machine is going and roughly how many cups a day you make. We&apos;ll come back with the
            right machine and the monthly rent, usually the same day. Or call{" "}
            <a href={contact.phoneHref} className="text-crema underline">
              {contact.phone}
            </a>
            .
          </p>
          <p className="mt-4 font-sans text-sm text-bone-dim">
            Need beans for it? See our{" "}
            <Link href="/shop?category=coffee" className="text-crema underline">
              specialty coffee
            </Link>{" "}
            or{" "}
            <Link href="/wholesale" className="text-crema underline">
              wholesale supply
            </Link>
            .
          </p>
        </div>
        <LeadForm interests={interests} source="kruptoscoffee.com/coffee-machine-rental" />
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
