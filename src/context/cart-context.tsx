"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartLine, Product, ProductVariant } from "@/lib/products/types";

type CartState = {
  id: string | null;
  lines: CartLine[];
  checkoutUrl: string | null;
};

type CartContextValue = {
  liveMode: boolean;
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  subtotal: number;
  depositTotal: number;
  currencyCode: string;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant: ProductVariant) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkoutUrl: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "kruptos-demo-cart";

export function CartProvider({
  children,
  liveMode,
}: {
  children: React.ReactNode;
  liveMode: boolean;
}) {
  const [cart, setCart] = useState<CartState>({
    id: null,
    lines: [],
    checkoutUrl: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hydratedRef = useRef(false);

  // Cart is intentionally empty on the server-rendered pass (so SSR output
  // matches the client's first hydration pass) and hydrated from
  // localStorage / Shopify right after mount here.
  useEffect(() => {
    hydratedRef.current = true;
    if (liveMode) {
      const cartId = localStorage.getItem("kruptos-cart-id");
      if (!cartId) return;
      fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ action: "get", cartId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.cart) {
            setCart({
              id: data.cart.id,
              lines: data.cart.lines,
              checkoutUrl: data.cart.checkoutUrl,
            });
          }
        })
        .catch(() => {});
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const lines = JSON.parse(raw) as CartLine[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating cart from localStorage after mount is intentional
        setCart({ id: "demo", lines, checkoutUrl: null });
      } catch {
        // ignore corrupt storage
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist demo cart.
  useEffect(() => {
    if (!hydratedRef.current || liveMode) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.lines));
  }, [cart.lines, liveMode]);

  const addItem = useCallback(
    async (product: Product, variant: ProductVariant) => {
      setIsLoading(true);
      try {
        if (liveMode) {
          const res = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({
              action: "add",
              cartId: cart.id,
              variantId: variant.id,
              quantity: 1,
            }),
          });
          const data = await res.json();
          if (data.cart) {
            localStorage.setItem("kruptos-cart-id", data.cart.id);
            setCart({
              id: data.cart.id,
              lines: data.cart.lines,
              checkoutUrl: data.cart.checkoutUrl,
            });
          }
        } else {
          setCart((prev) => {
            const existing = prev.lines.find((l) => l.variantId === variant.id);
            const lines = existing
              ? prev.lines.map((l) =>
                  l.variantId === variant.id
                    ? { ...l, quantity: l.quantity + 1 }
                    : l
                )
              : [
                  ...prev.lines,
                  {
                    id: variant.id,
                    variantId: variant.id,
                    productHandle: product.handle,
                    title: product.title,
                    variantTitle: variant.title,
                    price: variant.price,
                    accent: product.accent,
                    quantity: 1,
                    rentalDeposit: variant.rentalDeposit,
                    rentalPeriod: variant.rentalPeriod,
                  },
                ];
            return { ...prev, id: "demo", lines };
          });
        }
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id, liveMode]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (quantity < 1) return;
      setIsLoading(true);
      try {
        if (liveMode && cart.id) {
          const res = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({
              action: "update",
              cartId: cart.id,
              lineId,
              quantity,
            }),
          });
          const data = await res.json();
          if (data.cart) {
            setCart({
              id: data.cart.id,
              lines: data.cart.lines,
              checkoutUrl: data.cart.checkoutUrl,
            });
          }
        } else {
          setCart((prev) => ({
            ...prev,
            lines: prev.lines.map((l) =>
              l.id === lineId ? { ...l, quantity } : l
            ),
          }));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id, liveMode]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      setIsLoading(true);
      try {
        if (liveMode && cart.id) {
          const res = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({ action: "remove", cartId: cart.id, lineId }),
          });
          const data = await res.json();
          if (data.cart) {
            setCart({
              id: data.cart.id,
              lines: data.cart.lines,
              checkoutUrl: data.cart.checkoutUrl,
            });
          }
        } else {
          setCart((prev) => ({
            ...prev,
            lines: prev.lines.filter((l) => l.id !== lineId),
          }));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart.id, liveMode]
  );

  const subtotal = useMemo(
    () =>
      cart.lines.reduce(
        (sum, line) => sum + Number(line.price.amount) * line.quantity,
        0
      ),
    [cart.lines]
  );

  const depositTotal = useMemo(
    () =>
      cart.lines.reduce(
        (sum, line) =>
          sum +
          (line.rentalDeposit ? Number(line.rentalDeposit.amount) * line.quantity : 0),
        0
      ),
    [cart.lines]
  );

  const itemCount = useMemo(
    () => cart.lines.reduce((sum, line) => sum + line.quantity, 0),
    [cart.lines]
  );

  const currencyCode = cart.lines[0]?.price.currencyCode ?? "INR";

  const value: CartContextValue = {
    liveMode,
    lines: cart.lines,
    isOpen,
    isLoading,
    subtotal,
    depositTotal,
    currencyCode,
    itemCount,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateQuantity,
    removeItem,
    checkoutUrl: cart.checkoutUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
