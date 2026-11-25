import type { Metadata } from "next";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { siteUrl, siteName, defaultOgImage, organizationSchema } from "@/lib/site";

const description =
  "Kruptos Coffee Roasters — Chhattisgarh's first specialty coffee roastery. Fresh small-batch specialty coffee beans roasted to order in Raipur, custom roast profiles and private label for cafes, coffee grown in Bastar, brewing equipment to buy or rent, and wholesale beans for cafes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kruptos Coffee Roasters | Coffee Roaster in Raipur — Fresh Specialty Coffee Beans, Chhattisgarh",
    template: "%s | Kruptos Coffee Roasters",
  },
  description,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: "Kruptos Coffee Roasters | Specialty Coffee from Chhattisgarh",
    description,
    images: [defaultOgImage],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kruptos Coffee Roasters | Specialty Coffee from Chhattisgarh",
    description,
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="grain min-h-full flex flex-col font-sans bg-ink text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <CartProvider liveMode={isShopifyConfigured}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
