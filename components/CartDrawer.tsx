// components/CartDrawer.tsx
"use client";
import { useCart } from "./CartProvider";
import { useState } from "react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Checkout berhasil (mock). Terima kasih!");
      clearCart();
      setOpen(false);
    } else {
      alert("Checkout gagal (mock).");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-gray-800 text-white rounded"
        aria-label="Buka keranjang"
      >
        Keranjang ({items.reduce((s, it) => s + it.qty, 0)})
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1" onClick={() => setOpen(false)} /> {/* overlay */}
          <aside className="w-96 bg-white p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Keranjang</h3>
              <button onClick={() => setOpen(false)}>Tutup</button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500">Keranjang kosong</p>
            ) : (
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={it.product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{it.product.name}</p>
                      <p className="text-sm text-gray-500">Rp {it.product.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(it.product.id, Math.max(1, it.qty - 1))} className="px-2">-</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(it.product.id, it.qty + 1)} className="px-2">+</button>
                      <button onClick={() => removeFromCart(it.product.id)} className="px-2 text-red-600">x</button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <p className="font-bold">Total: Rp {total.toLocaleString("id-ID")}</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={handleCheckout} className="flex-1 bg-green-600 text-white py-2 rounded">Checkout</button>
                    <button onClick={() => clearCart()} className="bg-gray-200 px-4 rounded">Kosongkan</button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
