"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../cart-context";

type Product = {
  id: number;
  name: string;
  category: "MEN" | "WOMEN" | "UNISEX";
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  description: string;
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
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",
    description:
      "A clean oversized silhouette designed for everyday comfort. Premium feel, effortless styling and a timeless RKN identity.",
  },
  {
    id: 2,
    name: "Premium White Shirt",
    category: "MEN",
    price: 1899,
    oldPrice: 2499,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",
    description:
      "A refined everyday shirt with a clean silhouette and premium finish. Designed to move effortlessly from casual to elevated.",
  },
  {
    id: 3,
    name: "Essential Black Hoodie",
    category: "UNISEX",
    price: 2299,
    oldPrice: 2999,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=90",
    description:
      "A versatile heavyweight-inspired hoodie built around comfort, simplicity and modern streetwear styling.",
  },
  {
    id: 4,
    name: "Minimal Fashion Top",
    category: "WOMEN",
    price: 999,
    oldPrice: 1399,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
    description:
      "Minimal styling with an effortless silhouette. A versatile essential made for everyday RKN looks.",
  },
  {
    id: 5,
    name: "RKN Premium Black Shirt",
    category: "MEN",
    price: 1999,
    oldPrice: 2599,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90",
    description:
      "A sharp black shirt designed with a modern fit and timeless appeal. An essential piece for a refined wardrobe.",
  },
  {
    id: 6,
    name: "Classic Denim Jacket",
    category: "UNISEX",
    price: 2499,
    oldPrice: 3299,
    badge: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90",
    description:
      "A classic denim layer with a relaxed contemporary feel. Designed to pair effortlessly with your everyday essentials.",
  },
  {
    id: 7,
    name: "Relaxed Everyday Outfit",
    category: "WOMEN",
    price: 1599,
    oldPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90",
    description:
      "An easy everyday silhouette balancing comfort and modern styling. Made for effortless day-to-day dressing.",
  },
  {
    id: 8,
    name: "Premium Streetwear Hoodie",
    category: "UNISEX",
    price: 2199,
    oldPrice: 2899,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=1200&q=90",
    description:
      "Modern streetwear styling with a relaxed fit and premium everyday character.",
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart, cartCount } = useCart();

  const productId = Number(params.id);

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId]
  );

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!product) {
    return (
      <main className="product-not-found">
        <p className="v2-label">RKN / PRODUCT</p>

        <h1>PRODUCT NOT FOUND.</h1>

        <Link href="/shop" className="product-back-button">
          BACK TO SHOP →
        </Link>
      </main>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  /*
   * =========================================
   * ADD TO CART
   * =========================================
   */

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      size: selectedSize,
      price: product.price,
      quantity,
      image: product.image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  /*
   * =========================================
   * BUY NOW
   * =========================================
   */

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      size: selectedSize,
      price: product.price,
      quantity,
      image: product.image,
    });

    setTimeout(() => {
      router.push("/checkout");
    }, 250);
  };

  return (
    <main className="product-page">
      {/* =================================
          HEADER
      ================================= */}

      <header className="product-header">
        <Link href="/" className="product-logo">
          RKN<span>®</span>
        </Link>

        <nav>
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/shop?category=men">MEN</Link>
          <Link href="/shop?category=women">WOMEN</Link>
        </nav>

        <div className="product-header-actions">
          <button
            type="button"
            onClick={() => setWishlist(!wishlist)}
            aria-label="Wishlist"
          >
            {wishlist ? "♥" : "♡"}
          </button>

          <Link href="/cart" aria-label="Shopping cart">
            🛍
            {cartCount > 0 && (
              <sup className="product-cart-count">
                {cartCount}
              </sup>
            )}
          </Link>
        </div>
      </header>

      {/* =================================
          BREADCRUMB
      ================================= */}

      <div className="product-breadcrumb">
        <Link href="/">HOME</Link>

        <span>/</span>

        <Link href="/shop">SHOP</Link>

        <span>/</span>

        <span>{product.name.toUpperCase()}</span>
      </div>

      {/* =================================
          PRODUCT DETAIL
      ================================= */}

      <section className="product-detail">
        {/* IMAGE */}

        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1500}
            priority
            unoptimized
          />

          {product.badge && (
            <span className="product-detail-badge">
              {product.badge}
            </span>
          )}

          <button
            type="button"
            className={`product-detail-wishlist ${
              wishlist ? "active" : ""
            }`}
            onClick={() => setWishlist(!wishlist)}
            aria-label="Add to wishlist"
          >
            {wishlist ? "♥" : "♡"}
          </button>
        </div>

        {/* INFO */}

        <div className="product-detail-info">
          <p className="product-category-label">
            RKN / {product.category}
          </p>

          <h1>{product.name}</h1>

          {/* PRICE */}

          <div className="product-detail-price">
            <strong>{formatPrice(product.price)}</strong>

            {product.oldPrice && (
              <>
                <del>{formatPrice(product.oldPrice)}</del>

                <span>{discount}% OFF</span>
              </>
            )}
          </div>

          {/* DESCRIPTION */}

          <p className="product-description">
            {product.description}
          </p>

          {/* SIZE */}

          <div className="product-option">
            <div className="option-heading">
              <span>SELECT SIZE</span>

              <button type="button">
                SIZE GUIDE
              </button>
            </div>

            <div className="size-grid">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={
                    selectedSize === size
                      ? "selected"
                      : ""
                  }
                  onClick={() => {
                    setSelectedSize(size);
                    setAdded(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}

          <div className="product-option">
            <div className="option-heading">
              <span>QUANTITY</span>
            </div>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="product-actions">
            <button
              type="button"
              className={`add-cart-button ${
                added ? "added" : ""
              }`}
              onClick={handleAddToCart}
            >
              {added
                ? "ADDED TO CART ✓"
                : "ADD TO CART"}
            </button>

            <button
              type="button"
              className="buy-now-button"
              onClick={handleBuyNow}
            >
              BUY IT NOW →
            </button>
          </div>

          {/* BENEFITS */}

          <div className="product-benefits">
            <div>
              <span>01</span>

              <div>
                <strong>FREE SHIPPING</strong>

                <p>
                  On orders above ₹1,999
                </p>
              </div>
            </div>

            <div>
              <span>02</span>

              <div>
                <strong>EASY RETURNS</strong>

                <p>
                  Simple and hassle-free returns
                </p>
              </div>
            </div>

            <div>
              <span>03</span>

              <div>
                <strong>SECURE PAYMENT</strong>

                <p>
                  Safe and secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          PRODUCT STORY
      ================================= */}

      <section className="product-story">
        <div>
          <p className="v2-label">
            RKN / DETAILS
          </p>

          <h2>
            DESIGNED
            <br />
            <span>FOR EVERYDAY.</span>
          </h2>
        </div>

        <p>
          Every RKN piece is created around the idea
          that good clothing doesn&apos;t need to shout.
          Clean silhouettes, timeless styling and details
          that let your identity do the talking.
        </p>
      </section>

      {/* =================================
          CTA
      ================================= */}

      <section className="product-bottom-cta">
        <p className="v2-label">
          RKN / COLLECTION
        </p>

        <h2>
          KEEP
          <br />
          <span>EXPLORING.</span>
        </h2>

        <Link
          href="/shop"
          className="product-back-button"
        >
          SHOP COLLECTION →
        </Link>
      </section>

      {/* =================================
          FOOTER
      ================================= */}

      <footer className="product-footer">
        <div>
          <div className="product-footer-logo">
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

          <Link href="/shop">
            All Products
          </Link>

          <Link href="/shop?category=men">
            Men
          </Link>

          <Link href="/shop?category=women">
            Women
          </Link>

          <Link href="/shop">
            New Arrivals
          </Link>
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
      </footer>
    </main>
  );
}