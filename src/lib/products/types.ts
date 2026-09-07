export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  /** Short line used on cards / hero */
  tagline: string;
  /** Full description, plain text with paragraphs separated by \n\n */
  description: string;
  /** Liner-notes style spec sheet */
  specs: {
    origin: string;
    process: string;
    roast: string;
    notes: string; // tasting notes
  };
  /** Hex accent used for the "sleeve" art since we don't have product photography yet */
  accent: string;
  category: "coffee" | "merch";
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  options: ProductOption[];
  variants: ProductVariant[];
};

export type CartLine = {
  id: string; // line id (variant id for demo cart)
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: Money;
  accent: string;
  quantity: number;
};
