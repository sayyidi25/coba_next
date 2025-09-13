// components/CartProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../lib/products";

type CartItem = { product: Product; qty: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items));
    } catch (err) {}
  }, [items]);

  const addToCart = (product: Product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) => setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  const clearCart = () => setItems([]);

  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
