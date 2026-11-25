import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/products/types";
import { ProductGrid } from "@/components/product-grid";
import { contact, siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "Buy Coffee Beans Online in Raipur & Chhattisgarh — Fresh Roasted Specialty Coffee",
  description:
    "Buy fresh-roasted specialty coffee beans in Raipur, Bhilai, Bilaspur and across Chhattisgarh from Kruptos Coffee Roasters — the state's first specialty roastery. Whole bean or ground, roast date on every bag, delivered across India.",
  alternates: { canonical: "/coffee-beans-raipur" },
};

const partnerRoasters = {
  indian: [
    "Blue Tokai Coffee Roasters",
    "Bloom Coffee Roasters",
    "Naivo Coffee Company",
    "Rossette Coffee Lab",
    "Capulus Beans",
    "Kapi Kottai",
    "Savorworks Coffee Roasters",
    "Corridor Seven Coffee Roasters",
    "Quick Brown Fox Coffee Roasters",
    "Ground Zero Coffee Roasters",
    "El Bueno Coffee Roasters",
    "Siolim Specialty Coffee Roasters",
    "Half Light Coffee Roasters",
    "Videshi Coffee",
    "Kokoro",
    "Tulum Coffee",
  ],
  abroad: ["Black & White Coffee Roasters", "Dak Coffee Roasters", "Hydrangea Coffee Roasters", "Hatch"],
};

const faqs = [
  {
    q: "Where can I buy fresh coffee beans in Raipur?",
    a: "Order fresh-roasted specialty coffee beans online from Kruptos Coffee Roasters, Chhattisgarh's first specialty roastery, with delivery across Raipur, Bhilai, Bilaspur and India. You can also WhatsApp +91 9179241042.",
  },
  {
    q: "Are the beans freshly roasted?",
    a: "Yes. Kruptos roasts in small batches in Chhattisgarh and prints the origin and roast date on every bag. Specialty coffee tastes best within about a month of roasting.",
  },
  {
    q: "Whole bean or ground?",
    a: "Both. Choose whole bean if you have a grinder, or ground if you don't.",
  },
  {
    q: "Do you sell other roasters' coffee too?",
    a: "Kruptos is the roastery behind 1DM, a multi-roaster cafe chain in Chhattisgarh. At 1DM's cafes we also pour coffee from Indian and international roasters we've partnered with — see the list on this page.",
  },
  {
    q: "Do you supply coffee beans wholesale?",
    a: "Yes — to cafes, restaurants, hotels and offices across Chhattisgarh and India, with recipes and barista training.",
  },
];

export default async function CoffeeBeansPage() {
  let coffees: Product[] = [];
  try {
    coffees = (await getAllProducts()).filter((p) => p.category === "coffee");
  } catch {
    // Product source briefly unreachable — the rest of the page still renders.
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Specialty coffee beans from Kruptos Coffee Roasters",
    itemListElement: coffees.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/products/${p.handle}`,
      name: p.title,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {coffees.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      )}

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Raipur · Bhilai · Bilaspur · All India</p>
      <h1 className="mt-2 max-w-4xl font-display text-5xl text-bone sm:text-6xl">
        Buy fresh-roasted coffee beans in Raipur &amp; Chhattisgarh.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        Specialty coffee roasted in small batches in Chhattisgarh by Kruptos — the roastery behind 1DM&apos;s cafes. Origin
        and roast date on every bag, whole bean or ground, delivered to your door.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop?category=coffee" className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink">
          Shop coffee beans
        </Link>
        <a
          href={contact.whatsappHref("Hi, I'd like to order coffee beans.")}
          className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone"
        >
          Order on WhatsApp
        </a>
      </div>

      {coffees.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl text-bone">Our coffees</h2>
          <div className="mt-8">
            <ProductGrid products={coffees} />
          </div>
        </section>
      )}

      <section className="mt-20 grid gap-5 sm:grid-cols-3">
        {[
          { t: "Roasted in Chhattisgarh", d: "Small batches roasted to order, including coffee grown in Bastar — so it reaches you fresh, not after weeks in a warehouse." },
          { t: "Traceable", d: "Origin, process and roast date on every bag." },
          { t: "Made for how you brew", d: "Espresso, pour-over, French press, AeroPress or cold brew — whole bean or ground." },
        ].map((c) => (
          <div key={c.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
            <h2 className="font-display text-2xl text-bone">{c.t}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">Roasters we&apos;ve partnered with</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-bone-dim">
          1DM is a multi-roaster cafe. Alongside Kruptos, these Indian and international roasters have been poured on the
          1DM bar in Chhattisgarh.{" "}
          <a href="https://www.1dm.coffee/coffee-beans-raipur" className="text-crema underline">
            See them all with logos
          </a>
          .
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-[2fr_1fr]">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-crema">From India</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm text-bone">
              {partnerRoasters.indian.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-crema">From abroad</h3>
            <ul className="mt-3 space-y-2 font-sans text-sm text-bone">
              {partnerRoasters.abroad.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <p className="font-sans text-sm text-bone-dim">
          Buying for a cafe, hotel or office? See{" "}
          <Link href="/wholesale" className="text-crema underline">
            wholesale coffee beans
          </Link>
          . Need a grinder? See our{" "}
          <Link href="/coffee-equipment-supplier" className="text-crema underline">
            brewing equipment
          </Link>
          .
        </p>
        <h2 className="mt-12 font-display text-4xl text-bone">Questions</h2>
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
