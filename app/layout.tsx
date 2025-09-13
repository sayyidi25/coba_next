// app/layout.tsx
import "./globals.css";
import CartProvider from "../components/CartProvider";
import CartDrawer from "../components/CartDrawer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyShop - Demo Toko",
  description: "Demo toko kecil dengan Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <CartProvider>
          <header className="bg-blue-700 text-white">
            <div className="container flex items-center justify-between p-4">
              <h1 className="text-xl font-bold">MyShop</h1>
              <nav className="flex items-center gap-4">
                <a href="/" className="hover:underline">Beranda</a>
                <a href="#products" className="hover:underline">Produk</a>
                <CartDrawer />
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="bg-gray-900 text-white text-center p-4 mt-8">
            © {new Date().getFullYear()} MyShop — Demo
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
