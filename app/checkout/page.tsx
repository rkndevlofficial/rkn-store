"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../cart-context";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    cartCount,
    clearCart,
  } = useCart();

  const [payment, setPayment] = useState("UPI");
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
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

  /*
   * =========================================
   * PLACE ORDER
   * =========================================
   */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setOrderError("");

    if (cart.length === 0) {
      setOrderError(
        "Your bag is empty. Please add a product before checkout."
      );
      return;
    }

    setPlacing(true);

    /*
     * DEMO CHECKOUT
     *
     * Real payment gateway/backend
     * will be added later.
     */

    setTimeout(() => {
      const orderNumber = `RKN-${Date.now()
        .toString()
        .slice(-6)}`;

      localStorage.setItem(
        "rkn-last-order",
        JSON.stringify({
          orderNumber,
          items: cart,
          subtotal,
          shipping,
          total,
          payment,
          itemCount: cartCount,
          createdAt: new Date().toISOString(),
        })
      );

      /*
       * Clear global cart.
       *
       * CartProvider also removes
       * the cart from localStorage.
       */
      clearCart();

      router.push("/order-success");
    }, 900);
  };

  /*
   * =========================================
   * EMPTY CART
   * =========================================
   */

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link
            href="/"
            className="checkout-logo"
          >
            RKN<span>®</span>
          </Link>

          <div className="checkout-security">
            <span>🔒</span>
            SECURE CHECKOUT
          </div>

          <Link
            href="/shop"
            className="back-cart"
          >
            ← CONTINUE SHOPPING
          </Link>
        </header>

        <section className="checkout-empty">
          <p>RKN / CHECKOUT</p>

          <h1>
            YOUR BAG
            <br />
            <span>IS EMPTY.</span>
          </h1>

          <p>
            Add something to your RKN collection
            before continuing to checkout.
          </p>

          <Link
            href="/shop"
            className="checkout-shop-button"
          >
            EXPLORE COLLECTION →
          </Link>
        </section>

        <footer className="checkout-footer">
          <div className="checkout-footer-logo">
            RKN<span>®</span>
          </div>

          <span>
            © 2026 RKN. ALL RIGHTS RESERVED.
          </span>

          <div>
            <a href="#">PRIVACY</a>
            <a href="#">TERMS</a>
          </div>
        </footer>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {/* HEADER */}

      <header className="checkout-header">
        <Link
          href="/"
          className="checkout-logo"
        >
          RKN<span>®</span>
        </Link>

        <div className="checkout-security">
          <span>🔒</span>
          SECURE CHECKOUT
        </div>

        <Link
          href="/cart"
          className="back-cart"
        >
          ← BACK TO BAG
        </Link>
      </header>

      {/* TITLE */}

      <section className="checkout-title">
        <p>RKN / CHECKOUT</p>

        <h1>
          COMPLETE
          <br />
          <span>ORDER.</span>
        </h1>

        <span className="checkout-item-count">
          {cartCount}{" "}
          {cartCount === 1
            ? "ITEM"
            : "ITEMS"}
        </span>
      </section>

      {/* CHECKOUT FORM */}

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >
        {/* LEFT */}

        <div className="checkout-form">
          {/* CONTACT */}

          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>01</span>

              <div>
                <h2>
                  CONTACT INFORMATION
                </h2>

                <p>
                  We&apos;ll use this information
                  for order updates.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                <span>EMAIL ADDRESS</span>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                <span>PHONE NUMBER</span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>
          </section>

          {/* ADDRESS */}

          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>02</span>

              <div>
                <h2>
                  DELIVERY ADDRESS
                </h2>

                <p>
                  Where should we deliver your
                  order?
                </p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                <span>FIRST NAME</span>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required
                />
              </label>

              <label>
                <span>LAST NAME</span>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </label>

              <label className="full">
                <span>ADDRESS</span>

                <input
                  type="text"
                  name="address"
                  placeholder="House no., street, area"
                  required
                />
              </label>

              <label>
                <span>CITY</span>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                />
              </label>

              <label>
                <span>STATE</span>

                <select
                  name="state"
                  required
                  defaultValue=""
                >
                  <option
                    value=""
                    disabled
                  >
                    Select state
                  </option>

                  <option>Delhi</option>
                  <option>Haryana</option>
                  <option>Maharashtra</option>
                  <option>Rajasthan</option>
                  <option>Gujarat</option>
                  <option>
                    Uttar Pradesh
                  </option>
                  <option>
                    Madhya Pradesh
                  </option>
                  <option>Punjab</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                <span>PIN CODE</span>

                <input
                  type="text"
                  name="pin"
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                  required
                />
              </label>
            </div>
          </section>

          {/* PAYMENT */}

          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>03</span>

              <div>
                <h2>
                  PAYMENT METHOD
                </h2>

                <p>
                  Choose your preferred payment
                  method.
                </p>
              </div>
            </div>

            <div className="payment-options">
              <button
                type="button"
                className={
                  payment === "UPI"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setPayment("UPI")
                }
              >
                <strong>UPI</strong>

                <span>
                  Google Pay / PhonePe / Paytm
                </span>
              </button>

              <button
                type="button"
                className={
                  payment === "CARD"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setPayment("CARD")
                }
              >
                <strong>CARDS</strong>

                <span>
                  Credit / Debit Card
                </span>
              </button>

              <button
                type="button"
                className={
                  payment === "COD"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setPayment("COD")
                }
              >
                <strong>COD</strong>

                <span>
                  Cash on Delivery
                </span>
              </button>
            </div>

            {/* UPI */}

            {payment === "UPI" && (
              <div className="payment-message">
                <span>UPI</span>

                <p>
                  You&apos;ll be redirected to
                  your preferred UPI app after
                  placing the order.
                </p>
              </div>
            )}

            {/* CARD */}

            {payment === "CARD" && (
              <div className="card-demo">
                <label>
                  <span>CARD NUMBER</span>

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    inputMode="numeric"
                  />
                </label>

                <div className="form-grid">
                  <label>
                    <span>EXPIRY</span>

                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                    />
                  </label>

                  <label>
                    <span>CVV</span>

                    <input
                      type="password"
                      name="cvv"
                      placeholder="•••"
                      maxLength={3}
                      inputMode="numeric"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* COD */}

            {payment === "COD" && (
              <div className="payment-message">
                <span>COD</span>

                <p>
                  Pay securely in cash when
                  your RKN order arrives.
                </p>
              </div>
            )}
          </section>

          {/* ERROR */}

          {orderError && (
            <div className="checkout-error">
              {orderError}
            </div>
          )}

          {/* PLACE ORDER */}

          <button
            className="place-order-button"
            type="submit"
            disabled={placing}
          >
            {placing
              ? "PLACING ORDER..."
              : `PLACE ORDER · ${formatPrice(
                  total
                )}`}
          </button>
        </div>

        {/* RIGHT — SUMMARY */}

        <aside className="checkout-summary">
          <p>RKN / ORDER SUMMARY</p>

          <h2>YOUR ORDER.</h2>

          {/* PRODUCTS */}

          <div className="checkout-products">
            {cart.map((item) => (
              <div
                className="checkout-product"
                key={`${item.id}-${item.size}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  unoptimized
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    Size {item.size} ×{" "}
                    {item.quantity}
                  </p>

                  <strong>
                    {formatPrice(
                      item.price *
                        item.quantity
                    )}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-divider" />

          {/* SUBTOTAL */}

          <div className="checkout-row">
            <span>SUBTOTAL</span>

            <strong>
              {formatPrice(subtotal)}
            </strong>
          </div>

          {/* SHIPPING */}

          <div className="checkout-row">
            <span>SHIPPING</span>

            <strong>
              {shipping === 0
                ? "FREE"
                : formatPrice(shipping)}
            </strong>
          </div>

          <div className="checkout-divider" />

          {/* TOTAL */}

          <div className="checkout-total">
            <span>TOTAL</span>

            <strong>
              {formatPrice(total)}
            </strong>
          </div>

          <p className="checkout-tax">
            INCLUDING ALL APPLICABLE TAXES
          </p>

          <div className="secure-note">
            <span>🔒</span>

            <p>
              Your payment information is
              encrypted and secure.
            </p>
          </div>
        </aside>
      </form>

      {/* FOOTER */}

      <footer className="checkout-footer">
        <div className="checkout-footer-logo">
          RKN<span>®</span>
        </div>

        <span>
          © 2026 RKN. ALL RIGHTS RESERVED.
        </span>

        <div>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
        </div>
      </footer>
    </main>
  );
}