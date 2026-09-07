import { NextRequest, NextResponse } from "next/server";
import { accentFor } from "@/lib/products/accent";
import {
  shopifyCartAdd,
  shopifyCartCreate,
  shopifyCartGet,
  shopifyCartRemove,
  shopifyCartUpdate,
  ShopifyCart,
} from "@/lib/shopify/cart";
import { isShopifyConfigured } from "@/lib/shopify/client";

// This route only does anything in LIVE mode (real Shopify store connected).
// In demo mode the client keeps the cart entirely in localStorage and never
// calls this route. See src/context/cart-context.tsx.

function serializeCart(cart: ShopifyCart) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      variantId: line.merchandise.id,
      productHandle: line.merchandise.product.handle,
      title: line.merchandise.product.title,
      variantTitle: line.merchandise.title,
      price: line.merchandise.price,
      accent: accentFor(line.merchandise.product.handle),
      quantity: line.quantity,
    })),
  };
}

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured) {
    return NextResponse.json(
      { error: "Shopify is not configured on this deployment yet." },
      { status: 501 }
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "get") {
      const cart = await shopifyCartGet(body.cartId);
      if (!cart) return NextResponse.json({ cart: null });
      return NextResponse.json({ cart: serializeCart(cart) });
    }

    if (action === "add") {
      const cart = body.cartId
        ? await shopifyCartAdd(body.cartId, [
            { merchandiseId: body.variantId, quantity: body.quantity ?? 1 },
          ])
        : await shopifyCartCreate([
            { merchandiseId: body.variantId, quantity: body.quantity ?? 1 },
          ]);
      return NextResponse.json({ cart: serializeCart(cart) });
    }

    if (action === "update") {
      const cart = await shopifyCartUpdate(body.cartId, [
        { id: body.lineId, quantity: body.quantity },
      ]);
      return NextResponse.json({ cart: serializeCart(cart) });
    }

    if (action === "remove") {
      const cart = await shopifyCartRemove(body.cartId, [body.lineId]);
      return NextResponse.json({ cart: serializeCart(cart) });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
