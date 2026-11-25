import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { BREWING_GADGETS_URL, contact, siteUrl } from "@/lib/site";

export const metadata = {
  title: "Authorised Brewing Gadgets Dealer in Chhattisgarh — Raipur, Bhilai, Bilaspur",
  description:
    "Kruptos Coffee Roasters is the authorised Brewing Gadgets dealer in Chhattisgarh. Buy coffee grinders, brewers, kettles, scales and accessories locally in Raipur, Bhilai and Bilaspur, with setup and after-sales support.",
  alternates: { canonical: "/brewing-gadgets-dealer-chhattisgarh" },
};

const interests = [
  "Brewing Gadgets product for home",
  "Brewing Gadgets equipment for my cafe",
  "Bulk / wholesale order",
  "After-sales support",
];

const why = [
  { t: "Buy locally", d: "No waiting on out-of-state shipping — order through us and pick up or get delivery in Raipur, Bhilai or Bilaspur." },
  { t: "Genuine products", d: "As the authorised dealer, everything we sell comes through the official channel." },
  { t: "Set up properly", d: "We help you choose the right grinder or brewer and dial it in with fresh Kruptos coffee — the same way we set up the bars at 1DM's cafes." },
  { t: "Support after you buy", d: "Questions, adjustments or warranty help — you deal with a coffee team in Chhattisgarh, not a call centre." },
];

const faqs = [
  {
    q: "Is there an authorised Brewing Gadgets dealer in Chhattisgarh?",
    a: "Yes. Kruptos Coffee Roasters, the roastery behind 1DM's cafes, is the authorised Brewing Gadgets dealer in Chhattisgarh, serving Raipur, Bhilai, Bilaspur and the rest of the state.",
  },
  {
    q: "How do I order Brewing Gadgets products in Raipur?",
    a: "Browse our equipment online, or tell us the product you want using the form on this page or on WhatsApp +91 9179241042. We'll confirm price and availability.",
  },
  {
    q: "Do you supply cafes?",
    a: "Yes — we supply cafes, restaurants and offices with grinders, brewers and accessories, with bulk pricing, installation and barista training.",
  },
];

export default function BrewingGadgetsDealerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Authorised Brewing Gadgets dealer in Chhattisgarh",
    serviceType: "Authorised dealer — coffee brewing equipment",
    provider: { "@id": `${siteUrl}/#organization` },
    brand: { "@type": "Brand", name: "Brewing Gadgets", url: BREWING_GADGETS_URL },
    areaServed: [
      { "@type": "City", name: "Raipur" },
      { "@type": "City", name: "Bhilai" },
      { "@type": "City", name: "Bilaspur" },
      { "@type": "State", name: "Chhattisgarh" },
    ],
    url: `${siteUrl}/brewing-gadgets-dealer-chhattisgarh`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Authorised dealer · Chhattisgarh</p>
      <h1 className="mt-2 max-w-4xl font-display text-5xl text-bone sm:text-6xl">
        Authorised Brewing Gadgets dealer in Chhattisgarh.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        Kruptos Coffee Roasters is the authorised dealer for{" "}
        <a href={BREWING_GADGETS_URL} target="_blank" rel="noopener" className="text-crema underline">
          Brewing Gadgets
        </a>{" "}
        in Chhattisgarh. Buy their coffee grinders, brewers, kettles, scales and accessories from us in Raipur, Bhilai and
        Bilaspur — with advice, setup and support from a local coffee team.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.whatsappHref("Hi, I'd like to order from the Brewing Gadgets range.")}
          className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
        >
          Order on WhatsApp
        </a>
        <Link href="/coffee-equipment-supplier" className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          See equipment in stock
        </Link>
      </div>

      <section className="mt-20 grid gap-5 sm:grid-cols-2">
        {why.map((w) => (
          <div key={w.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
            <h2 className="font-display text-2xl text-bone">{w.t}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{w.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-4xl text-bone">Order or ask about a product</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
            Tell us what you&apos;re looking for and we&apos;ll confirm price and availability, usually the same day. Or
            call{" "}
            <a href={contact.phoneHref} className="text-crema underline">
              {contact.phone}
            </a>
            . Prefer to rent first? See{" "}
            <Link href="/coffee-machine-rental" className="text-crema underline">
              coffee machines on rent
            </Link>
            .
          </p>
        </div>
        <LeadForm interests={interests} source="kruptoscoffee.com/brewing-gadgets-dealer-chhattisgarh" />
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
