import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { siteUrl } from "@/lib/site";

export const metadata = {
  title: "Wholesale Specialty Coffee Beans for Cafes, Hotels & Offices in India",
  description:
    "Wholesale specialty coffee beans from Kruptos Coffee Roasters, Chhattisgarh — fresh small-batch roasts, espresso blends and single origins for cafes, restaurants, hotels and offices, with recipes, barista training and equipment on rent.",
  alternates: { canonical: "/wholesale" },
};

const interests = [
  "Wholesale coffee beans",
  "Private-label / custom roast",
  "Equipment on rent for my business",
  "Barista training & cafe setup",
  "Office coffee",
];

const points = [
  {
    t: "Fresh, traceable roasts",
    d: "Small batches roasted to order in Chhattisgarh, with origin, process and roast date on every bag — including coffee grown in Bastar.",
  },
  {
    t: "Espresso & filter programs",
    d: "An espresso blend built for milk drinks, plus rotating single origins for pour-over and cold brew.",
  },
  {
    t: "Recipes and training",
    d: "We dial in your recipe on your machine and train your team — the same way we train the baristas at 1DM's cafes.",
  },
  {
    t: "Equipment to buy or rent",
    d: "Grinders, espresso machines and brewers from our shop, on a monthly rental with a refundable deposit if you'd rather not buy outright.",
  },
];

const faqs = [
  {
    q: "Do you supply wholesale coffee beans to cafes and hotels?",
    a: "Yes. Kruptos supplies specialty coffee beans to cafes, restaurants, hotels, co-working spaces and offices, starting with a tasting so you can choose the coffee that fits your menu.",
  },
  {
    q: "Where do you deliver?",
    a: "We're based in Chhattisgarh and supply businesses in Raipur, Bhilai, Bilaspur and across India by courier.",
  },
  {
    q: "Can you make a custom roast or private-label coffee?",
    a: "Yes — tell us about your brand and volume and we'll talk through a custom roast profile and packaging.",
  },
  {
    q: "How do I get wholesale prices?",
    a: "Fill in the form on this page or WhatsApp +91 9179241042 with your business, city and roughly how much coffee you use a month. We'll share pricing and arrange samples.",
  },
];

export default function WholesalePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wholesale specialty coffee supply",
    serviceType: "Wholesale coffee beans and cafe coffee programs",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    url: `${siteUrl}/wholesale`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">For Cafes · Hotels · Offices</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl text-bone sm:text-6xl">
        Wholesale specialty coffee, roasted in Chhattisgarh.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        The same coffee that runs every bar at 1DM&apos;s cafes in Raipur, Bhilai and Bilaspur — for your menu, with the
        recipes, training and equipment to make it taste right.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-5">
          {points.map((p) => (
            <div key={p.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
              <h2 className="font-display text-2xl text-bone">{p.t}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{p.d}</p>
            </div>
          ))}
          <p className="font-sans text-sm text-bone-dim">
            See the{" "}
            <Link href="/shop?category=coffee" className="text-crema underline">
              current roasts
            </Link>{" "}
            and{" "}
            <Link href="/shop?category=equipment" className="text-crema underline">
              equipment
            </Link>
            .
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-display text-3xl text-bone">Get wholesale pricing</h2>
          <LeadForm interests={interests} source="kruptoscoffee.com/wholesale" />
        </div>
      </div>

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
