"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const initialCart = [
  {
    id: 1,
    name: "Classic Black Oversized Tee",
    category: "MEN",
    size: "M",
    price: 1299,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Essential Black Hoodie",
    category: "UNISEX",
    size: "L",
    price: 2299,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: number, change: number) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <Link href="/" className="cart-logo">
          RKN<span>®</span>
        </Link>

        <nav>
          <Link href="/">HOME</Link>
          <a href="/shop">SHOP</a>
          <a href="/shop">MEN</a>
          <a href="/shop">WOMEN</a>
        </nav>

        <div className="cart-header-right">
          <span>SECURE CHECKOUT</span>
          <a href="/shop">CONTINUE SHOPPING →</a>
        </div>
      </header>

      {/* Title */}
      <section className="cart-title">
        <p>RKN / YOUR BAG</p>
        <h1>
          SHOPPING
          <br />
          <span>BAG.</span>
        </h1>

        <span className="cart-item-count">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
        </span>
      </section>

      {cart.length > 0 ? (
        <section className="cart-content">
          {/* Items */}
          <div className="cart-items">
            <div className="cart-items-heading">
              <span>PRODUCT</span>
              <span>PRICE</span>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-product">
                  <a href={`/product/${item.id}`} className="cart-image">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={800}
                      height={1000}
                      unoptimized
                    />
                  </a>

                  <div className="cart-product-info">
                    <p>{item.category}</p>

                    <h2>{item.name}</h2>

                    <span>SIZE: {item.size}</span>

                    <button onClick={() => removeItem(item.id)}>
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="cart-price-area">
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <strong>
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              </article>
            ))}

            <div className="cart-note">
              <span>RKN / NOTE</span>
              <p>
                Free shipping is automatically applied to orders above ₹1,999.
              </p>
            </div>
          </div>

          {/* Summary */}
          <aside className="cart-summary">
            <p className="summary-label">ORDER SUMMARY</p>

            <h2>SUMMARY.</h2>

            <div className="summary-row">
              <span>SUBTOTAL</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>SHIPPING</span>
              <strong>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>TOTAL</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p className="tax-note">INCLUDING ALL APPLICABLE TAXES</p>

            <a href="/checkout" className="checkout-button">
              PROCEED TO CHECKOUT →
            </a>

            <div className="payment-icons">
              <span>UPI</span>
              <span>VISA</span>
              <span>MC</span>
              <span>COD</span>
            </div>
          </aside>
        </section>
      ) : (
        <section className="empty-cart">
          <div>
            <span>RKN / 00</span>

            <h2>
              YOUR BAG
              <br />
              IS EMPTY.
            </h2>

            <p>
              Looks like you haven&apos;t added anything to your bag yet.
            </p>

            <a href="/shop">EXPLORE COLLECTION →</a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="cart-footer">
        <div className="cart-footer-logo">
          RKN<span>®</span>
        </div>

        <div>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
          <a href="#">CONTACT</a>
        </div>

        <span>© 2026 RKN</span>
      </footer>
    </main>
  );
}