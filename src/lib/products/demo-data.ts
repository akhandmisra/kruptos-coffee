import { Product } from "./types";

const inr = (amount: string) => ({ amount, currencyCode: "INR" });

function coffeeVariants(
  handle: string,
  price250: string,
  price500: string
): Product["variants"] {
  const grinds = ["Whole Bean", "Ground"];
  const weights: [string, string][] = [
    ["250g", price250],
    ["500g", price500],
  ];
  const variants: Product["variants"] = [];
  for (const grind of grinds) {
    for (const [weight, price] of weights) {
      variants.push({
        id: `${handle}-${grind}-${weight}`.toLowerCase().replace(/\s+/g, "-"),
        title: `${grind} / ${weight}`,
        price: inr(price),
        availableForSale: true,
        selectedOptions: [
          { name: "Grind", value: grind },
          { name: "Weight", value: weight },
        ],
      });
    }
  }
  return variants;
}

const coffeeOptions = [
  { name: "Grind", values: ["Whole Bean", "Ground"] },
  { name: "Weight", values: ["250g", "500g"] },
];

function priceRange(variants: Product["variants"]) {
  const amounts = variants.map((v) => Number(v.price.amount));
  return {
    minVariantPrice: inr(Math.min(...amounts).toString()),
    maxVariantPrice: inr(Math.max(...amounts).toString()),
  };
}

const coffees: Product[] = [
  {
    id: "1",
    handle: "the-dark-side",
    title: "The Dark Side",
    tagline: "Espresso blend, mixed on the far side of the roast curve",
    description:
      "A medium-dark espresso blend built for milk and moka pots. Sourced from Chikkamagaluru, roasted to hold body and chocolate depth without tipping into ash.\n\nDrink it as a shot, a flat white, or over ice — it doesn't fall apart under milk.",
    specs: {
      origin: "Chikkamagaluru, Karnataka",
      process: "Washed",
      roast: "Medium-Dark",
      notes: "Dark chocolate, roasted almond, brown sugar",
    },
    accent: "#B4472B",
    image: null,
    category: "coffee",
    variants: coffeeVariants("dark-side", "525", "950"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("dark-side", "525", "950")),
  },
  {
    id: "2",
    handle: "bitch-bloom",
    title: "Bitch Bloom",
    tagline: "Anaerobic filter roast, light and unruly",
    description:
      "A light filter roast from Koraput, Odisha, put through anaerobic fermentation to push the fruit as far as it'll go without breaking.\n\nBest through a pour-over or AeroPress — give it a slow, patient brew.",
    specs: {
      origin: "Koraput, Odisha",
      process: "Anaerobic fermentation",
      roast: "Light",
      notes: "Red berry, wine-like acidity, jaggery",
    },
    accent: "#5C6B4F",
    image: null,
    category: "coffee",
    variants: coffeeVariants("bitch-bloom", "595", "1100"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("bitch-bloom", "595", "1100")),
  },
  {
    id: "3",
    handle: "simple-men",
    title: "Simple Men",
    tagline: "Yeast-fermented cold brew roast",
    description:
      "Medium-light roast from Koraput, fermented with yeast cultures and roasted specifically for cold extraction. Steep cold for 16–18 hours.\n\nNo sugar required — it already tastes like it has some.",
    specs: {
      origin: "Koraput, Odisha",
      process: "Yeast fermentation",
      roast: "Medium-Light",
      notes: "Stone fruit, caramel, low acidity",
    },
    accent: "#C9A227",
    image: null,
    category: "coffee",
    variants: coffeeVariants("simple-men", "550", "1000"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("simple-men", "550", "1000")),
  },
  {
    id: "4",
    handle: "loveless",
    title: "Loveless",
    tagline: "A hazy, wall-of-sound filter roast",
    description:
      "Light filter roast built for clarity that still hits like a wall. Washed process keeps things clean; the cup opens up as it cools.\n\nA good starting point if you've never had a light roast before.",
    specs: {
      origin: "Chikkamagaluru, Karnataka",
      process: "Washed",
      roast: "Light",
      notes: "White grape, honey, citrus zest",
    },
    accent: "#8A6FB0",
    image: null,
    category: "coffee",
    variants: coffeeVariants("loveless", "560", "1020"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("loveless", "560", "1020")),
  },
  {
    id: "5",
    handle: "disintegration",
    title: "Disintegration",
    tagline: "A slow, brooding dark roast",
    description:
      "For the ones who like it dark and syrupy. A slower roast profile that leans into body over brightness — built for filter coffee at home, South Indian style, or a strong French press.\n\nHolds up to milk, sugar, and everything in between.",
    specs: {
      origin: "Chikkamagaluru, Karnataka",
      process: "Washed",
      roast: "Dark",
      notes: "Molasses, roasted cocoa, black pepper",
    },
    accent: "#1F1B18",
    image: null,
    category: "coffee",
    variants: coffeeVariants("disintegration", "525", "950"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("disintegration", "525", "950")),
  },
  {
    id: "6",
    handle: "in-rainbows",
    title: "In Rainbows",
    tagline: "Bright, layered, pay-what-it's-worth kind of cup",
    description:
      "A vibrant natural-process filter roast that shifts as it cools — tropical up front, sweeter and rounder by the last sip.\n\nBrew it filter, or try it as a bright, fruity cold brew.",
    specs: {
      origin: "Koraput, Odisha",
      process: "Natural",
      roast: "Light-Medium",
      notes: "Mango, tamarind, dark honey",
    },
    accent: "#D98C3C",
    image: null,
    category: "coffee",
    variants: coffeeVariants("in-rainbows", "595", "1100"),
    options: coffeeOptions,
    priceRange: priceRange(coffeeVariants("in-rainbows", "595", "1100")),
  },
];

const merch: Product[] = [
  {
    id: "7",
    handle: "side-a-side-b-flight",
    title: "Side A / Side B Tasting Flight",
    tagline: "Three 100g roasts, one QR code, one playlist each",
    description:
      "Three roasts, 100g each, picked to taste like a proper A-side/B-side pairing. Every bag ships with its own QR code linking to the playlist we roasted it to.\n\nGood as a gift, better as an introduction.",
    specs: {
      origin: "Karnataka & Odisha",
      process: "Mixed",
      roast: "Mixed",
      notes: "One of each: dark, light, fermented",
    },
    accent: "#C9A227",
    image: null,
    category: "merch",
    options: [{ name: "Set", values: ["Standard"] }],
    variants: [
      {
        id: "flight-standard",
        title: "Standard",
        price: inr("899"),
        availableForSale: true,
        selectedOptions: [{ name: "Set", value: "Standard" }],
      },
    ],
    priceRange: {
      minVariantPrice: inr("899"),
      maxVariantPrice: inr("899"),
    },
  },
  {
    id: "8",
    handle: "turntable-mug",
    title: "The Turntable Mug",
    tagline: "Ceramic, holds 300ml, spins nothing",
    description:
      "A simple ceramic mug with the Kruptos mark stamped in gold. Dishwasher safe, holds exactly enough coffee to get through a B-side.",
    specs: {
      origin: "Made in India",
      process: "—",
      roast: "—",
      notes: "300ml, matte black glaze",
    },
    accent: "#6E7681",
    image: null,
    category: "merch",
    options: [{ name: "Style", values: ["Matte Black"] }],
    variants: [
      {
        id: "mug-matte-black",
        title: "Matte Black",
        price: inr("650"),
        availableForSale: true,
        selectedOptions: [{ name: "Style", value: "Matte Black" }],
      },
    ],
    priceRange: {
      minVariantPrice: inr("650"),
      maxVariantPrice: inr("650"),
    },
  },
  {
    id: "9",
    handle: "liner-notes-tote",
    title: "Liner Notes Tote",
    tagline: "Canvas tote printed like a record sleeve",
    description:
      "Heavy canvas tote printed with the tasting-note layout from our bags. Fits a bag of beans, a French press, and whatever else you're carrying.",
    specs: {
      origin: "Made in India",
      process: "—",
      roast: "—",
      notes: "100% cotton canvas",
    },
    accent: "#EDE6D6",
    image: null,
    category: "merch",
    options: [{ name: "Style", values: ["Natural Canvas"] }],
    variants: [
      {
        id: "tote-natural",
        title: "Natural Canvas",
        price: inr("499"),
        availableForSale: true,
        selectedOptions: [{ name: "Style", value: "Natural Canvas" }],
      },
    ],
    priceRange: {
      minVariantPrice: inr("499"),
      maxVariantPrice: inr("499"),
    },
  },
];

export const demoProducts: Product[] = [...coffees, ...merch];

export function getDemoProduct(handle: string): Product | undefined {
  return demoProducts.find((p) => p.handle === handle);
}
