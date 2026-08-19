"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Classic Black Oversized Tee",
    category: "MEN",
    price: 1299,
    oldPrice: 1799,
    description:
      "A premium oversized essential designed for everyday confidence. Crafted with a comfortable heavyweight feel and a clean RKN silhouette.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 2,
    name: "Premium White Shirt",
    category: "MEN",
    price: 1899,
    oldPrice: 2499,
    description:
      "A refined everyday shirt with a clean premium finish. Designed to work effortlessly from casual days to elevated evenings.",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 3,
    name: "Essential Black Hoodie",
    category: "UNISEX",
    price: 2299,
    oldPrice: 2999,
    description:
      "A heavyweight everyday hoodie built for comfort and a strong minimal look. An essential RKN layer for every season.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: 4,
    name: "Minimal Fashion Top",
    category: "WOMEN",
    price: 999,
    oldPrice: 1399,
    description:
      "A minimal everyday top with a modern silhouette and versatile styling. Designed for effortless RKN looks.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
    ],
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [productId, setProductId] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const router = useRouter();

  useState(() => {
    params.then(({ id }) => {
      setProductId(Number(id));
    });
  });

  const product = products.find((item) => item.id === productId);

  if (productId === null) {
    return (
      <main className="product-loading">
        <div>RKN</div>
        <p>LOADING PRODUCT...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-not-found">
        <p>RKN / PRODUCT</p>
        <h1>PRODUCT NOT FOUND.</h1>
        <Link href="/shop">BACK TO SHOP →</Link>
      </main>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    router.push("/checkout");
  };

  return (
    <main className="product-page">
      {/* Header */}
      <header className="product-header">
        <Link href="/" className="product-logo">
          RKN<span>®</span>
        </Link>

        <nav>
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/shop">MEN</Link>
          <Link href="/shop">WOMEN</Link>
        </nav>

        <div className="product-header-actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Wishlist">♡</button>
          <Link href="/cart">🛍</Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <Link href="/">HOME</Link>
        <span>/</span>
        <Link href="/shop">SHOP</Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      {/* Product */}
      <section className="product-main">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-thumbnails">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={96}
                  height={96}
                />
              </button>
            ))}
          </div>

          <div className="product-main-image">
            <Image
              src={product.gallery[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />

            {discount > 0 && (
              <span className="product-discount">-{discount}%</span>
            )}

            <button
              className={`product-favorite ${
                wishlist ? "active" : ""
              }`}
              onClick={() => setWishlist(!wishlist)}
              aria-label="Add to wishlist"
            >
              {wishlist ? "♥" : "♡"}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="product-details">
          <p className="product-category">{product.category}</p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            <span>★★★★★</span>
            <span>4.9</span>
            <Link href="#reviews">128 REVIEWS</Link>
          </div>

          <div className="product-pricing">
            <strong>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </strong>

            {product.oldPrice && (
              <del>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(product.oldPrice)}
              </del>
            )}

            {discount > 0 && <span>{discount}% OFF</span>}
          </div>

          <div className="product-divider" />

          <p className="product-description">{product.description}</p>

          {/* Size */}
          <div className="size-section">
            <div className="size-heading">
              <span>SELECT SIZE</span>
              <button>SIZE GUIDE</button>
            </div>

            <div className="sizes">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <span>QUANTITY</span>

            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((current) => current + 1)}>
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <button className="add-cart-button" onClick={handleAddToCart}>
              {added ? "ADDED TO CART ✓" : "ADD TO CART"}
            </button>

            <button className="buy-now-button" onClick={handleBuyNow}>
              BUY IT NOW
            </button>
          </div>

          {/* Benefits */}
          <div className="product-benefits">
            <div>
              <span>01</span>
              <div>
                <strong>FREE SHIPPING</strong>
                <p>On orders above ₹1,999</p>
              </div>
            </div>

            <div>
              <span>02</span>
              <div>
                <strong>EASY RETURNS</strong>
                <p>7-day easy return policy</p>
              </div>
            </div>

            <div>
              <span>03</span>
              <div>
                <strong>SECURE PAYMENT</strong>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="product-description-section">
        <div>
          <p>RKN / DETAILS</p>
          <h2>DESIGNED FOR<br />EVERYDAY.</h2>
        </div>

        <div>
          <p>
            Every RKN piece is designed around the idea that great clothing
            should feel effortless. Clean lines, versatile styling and
            carefully considered details make this piece an everyday
            essential.
          </p>

          <div className="detail-list">
            <div>
              <span>FABRIC</span>
              <strong>Premium Cotton Blend</strong>
            </div>

            <div>
              <span>FIT</span>
              <strong>Relaxed / Oversized</strong>
            </div>

            <div>
              <span>CARE</span>
              <strong>Machine Wash Cold</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews" id="reviews">
        <p>RKN / REVIEWS</p>
        <h2>WHAT PEOPLE SAY.</h2>

        <div className="review-grid">
          <article>
            <div>★★★★★</div>
            <p>
              “The quality feels premium and the fit is exactly what I
              wanted.”
            </p>
            <span>— ARJUN M.</span>
          </article>

          <article>
            <div>★★★★★</div>
            <p>
              “Super clean design. Looks even better in person.”
            </p>
            <span>— RAHUL K.</span>
          </article>

          <article>
            <div>★★★★★</div>
            <p>
              “Really comfortable and the delivery was quick.”
            </p>
            <span>— PRIYA S.</span>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="product-footer">
        <div className="product-footer-logo">
          RKN<span>®</span>
        </div>

        <div>
          <a href="/shop">SHOP</a>
          <a href="#">CONTACT</a>
          <a href="#">SHIPPING</a>
          <a href="#">RETURNS</a>
        </div>
      </footer>
    </main>
  );
}