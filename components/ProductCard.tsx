// components/ProductCard.tsx
"use client";
import { Product } from "../lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-image" />

      <h3 className="mt-3 font-semibold text-lg text-blue-700">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>

      <div className="mt-2 flex items-center justify-between w-full">
        <span className="font-bold text-blue-600">Rp {product.price.toLocaleString("id-ID")}</span>
        <button
          onClick={() => addToCart(product)}
          className="btn"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
