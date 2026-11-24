// Kruptos Journal — articles live here as structured data (no CMS), rendered
// by src/app/journal/[slug]/page.tsx. Add an article by adding an entry.

export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "links"; items: { href: string; label: string }[] };

export type JournalArticle = {
  slug: string;
  title: string;
  dek: string;
  readTime: string;
  publishedAt: string;
  body: JournalBlock[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "bastar-coffee-chhattisgarh",
    title: "Bastar Coffee: How Chhattisgarh Became India's Newest Coffee Region",
    dek: "Coffee in Chhattisgarh sounds unlikely until you see the shaded slopes of Bastar. Here's how coffee came to the region, what it tastes like, and why we roast it.",
    readTime: "6 min read",
    publishedAt: "2026-11-24",
    body: [
      {
        type: "p",
        text: "When people think of Indian coffee they think of the Western Ghats — Chikmagalur, Coorg, Wayanad — or, more recently, Araku Valley in the east. Chhattisgarh rarely comes up. But on the plateau of Bastar, in the south of the state, coffee has been growing under the forest canopy for the better part of a decade, and it's starting to show up in cups well beyond the region.",
      },
      { type: "h2", text: "How coffee came to Bastar" },
      {
        type: "p",
        text: "Coffee planting in Bastar began in the Darbha block, around 35 km from Jagdalpur, in the second half of the 2010s. The College of Horticulture and Research Station in Jagdalpur led the work with support from the district administration and the Coffee Board of India, starting with a small experimental plot and training local farmers, many of them Adivasi families who had worked the forest land for generations.",
      },
      {
        type: "p",
        text: "The idea was simple: coffee needs altitude, the right rains and heavy shade — and Bastar's forested plateau, at roughly 600 to 1,400 metres in the Darbha area, has all three. Coffee can be grown under the existing tree cover instead of clearing land, which also makes it a crop that protects the forest rather than replacing it.",
      },
      { type: "h2", text: "What Bastar coffee tastes like" },
      {
        type: "p",
        text: "Like the rest of India's coffee, Bastar coffee is shade-grown, which slows ripening and builds sweetness. Expect a softer, rounder cup than the bright, high-acidity coffees of East Africa — think chocolate, nuts and brown sugar, with fruit notes coming through in carefully processed lots. Processing makes a big difference: a well-run natural or honey lot from Bastar tastes very different from a quickly dried commodity lot.",
      },
      { type: "h2", text: "Why Kruptos roasts it" },
      {
        type: "p",
        text: "Kruptos is Chhattisgarh's first specialty coffee roastery, and Bastar coffee is the part of our story we care most about getting right: coffee grown in Chhattisgarh, roasted by people from Chhattisgarh, and sent out to travel further than the state usually gets credit for. We work directly with growers, keep every lot traceable, and pay for quality — because the only way a new coffee region survives is if the farmers growing it are paid well enough to keep doing it.",
      },
      {
        type: "list",
        items: [
          "Full traceability: origin, process and roast date on every bag.",
          "Small-batch roasting, so the coffee reaches you fresh.",
          "Direct relationships with growers, not anonymous commodity lots.",
        ],
      },
      { type: "h2", text: "How to brew it" },
      {
        type: "p",
        text: "For a first taste, brew Bastar coffee as a pour-over (V60 or similar) at about 1:15 coffee to water with water just off the boil, or as a French press if you like more body. It also makes a sweet, chocolatey base for milk drinks. And yes — every Kruptos bag comes with a QR code to the playlist we roasted it to.",
      },
      {
        type: "links",
        items: [
          { href: "/shop?category=coffee", label: "Shop Kruptos coffee" },
          { href: "/about", label: "Read our story" },
          { href: "/wholesale", label: "Wholesale for cafes" },
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-coffee-grinder-india",
    title: "How to Choose a Coffee Grinder in India (and Why You Might Rent One First)",
    dek: "The grinder matters more than the coffee machine. Here's how to pick one for pour-over, AeroPress or espresso — with real prices — and how renting lets you try before you buy.",
    readTime: "7 min read",
    publishedAt: "2026-11-24",
    body: [
      {
        type: "p",
        text: "Ask any barista where to spend money first and the answer is almost always the grinder. Fresh, evenly ground coffee is the single biggest upgrade you can make at home — a ₹2,000 dripper with a good grinder will beat an expensive machine fed with stale, uneven pre-ground coffee every time.",
      },
      { type: "h2", text: "Burr, not blade" },
      {
        type: "p",
        text: "Blade grinders chop coffee into a mix of dust and boulders, so some of it over-extracts (bitter) while the rest under-extracts (sour). Burr grinders crush beans between two burrs set at a fixed distance, giving an even grind you can adjust. Every grinder worth buying for specialty coffee is a burr grinder.",
      },
      { type: "h2", text: "Hand grinder or electric?" },
      {
        type: "p",
        text: "If you brew one or two cups a day by pour-over or AeroPress, a good hand grinder gives you excellent grind quality for far less money and takes a minute of cranking. If you brew for several people, make espresso daily, or just want convenience, go electric.",
      },
      { type: "h2", text: "What to look at, by brew method" },
      {
        type: "list",
        items: [
          "Pour-over and AeroPress: a hand grinder like the Timemore Chestnut C3S (around ₹6,500) or the Comandante MK4 Nitro (around ₹29,000), or an electric filter grinder like the Fellow Ode Gen 2.",
          "Espresso at home: you need fine, precise adjustment — the Baratza Encore ESP (around ₹21,000) is an entry point; the DF64 Gen 2 is a big step up.",
          "Cafes and offices: commercial grinders like the Mahlkönig X54 or X64 SD handle volume all day.",
        ],
      },
      {
        type: "p",
        text: "Prices above are from the Kruptos shop at the time of writing; check the product pages for current prices.",
      },
      { type: "h2", text: "Why renting first makes sense" },
      {
        type: "p",
        text: "Good grinders aren't cheap, and it's hard to know what you'll actually use until you've brewed with one for a few weeks. Kruptos rents grinders, brewers and espresso machines monthly with a refundable deposit — so you can try a Comandante or a DF64 before committing, or kit out a pop-up or office without the upfront cost. Rental and the member discount are available to verified 1DM members.",
      },
      { type: "h2", text: "Last tip: buy fresh beans" },
      {
        type: "p",
        text: "A great grinder can't rescue stale coffee. Buy whole beans with a roast date on the bag, use them within about four to six weeks of roasting, and grind just before you brew.",
      },
      {
        type: "links",
        items: [
          { href: "/shop?category=equipment", label: "Grinders & equipment" },
          { href: "/shop?category=coffee", label: "Fresh coffee beans" },
          { href: "/contact", label: "Ask us what to buy" },
        ],
      },
    ],
  },
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((a) => a.slug === slug);
}
