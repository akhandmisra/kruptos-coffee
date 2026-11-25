import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/products/types";
import { ProductGrid } from "@/components/product-grid";
import { LeadForm } from "@/components/lead-form";
import { contact, siteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "Coffee Machine & Brewing Equipment Supplier in Raipur, Chhattisgarh",
  description:
    "Kruptos Coffee Roasters supplies coffee machines, grinders and brewing equipment in Raipur, Bhilai, Bilaspur and across India — Hario, Timemore, Fellow, Comandante, Mahlkönig, Baratza, AeroPress and more, for cafes, offices and home brewers. Buy, rent or order wholesale.",
  alternates: { canonical: "/coffee-equipment-supplier" },
};

const brands: { name: string; what: string; href: string }[] = [
  { name: "Hario", what: "V60 drippers & servers, cold brew towers, Mizudashi pots, filters", href: "/products/hario-v60-server-set" },
  { name: "Timemore", what: "Chestnut hand grinders, Fish kettles, Basic scales, U press", href: "/products/timemore-chestnut-c3s" },
  { name: "Fellow", what: "Ode Brew Grinder Gen 2", href: "/products/fellow-ode-brew-grinder-gen-2" },
  { name: "Comandante", what: "MK4 Nitro hand grinder", href: "/products/comandante-mk4-nitro" },
  { name: "Mahlkönig", what: "X54 and X64 SD grinders", href: "/products/mahlkonig-x54-grinder" },
  { name: "Baratza", what: "Encore ESP grinder", href: "/products/baratza-encore-esp" },
  { name: "DF64", what: "DF64 Gen 2 single-dose grinder", href: "/products/df64-gen-2-grinder" },
  { name: "Meraki", what: "Espresso machine with built-in grinder", href: "/products/meraki-espresso-machine" },
  { name: "xBloom", what: "Studio automated pour-over brewer, Omni Dripper 2", href: "/products/xbloom-studio-brewer" },
  { name: "AeroPress", what: "AeroPress coffee maker and filters", href: "/products/aeropress" },
  { name: "Brewista", what: "Artisan 1L gooseneck kettle", href: "/products/brewista-artisan-1l" },
  { name: "Flair", what: "Cafe Kettle 800ml", href: "/products/flair-cafe-kettle-800ml" },
  { name: "Origami", what: "Dripper Air S", href: "/products/origami-dripper-air-s" },
  { name: "UFO", what: "Ceramic and V2 drippers, Type A filters", href: "/products/ufo-ceramic-black-dripper" },
  { name: "Chemex · Kalita · Sibarist", what: "Specialty paper filters", href: "/shop?category=equipment" },
  { name: "Subminimal", what: "Smart dosing cup", href: "/products/subminimal-dosing-cup" },
];

const categories = [
  { t: "Espresso machines", d: "Home and small-cafe espresso machines, installed and dialled in with fresh coffee." },
  { t: "Coffee grinders", d: "Electric grinders for espresso and filter from Mahlkönig, Fellow, Baratza and DF64, and hand grinders from Comandante and Timemore." },
  { t: "Pour-over & brewers", d: "Hario V60, Origami, UFO and Omni drippers, AeroPress, French presses and the xBloom automated brewer." },
  { t: "Cold brew", d: "Hario cold drip towers, Mizudashi pots and filter-in bottles for cafes and homes." },
  { t: "Kettles & scales", d: "Temperature-controlled gooseneck kettles and 0.1 g brewing scales from Timemore, Brewista and Flair." },
  { t: "Filters & consumables", d: "Hario, Chemex, Kalita, Sibarist, UFO and AeroPress filters — stocked for cafes that need them every month." },
];

const interests = [
  "Coffee equipment for my cafe / restaurant",
  "Wholesale / bulk equipment order",
  "Espresso machine or grinder for home",
  "Coffee machine for office",
  "Coffee machine on rent",
];

const faqs = [
  {
    q: "Where can I buy coffee brewing equipment in Raipur?",
    a: "Kruptos Coffee Roasters supplies espresso machines, coffee grinders, pour-over drippers, kettles, scales and filters in Raipur, Bhilai and Bilaspur, and ships across India. Order online or WhatsApp +91 9179241042.",
  },
  {
    q: "Which coffee equipment brands do you supply?",
    a: "Hario, Timemore, Fellow, Comandante, Mahlkönig, Baratza, DF64, Meraki, xBloom, AeroPress, Brewista, Flair, Origami, UFO and Subminimal, plus Chemex, Kalita and Sibarist filters.",
  },
  {
    q: "Do you supply equipment to cafes, restaurants and offices?",
    a: "Yes. We supply cafes, restaurants, hotels, offices and co-working spaces, with bulk pricing, installation, recipe set-up and barista training — the same way we set up the bars at 1DM's cafes.",
  },
  {
    q: "Can I rent equipment instead of buying it?",
    a: "Yes. Most machines, grinders and brewers can be rented monthly, and you can buy later. See coffee machines on rent.",
  },
  {
    q: "Do you deliver outside Chhattisgarh?",
    a: "Yes, we ship brewing equipment and filters across India by courier. Larger machines for cafes are delivered and installed in Raipur, Bhilai and Bilaspur; ask us about other cities.",
  },
];

export default async function EquipmentSupplierPage() {
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
    name: "Coffee machine and brewing equipment supply",
    alternateName: ["Coffee machine supplier", "Coffee equipment supplier", "Coffee brewing equipment distributor"],
    serviceType: "Coffee machine, grinder and brewing equipment supplier",
    description: metadata.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "City", name: "Raipur" },
      { "@type": "City", name: "Bhilai" },
      { "@type": "City", name: "Bilaspur" },
      { "@type": "State", name: "Chhattisgarh" },
      { "@type": "Country", name: "India" },
    ],
    brand: brands.flatMap((b) => b.name.split(" · ")).map((name) => ({ "@type": "Brand", name })),
    url: `${siteUrl}/coffee-equipment-supplier`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Raipur · Bhilai · Bilaspur · All India</p>
      <h1 className="mt-2 max-w-4xl font-display text-5xl text-bone sm:text-6xl">
        Coffee machine &amp; brewing equipment supplier in Chhattisgarh.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        Espresso machines, grinders, drippers, kettles, scales and filters from the brands specialty cafes use — supplied,
        set up and supported by the roasters behind 1DM&apos;s cafes. Buy outright, order wholesale for your cafe, or{" "}
        <Link href="/coffee-machine-rental" className="text-crema underline">
          rent monthly
        </Link>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.whatsappHref("Hi, I'm looking for coffee equipment.")}
          className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
        >
          WhatsApp us
        </a>
        <a href="#enquire" className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          Get a quote
        </a>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">Brands we supply</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => (
            <Link key={b.name} href={b.href} className="rounded-sm border border-bone/10 p-5 hover:border-crema/50">
              <h3 className="font-display text-xl text-bone">{b.name}</h3>
              <p className="mt-1 font-sans text-xs leading-relaxed text-bone-dim">{b.what}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
            <h2 className="font-display text-2xl text-bone">{c.t}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="font-display text-4xl text-bone">For cafes, restaurants &amp; offices</h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
          Opening a cafe or upgrading your bar? We supply the full setup — espresso machine, grinders, brewing gear and
          filters — with bulk pricing, installation, recipe set-up on your machine and barista training. Pair it with{" "}
          <Link href="/wholesale" className="text-crema underline">
            wholesale specialty coffee
          </Link>{" "}
          roasted in Chhattisgarh, and you have one supplier for the whole coffee program.
        </p>
      </section>

      {equipment.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-4xl text-bone">Equipment in stock</h2>
          <div className="mt-8">
            <ProductGrid products={equipment} />
          </div>
        </section>
      )}

      <section id="enquire" className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-4xl text-bone">Get a quote</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
            Tell us what you&apos;re setting up — a home brew bar, an office or a cafe — and we&apos;ll suggest the
            equipment and send prices, usually the same day. Or call{" "}
            <a href={contact.phoneHref} className="text-crema underline">
              {contact.phone}
            </a>
            .
          </p>
          <p className="mt-4 font-sans text-sm text-bone-dim">
            Choosing a grinder? Read{" "}
            <Link href="/journal/how-to-choose-a-coffee-grinder-india" className="text-crema underline">
              how to choose a coffee grinder in India
            </Link>
            .
          </p>
        </div>
        <LeadForm interests={interests} source="kruptoscoffee.com/coffee-equipment-supplier" />
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
