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

export const metadata: Metadata = {
  title: "Kruptos Coffee Roasters",
  description:
    "Chhattisgarh's first specialty coffee roastery. Small-batch roasts, each one paired with a playlist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="grain min-h-full flex flex-col font-sans bg-ink text-bone">
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
