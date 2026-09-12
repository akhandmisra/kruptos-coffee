import { NextRequest, NextResponse } from "next/server";
import { accentFor } from "@/lib/products/accent";
import {
  shopifyCartAdd,
  shopifyCartApplyDiscount,
  shopifyCartCreate,
  shopifyCartGet,
  shopifyCartRemove,
  shopifyCartUpdate,
  ShopifyCart,
} from "@/lib/shopify/cart";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getVerifiedMember, isRentalEnabled } from "@/lib/membership/session";

// This route only does anything in LIVE mode (real Shopify store connected).
// In demo mode the client keeps the cart entirely in localStorage and never
// calls this route. See src/context/cart-context.tsx.

// Verified 1DM members get this applied automatically — no code they ever
// see or type. It's scoped in Shopify (via productVariantsToAdd) to Buy-type
// coffee, equipment and merch variants only; equipment "Rent" variants were
// deliberately left out when the discount was created, so Shopify itself
// enforces the Buy-only rule. This route only decides WHO gets it.
const MEMBER_DISCOUNT_CODE = "1DM-MEMBER10";

// Every cart mutation (and fetch) passes through this handler, so this is
// the single place that keeps the member discount in sync with the
// httpOnly verification cookie — added the instant someone verifies,
// removed the instant they're not verified (e.g. after logout).
async function reconcileMemberDiscount(
  cart: ShopifyCart | null
): Promise<ShopifyCart | null> {
  if (!cart || !isRentalEnabled()) return cart;

  const member = await getVerifiedMember();
  const hasCode = cart.discountCodes?.some(
    (d) => d.code.toUpperCase() === MEMBER_DISCOUNT_CODE
  );

  if (member && !hasCode) {
    return await shopifyCartApplyDiscount(cart.id, [MEMBER_DISCOUNT_CODE]);
  }
  if (!member && hasCode) {
    return await shopifyCartApplyDiscount(cart.id, []);
  }
  return cart;
}

function serializeCart(cart: ShopifyCart) {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    hasMemberDiscount:
      cart.discountCodes?.some(
        (d) => d.code.toUpperCase() === MEMBER_DISCOUNT_CODE && d.applicable
      ) ?? false,
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
      const cart = await reconcileMemberDiscount(
        await shopifyCartGet(body.cartId)
      );
      if (!cart) return NextResponse.json({ cart: null });
      return NextResponse.json({ cart: serializeCart(cart) });
    }

    if (action === "add") {
      const cart = await reconcileMemberDiscount(
        body.cartId
          ? await shopifyCartAdd(body.cartId, [
              { merchandiseId: body.variantId, quantity: body.quantity ?? 1 },
            ])
          : await shopifyCartCreate([
              { merchandiseId: body.variantId, quantity: body.quantity ?? 1 },
            ])
      );
      return NextResponse.json({ cart: serializeCart(cart!) });
    }

    if (action === "update") {
      const cart = await reconcileMemberDiscount(
        await shopifyCartUpdate(body.cartId, [
          { id: body.lineId, quantity: body.quantity },
        ])
      );
      return NextResponse.json({ cart: serializeCart(cart!) });
    }

    if (action === "remove") {
      const cart = await reconcileMemberDiscount(
        await shopifyCartRemove(body.cartId, [body.lineId])
      );
      return NextResponse.json({ cart: serializeCart(cart!) });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
