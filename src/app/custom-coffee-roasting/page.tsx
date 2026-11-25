import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { contact, siteUrl } from "@/lib/site";

export const metadata = {
  title: "Coffee Roaster in Raipur — Custom Roasting, Roast Profiles & Private Label for Cafes | Kruptos",
  description:
    "Kruptos Coffee Roasters, Chhattisgarh's first specialty roastery in Raipur: freshly roasted coffee to order, custom roast profiles and blends for your cafe, private-label coffee, and recipe and barista support to help your cafe grow.",
  alternates: { canonical: "/custom-coffee-roasting" },
};

const services = [
  {
    t: "Roasted to order",
    d: "Your coffee is roasted in small batches in Raipur after you order — not pulled from a warehouse months later — with the roast date on every bag.",
  },
  {
    t: "Custom roast profiles",
    d: "We build a roast profile for your menu: sweeter and rounder for milk drinks, brighter for pour-over, or a house espresso that tastes the same week after week.",
  },
  {
    t: "House blends",
    d: "A signature blend for your cafe, developed with you through cupping sessions, then roasted consistently on every order.",
  },
  {
    t: "Private label",
    d: "Your cafe's own retail coffee bags — your name on the pack, our roasting inside — to sell at the counter and online.",
  },
  {
    t: "Recipes & barista training",
    d: "We dial in your coffee on your machine and train your team, the same way we run the bars at 1DM's cafes.",
  },
  {
    t: "Help growing your cafe",
    d: "Menu advice, equipment, coffee costing and the lessons from running a specialty cafe chain across Chhattisgarh since 2019.",
  },
];

const steps = [
  { t: "Talk", d: "Tell us about your cafe, your menu and how much coffee you use." },
  { t: "Cup", d: "We roast samples and taste them with you — origins, roast levels, blends." },
  { t: "Lock the profile", d: "We fix your roast profile and recipe so every batch tastes the same." },
  { t: "Roast & deliver", d: "Fresh roasts on your schedule, delivered across Chhattisgarh or by courier across India." },
];

const faqs = [
  {
    q: "Is there a specialty coffee roaster in Raipur?",
    a: "Yes. Kruptos Coffee Roasters is a specialty roastery in Raipur and Chhattisgarh's first, set up by the team behind 1DM's cafes. We roast in small batches and supply homes, cafes, restaurants, hotels and offices.",
  },
  {
    q: "Can you roast coffee to order for my cafe?",
    a: "Yes. We roast to order on a schedule that suits your volume, so your coffee always reaches you fresh.",
  },
  {
    q: "Can you create a custom roast profile or blend for my cafe?",
    a: "Yes. We develop a roast profile or house blend with you through cupping, then keep it consistent on every batch.",
  },
  {
    q: "Do you do private-label coffee?",
    a: "Yes — retail bags with your cafe's branding and our coffee inside. Tell us your volume and we'll talk through packaging.",
  },
  {
    q: "Do you help new cafes get started?",
    a: "Yes. Alongside coffee, we help with equipment, recipes, menu and barista training, and offer cafe consulting through 1DM.",
  },
];

export default function CustomRoastingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom coffee roasting, roast profiling and private label",
    alternateName: ["Coffee roaster in Raipur", "Specialty coffee roastery Chhattisgarh", "Private label coffee"],
    serviceType: "Coffee roasting to order, custom roast profiles, house blends, private label",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "City", name: "Raipur" },
      { "@type": "City", name: "Bhilai" },
      { "@type": "City", name: "Bilaspur" },
      { "@type": "State", name: "Chhattisgarh" },
      { "@type": "Country", name: "India" },
    ],
    url: `${siteUrl}/custom-coffee-roasting`,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Specialty roastery · Raipur, Chhattisgarh</p>
      <h1 className="mt-2 max-w-4xl font-display text-5xl text-bone sm:text-6xl">
        Your coffee roaster in Raipur — roasted fresh, to your profile.
      </h1>
      <p className="mt-5 max-w-2xl font-sans text-base text-bone-dim sm:text-lg">
        Kruptos is Chhattisgarh&apos;s first specialty coffee roastery. We roast to order, build custom roast profiles and
        house blends for cafes, do private-label coffee, and help your cafe grow — with the experience of running 1DM&apos;s
        cafes across the state.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.whatsappHref("Hi, I'd like to talk about custom roasting for my cafe.")}
          className="rounded-sm bg-crema px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
        >
          WhatsApp the roastery
        </a>
        <Link href="/coffee-beans-raipur" className="rounded-sm border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          Buy fresh coffee beans
        </Link>
      </div>

      <section className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.t} className="rounded-sm border border-bone/10 bg-ink-raised p-6">
            <h2 className="font-display text-2xl text-bone">{s.t}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{s.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-4xl text-bone">How it works</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-sm border border-bone/10 p-6">
              <p className="font-mono text-xs text-crema">0{i + 1}</p>
              <h3 className="mt-2 font-display text-xl text-bone">{s.t}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-4xl text-bone">Talk to the roastery</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-bone-dim">
            Tell us about your cafe and how much coffee you use a month. We&apos;ll set up a cupping and send samples. Or
            call{" "}
            <a href={contact.phoneHref} className="text-crema underline">
              {contact.phone}
            </a>
            .
          </p>
          <p className="mt-4 font-sans text-sm text-bone-dim">
            See also{" "}
            <Link href="/wholesale" className="text-crema underline">
              wholesale coffee beans
            </Link>
            ,{" "}
            <Link href="/espresso-machines-chhattisgarh" className="text-crema underline">
              espresso machines
            </Link>{" "}
            and{" "}
            <a href="https://www.1dm.coffee/franchise" className="text-crema underline">
              cafe consulting with 1DM
            </a>
            .
          </p>
        </div>
        <LeadForm
          interests={["Roast to order for my cafe", "Custom roast profile / house blend", "Private-label coffee", "Cafe setup & consulting"]}
          source="kruptoscoffee.com/custom-coffee-roasting"
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
