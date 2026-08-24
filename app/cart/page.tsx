"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../cart-context";

export default function CartPage() {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal === 0 || subtotal >= 1999 ? 0 : 99;

  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="cart-page">
      {/* HEADER */}

      <header className="cart-header">
        <Link href="/" className="cart-logo">
          RKN<span>®</span>
        </Link>

        <nav>
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/shop?category=men">MEN</Link>
          <Link href="/shop?category=women">WOMEN</Link>
        </nav>

        <div className="cart-header-right">
          <span>SECURE CHECKOUT</span>

          <Link href="/shop">
            CONTINUE SHOPPING →
          </Link>
        </div>
      </header>

      {/* TITLE */}

      <section className="cart-title">
        <p>RKN / YOUR BAG</p>

        <h1>
          SHOPPING
          <br />
          <span>BAG.</span>
        </h1>

        <span className="cart-item-count">
          {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
        </span>
      </section>

      {/* CART */}

      {cart.length > 0 ? (
        <section className="cart-content">
          {/* ITEMS */}

          <div className="cart-items">
            <div className="cart-items-heading">
              <span>PRODUCT</span>
              <span>PRICE</span>
            </div>

            {cart.map((item) => (
              <article
                className="cart-item"
                key={`${item.id}-${item.size}`}
              >
                <div className="cart-product">
                  <Link
                    href={`/product/${item.id}`}
                    className="cart-image"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={800}
                      height={1000}
                      unoptimized
                    />
                  </Link>

                  <div className="cart-product-info">
                    <p>{item.category}</p>

                    <h2>{item.name}</h2>

                    <span>
                      SIZE: {item.size}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                    >
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="cart-price-area">
                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          -1
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          1
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </strong>
                </div>
              </article>
            ))}

            {/* SHIPPING NOTE */}

            <div className="cart-note">
              <span>RKN / SHIPPING</span>

              <p>
                Free shipping is automatically applied to
                orders above ₹1,999.
              </p>
            </div>

            {/* CLEAR BAG */}

            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCart}
            >
              CLEAR BAG
            </button>
          </div>

          {/* SUMMARY */}

          <aside className="cart-summary">
            <p className="summary-label">
              ORDER SUMMARY
            </p>

            <h2>SUMMARY.</h2>

            <div className="summary-row">
              <span>SUBTOTAL</span>

              <strong>
                {formatPrice(subtotal)}
              </strong>
            </div>

            <div className="summary-row">
              <span>SHIPPING</span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : formatPrice(shipping)}
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>TOTAL</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <p className="tax-note">
              INCLUDING ALL APPLICABLE TAXES
            </p>

            <Link
              href="/checkout"
              className="checkout-button"
            >
              PROCEED TO CHECKOUT →
            </Link>

            <div className="payment-icons">
              <span>UPI</span>
              <span>VISA</span>
              <span>MC</span>
              <span>COD</span>
            </div>
          </aside>
        </section>
      ) : (
        /* EMPTY BAG */

        <section className="empty-cart">
          <div>
            <span>RKN / 00</span>

            <h2>
              YOUR BAG
              <br />
              IS EMPTY.
            </h2>

            <p>
              Looks like you haven&apos;t added anything
              to your bag yet.
            </p>

            <Link href="/shop">
              EXPLORE COLLECTION →
            </Link>
          </div>
        </section>
      )}

      {/* FOOTER */}

      <footer className="cart-footer">
        <div className="cart-footer-logo">
          RKN<span>®</span>
        </div>

        <div>
          <Link href="/shop">SHOP</Link>
          <Link href="#">PRIVACY</Link>
          <Link href="#">TERMS</Link>
          <Link href="#">CONTACT</Link>
        </div>

        <span>© 2026 RKN</span>
      </footer>
    </main>
  );
}