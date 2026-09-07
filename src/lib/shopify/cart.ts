import { shopifyFetch } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from "./cart-mutations";

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        product: {
          handle: string;
          title: string;
          featuredImage: { url: string; altText: string } | null;
        };
      };
    }[];
  };
};

export async function shopifyCartCreate(
  lines: { merchandiseId: string; quantity: number }[]
) {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>({ query: CART_CREATE_MUTATION, variables: { lines } });
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  return data.cartCreate.cart;
}

export async function shopifyCartAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>({ query: CART_LINES_ADD_MUTATION, variables: { cartId, lines } });
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(", "));
  }
  return data.cartLinesAdd.cart;
}

export async function shopifyCartUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>({ query: CART_LINES_UPDATE_MUTATION, variables: { cartId, lines } });
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join(", ")
    );
  }
  return data.cartLinesUpdate.cart;
}

export async function shopifyCartRemove(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>({ query: CART_LINES_REMOVE_MUTATION, variables: { cartId, lineIds } });
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join(", ")
    );
  }
  return data.cartLinesRemove.cart;
}

export async function shopifyCartGet(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart;
}
