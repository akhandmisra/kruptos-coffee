import Image from "next/image";

export const metadata = { title: "Our Story — Kruptos Coffee Roasters" };

const SECTIONS = [
  {
    eyebrow: "01 — The Ecosystem",
    title: "Before the Roastery, There Was a Gap",
    paragraphs: [
      "Kruptos didn't start as a roastery. It started as 1DM, a café — because before we could roast coffee people would actually want to drink, we had to understand the gap between what specialty coffee could be and what most people in India had ever been handed a cup of. There wasn't a shortage of good coffee in the country. There was a shortage of anyone explaining it. So we built the café first, one piece of an ecosystem we were building slowly and deliberately: understand the drinker before you try to change what they drink.",
      "The roastery was always the next step. Not a pivot — a continuation.",
    ],
  },
  {
    eyebrow: "02 — The R&D",
    title: "Back to Where the Coffee Actually Happens",
    paragraphs: [
      "The first batches we roasted were bad, and we roasted them anyway, because that's how you learn what green coffee is actually telling you. We didn't know enough yet — about the beans, the fermentation, what was really happening on the estate before a single seed ever reached a roaster. So we went back to the source: the farms, the drying beds, the fermentation tanks. And we stayed.",
      "Years went into this. We worked alongside planters and producers directly, not through brokers, learning coffee growing before we ever tried to master roasting it. That groundwork built real relationships — with the people growing the coffee, and with roasters around the world willing to teach what they knew. The Coffee Board of India gave us a formal grounding. Mathew at Pilot Coffee in the UK opened our eyes to what was possible outside India. Dhiraj Agarwal, founder of Ground Zero, shaped how we think about roasting more than almost anyone. Komal and Akshay at South Indian Coffee Company taught us to actually see coffee species and processing for what they are, not just what a bag claims.",
      "Five years of that — failed batches, long stretches at origin, more questions than answers — until the process finally started answering back. That's the “5 years R&D” people see on the bag. It wasn't five years in a lab. It was five years at the source.",
    ],
  },
  {
    eyebrow: "03 — Home Ground",
    title: "Chhattisgarh, Bastar, and the Long Way Round",
    paragraphs: [
      "Chhattisgarh sits at the exact center of India, and until Kruptos, it had no specialty coffee roastery of its own. That's a gap we started this to close. This is home. It's also, less obviously, coffee country — we grow coffee here ourselves, in Bastar, a region better known for its tribal art than for what's growing in the soil beneath it.",
      "That's the part of this story we care most about getting right: coffee grown in Bastar, roasted by people from Chhattisgarh, sent out to travel a lot further than the state usually gets credit for — while making sure the tribal communities actually growing it get paid fairly for it, and the work builds something here instead of just extracting from it. Full traceability, transparent pricing, direct relationships with the people at origin — not because those are buzzwords, but because we've seen what happens when they're missing.",
    ],
  },
  {
    eyebrow: "04 — The Pairing",
    title: "Coffee is Music. Music is Coffee.",
    paragraphs: [
      "Every Kruptos bag ships with a QR code to a playlist — not a gimmick, a belief. Good music does something to your head the same way a genuinely good cup of coffee does. Both are art, both reward attention, and we think they're better experienced together. Every roast gets a playlist we actually listened to while dialling it in, and it comes with you.",
    ],
  },
  {
    eyebrow: "05 — The Mission",
    title: "Coffee for Every Household, Not Just Coffee People",
    paragraphs: [
      "We're not building this only for people who already know their process from their varietal. Kruptos is a micro-roastery — small, tracked batches, roasted to specialty standards, nothing rushed — but the ambition isn't small. We want honestly sourced, fairly paid-for coffee in every household across India, and eventually well beyond it. A few new formats are already on the way, built for exactly that: coffee that doesn't ask you to be an expert before you can enjoy it.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
        Liner Notes
      </p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">
        Our Story
      </h1>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-bone/10 bg-ink-raised">
        <Image
          src="/images/estate-banner.jpg"
          alt="Coffee estate in Bastar, Chhattisgarh, where Kruptos grows and processes coffee"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="mt-14 space-y-14">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
              {section.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl text-bone sm:text-4xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 font-sans text-base leading-relaxed text-bone-dim">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {section.eyebrow === "03 — Home Ground" && (
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-sm border border-bone/10 bg-ink-raised">
                <Image
                  src="/images/estate-processing.jpg"
                  alt="Coffee processing at the Kruptos estate — drying beds and fermentation"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
