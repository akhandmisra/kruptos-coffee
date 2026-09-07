# Kruptos Coffee — Next.js storefront

A Next.js (App Router) storefront for Kruptos Coffee Roasters, built to
deploy on Vercel with Shopify as the headless commerce backend.

## Two modes

- **Demo mode (default, what you see now):** no Shopify store connected yet.
  Product data comes from `src/lib/products/demo-data.ts` and the cart is
  kept in the browser (localStorage). Checkout shows a "not connected yet"
  notice instead of charging anyone.
- **Live mode:** once `SHOPIFY_STORE_DOMAIN` and
  `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are set (see `.env.local.example`),
  every product and cart call automatically switches to the real Shopify
  Storefront API, and checkout redirects to Shopify's hosted checkout
  (which is where Razorpay/payment methods are configured).

No code changes are needed to switch — it's driven entirely by whether
those two environment variables are present.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Project structure

- `src/app` — pages (home, `/shop`, `/products/[handle]`, `/cart`, `/about`,
  `/contact`) and the `/api/cart` route handler used in live mode.
- `src/components` — UI: header, footer, product cards, the "record sleeve"
  product art, cart drawer, add-to-cart control.
- `src/context/cart-context.tsx` — client-side cart state (demo or live).
- `src/lib/products` — product types + demo data + the function that
  fetches from Shopify once configured.
- `src/lib/shopify` — Shopify Storefront API client, GraphQL queries, and
  cart mutations.

## Design

Fonts: Bebas Neue (display), Public Sans (body), Space Mono (utility/liner
notes). Colors and other tokens live in `src/app/globals.css`.

Products are drawn as color-blocked "record sleeves" (no photography
required) since the brand already pairs every roast with a Spotify
playlist via QR code. Swap in real product photography later by replacing
`ProductSleeve` usage with an `<Image>`.
