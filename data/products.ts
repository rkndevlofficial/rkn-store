export type Product = {
  id: string;
  name: string;
  category: "MEN" | "WOMEN" | "UNISEX";
  price: number;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "rkn-classic-black-tee",
    name: "Classic Black Tee",
    category: "MEN",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    badge: "BESTSELLER",
  },
  {
    id: "rkn-premium-white-shirt",
    name: "Premium White Shirt",
    category: "MEN",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    badge: "NEW",
  },
  {
    id: "rkn-essential-hoodie",
    name: "Essential Black Hoodie",
    category: "UNISEX",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "rkn-minimal-fashion-top",
    name: "Minimal Fashion Top",
    category: "WOMEN",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    badge: "NEW",
  },
];