// lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Smart Speaker",
    price: 299000,
    description: "Speaker pintar dengan asisten suara.",
    image: "/images/poto2.gif",
  },
  {
    id: "p2",
    name: "Wireless Headphones",
    price: 499000,
    description: "Headphone nirkabel dengan noise-cancelling.",
    image: "/images/poto1.jpg",
  },
  {
    id: "p3",
    name: "Smartwatch",
    price: 799000,
    description: "Smartwatch dengan pelacakan kesehatan dasar.",
    image: "/images/poto3.jpg",
  },
];
export default products;
