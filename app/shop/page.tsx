"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Category = "ALL" | "MEN" | "WOMEN" | "UNISEX";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "ALL">;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Black Oversized Tee",
    category: "MEN",
    price: 1299,
    oldPrice: 1799,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Premium White Shirt",
    category: "MEN",
    price: 1899,
    oldPrice: 2499,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Essential Black Hoodie",
    category: "UNISEX",
    price: 2299,
    oldPrice: 2999,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Minimal Fashion Top",
    category: "WOMEN",
    price: 999,
    oldPrice: 1399,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "RKN Premium Black Shirt",
    category: "MEN",
    price: 1999,
    oldPrice: 2599,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Classic Denim Jacket",
    category: "UNISEX",
    price: 2499,
    oldPrice: 3299,
    badge: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Relaxed Everyday Outfit",
    category: "WOMEN",
    price: 1599,
    oldPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Premium Streetwear Hoodie",
    category: "UNISEX",
    price: 2199,
    oldPrice: 2899,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=900&q=85",
  },
];

export default function ShopPage() {
  const [category, setCategory] = useState<Category>("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "ALL" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [category, search, sort]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="shop-page">
      {/* Header */}
      <header className="shop-header">
        <div>
          <Link href="/" className="shop-logo">
            RKN<span>®</span>
          </Link>
        </div>

        <nav className="shop-nav">
          <Link href="/">HOME</Link>
          <a href="/shop" className="active">
            SHOP
          </a>
          <a href="/shop?category=men">MEN</a>
          <a href="/shop?category=women">WOMEN</a>
        </nav>

        <div className="shop-actions">
          <span>♡ {wishlist.length}</span>
          <span>🛍 {cartCount}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="shop-hero">
        <p>RKN / COLLECTION</p>

        <h1>
          THE
          <br />
          <span>COLLECTION.</span>
        </h1>

        <div>
          <p>
            Explore premium essentials, timeless silhouettes
            <br />
            and the latest RKN styles.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="shop-content">
        <div className="shop-toolbar">
          <div className="category-tabs">
            {(["ALL", "MEN", "WOMEN", "UNISEX"] as Category[]).map(
              (item) => (
                <button
                  key={item}
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="shop-controls">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="SEARCH PRODUCTS"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">FEATURED</option>
              <option value="low">PRICE: LOW TO HIGH</option>
              <option value="high">PRICE: HIGH TO LOW</option>
              <option value="name">NAME</option>
            </select>
          </div>
        </div>

        <div className="product-count">
          {filteredProducts.length} PRODUCTS
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <article className="shop-product-card" key={product.id}>
                  <div className="shop-product-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={900}
                      height={1200}
                      unoptimized
                    />

                    {product.badge && (
                      <span className="shop-badge">{product.badge}</span>
                    )}

                    <button
                      className={`shop-wishlist ${
                        isWishlisted ? "wishlisted" : ""
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Wishlist ${product.name}`}
                    >
                      {isWishlisted ? "♥" : "♡"}
                    </button>

                    <button
                      className="shop-add"
                      onClick={() => setCartCount((count) => count + 1)}
                    >
                      ADD TO CART +
                    </button>
                  </div>

                  <div className="shop-product-info">
                    <p>{product.category}</p>

                    <h2>{product.name}</h2>

                    <div className="shop-price">
                      <strong>{formatPrice(product.price)}</strong>

                      {product.oldPrice && (
                        <del>{formatPrice(product.oldPrice)}</del>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="no-products">
            <h2>NO PRODUCTS FOUND.</h2>
            <p>Try another search or category.</p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("ALL");
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="shop-footer">
        <div>
          <div className="shop-footer-logo">
            RKN<span>®</span>
          </div>

          <p>Modern clothing. Timeless identity.</p>
        </div>

        <div>
          <h3>SHOP</h3>
          <a href="/shop">All Products</a>
          <a href="/shop">Men</a>
          <a href="/shop">Women</a>
          <a href="/shop">New Arrivals</a>
        </div>

        <div>
          <h3>HELP</h3>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </div>
      </footer>
    </main>
  );
}