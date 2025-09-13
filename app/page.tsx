// app/page.tsx
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";


export default function Home() {
  return (
    <div className="container py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">Selamat datang di Toko</h1>
        <p className="text-gray-600 mt-2">Toko demo — tambahkan produk ke keranjang dan checkout (mock).</p>
      </section>

      <section id="products">
        <h2 className="text-2xl font-semibold mb-6">Produk Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
