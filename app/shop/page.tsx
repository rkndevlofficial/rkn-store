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
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });

    switch (sort) {
      case "low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "name":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        break;
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

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setSort("featured");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="shop-page">
      {/* =================================
          HEADER
      ================================= */}
      <header className="shop-header">
        <Link href="/" className="shop-logo">
          RKN<span>®</span>
        </Link>

        <nav className="shop-nav">
          <Link href="/">HOME</Link>
          <Link href="/shop" className="active">
            SHOP
          </Link>
          <Link href="/shop?category=men">MEN</Link>
          <Link href="/shop?category=women">WOMEN</Link>
        </nav>

        <div className="shop-actions">
          <span aria-label={`${wishlist.length} wishlist items`}>
            ♡ {wishlist.length}
          </span>

          <Link href="/cart" aria-label={`${cartCount} items in cart`}>
            🛍 {cartCount}
          </Link>
        </div>
      </header>

      {/* =================================
          HERO
      ================================= */}
      <section className="shop-hero">
        <div>
          <p className="v2-label">RKN / COLLECTION</p>

          <h1>
            THE
            <br />
            <span>COLLECTION.</span>
          </h1>
        </div>

        <p className="shop-hero-text">
          Explore premium essentials, timeless silhouettes
          <br />
          and the latest RKN styles.
        </p>
      </section>

      {/* =================================
          CONTENT
      ================================= */}
      <section className="shop-content">
        {/* Toolbar */}
        <div className="shop-toolbar">
          <div className="category-tabs">
            {(["ALL", "MEN", "WOMEN", "UNISEX"] as Category[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="shop-controls">
            <label className="search-box">
              <span>⌕</span>

              <input
                type="search"
                placeholder="SEARCH PRODUCTS"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

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

        {/* Product count */}
        <div className="product-count">
          <span>{filteredProducts.length} PRODUCTS</span>

          {(search || category !== "ALL" || sort !== "featured") && (
            <button type="button" onClick={clearFilters}>
              CLEAR FILTERS ×
            </button>
          )}
        </div>

        {/* =================================
            PRODUCT GRID
        ================================= */}
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <article
                  className="shop-product-card"
                  key={product.id}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="shop-product-image"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={900}
                      height={1200}
                      unoptimized
                    />

                    {product.badge && (
                      <span className="shop-badge">
                        {product.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      className={`shop-wishlist ${
                        isWishlisted ? "wishlisted" : ""
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      aria-label={`${
                        isWishlisted ? "Remove" : "Add"
                      } ${product.name} ${
                        isWishlisted ? "from" : "to"
                      } wishlist`}
                    >
                      {isWishlisted ? "♥" : "♡"}
                    </button>

                    <span className="shop-view">
                      VIEW PRODUCT →
                    </span>
                  </Link>

                  <button
                    type="button"
                    className="shop-add"
                    onClick={() =>
                      setCartCount((count) => count + 1)
                    }
                  >
                    ADD TO CART +
                  </button>

                  <div className="shop-product-info">
                    <p>{product.category}</p>

                    <h2>{product.name}</h2>

                    <div className="shop-price">
                      <strong>
                        {formatPrice(product.price)}
                      </strong>

                      {product.oldPrice && (
                        <del>
                          {formatPrice(product.oldPrice)}
                        </del>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="no-products">
            <p className="v2-label">RKN / SEARCH</p>

            <h2>NO PRODUCTS FOUND.</h2>

            <p>
              Try another search or select a different category.
            </p>

            <button type="button" onClick={clearFilters}>
              CLEAR FILTERS →
            </button>
          </div>
        )}
      </section>

      {/* =================================
          CTA
      ================================= */}
      <section className="shop-cta">
        <p className="v2-label">RKN / ESSENTIALS</p>

        <h2>
          FIND YOUR
          <br />
          <span>IDENTITY.</span>
        </h2>

        <Link href="/" className="v2-button dark-button">
          BACK TO HOME →
        </Link>
      </section>

      {/* =================================
          FOOTER
      ================================= */}
      <footer className="shop-footer">
        <div className="shop-footer-grid">
          <div>
            <div className="shop-footer-logo">
              RKN<span>®</span>
            </div>

            <p>
              Modern clothing.
              <br />
              Timeless identity.
            </p>
          </div>

          <div>
            <h3>SHOP</h3>

            <Link href="/shop">All Products</Link>
            <Link href="/shop?category=men">Men</Link>
            <Link href="/shop?category=women">Women</Link>
            <Link href="/shop">New Arrivals</Link>
          </div>

          <div>
            <h3>HELP</h3>

            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
          </div>

          <div>
            <h3>FOLLOW</h3>

            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>

        <div className="shop-footer-bottom">
          <span>© 2026 RKN. ALL RIGHTS RESERVED.</span>
          <span>PRIVACY / TERMS</span>
        </div>
      </footer>
    </main>
  );
}