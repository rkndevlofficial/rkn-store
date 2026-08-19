"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [payment, setPayment] = useState("UPI");
  const [placing, setPlacing] = useState(false);

  const subtotal = 3598;
  const shipping = 0;
  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPlacing(true);

    setTimeout(() => {
      router.push("/order-success");
    }, 900);
  };

  return (
    <main className="checkout-page">
      {/* Header */}
      <header className="checkout-header">
        <Link href="/" className="checkout-logo">
          RKN<span>®</span>
        </Link>

        <div className="checkout-security">
          <span>🔒</span>
          SECURE CHECKOUT
        </div>

        <a href="/cart" className="back-cart">
          ← BACK TO BAG
        </a>
      </header>

      {/* Page title */}
      <section className="checkout-title">
        <p>RKN / CHECKOUT</p>

        <h1>
          COMPLETE
          <br />
          <span>ORDER.</span>
        </h1>
      </section>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        {/* LEFT */}
        <div className="checkout-form">
          {/* Contact */}
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>01</span>
              <div>
                <h2>CONTACT INFORMATION</h2>
                <p>We&apos;ll use this information for order updates.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                <span>EMAIL ADDRESS</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                <span>PHONE NUMBER</span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>
          </section>

          {/* Address */}
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>02</span>
              <div>
                <h2>DELIVERY ADDRESS</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                <span>FIRST NAME</span>
                <input type="text" placeholder="First name" required />
              </label>

              <label>
                <span>LAST NAME</span>
                <input type="text" placeholder="Last name" required />
              </label>

              <label className="full">
                <span>ADDRESS</span>
                <input
                  type="text"
                  placeholder="House no., street, area"
                  required
                />
              </label>

              <label>
                <span>CITY</span>
                <input type="text" placeholder="City" required />
              </label>

              <label>
                <span>STATE</span>
                <select required defaultValue="">
                  <option value="" disabled>
                    Select state
                  </option>
                  <option>Delhi</option>
                  <option>Haryana</option>
                  <option>Maharashtra</option>
                  <option>Rajasthan</option>
                  <option>Gujarat</option>
                  <option>Uttar Pradesh</option>
                  <option>Madhya Pradesh</option>
                  <option>Punjab</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                <span>PIN CODE</span>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </label>
            </div>
          </section>

          {/* Payment */}
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>03</span>
              <div>
                <h2>PAYMENT METHOD</h2>
                <p>Choose your preferred payment method.</p>
              </div>
            </div>

            <div className="payment-options">
              <button
                type="button"
                className={payment === "UPI" ? "selected" : ""}
                onClick={() => setPayment("UPI")}
              >
                <strong>UPI</strong>
                <span>Google Pay / PhonePe / Paytm</span>
              </button>

              <button
                type="button"
                className={payment === "CARD" ? "selected" : ""}
                onClick={() => setPayment("CARD")}
              >
                <strong>CARDS</strong>
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                className={payment === "COD" ? "selected" : ""}
                onClick={() => setPayment("COD")}
              >
                <strong>COD</strong>
                <span>Cash on Delivery</span>
              </button>
            </div>

            {payment === "UPI" && (
              <div className="payment-message">
                <span>UPI</span>
                <p>
                  You&apos;ll be redirected to your preferred UPI app after
                  placing the order.
                </p>
              </div>
            )}

            {payment === "CARD" && (
              <div className="card-demo">
                <label>
                  <span>CARD NUMBER</span>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </label>

                <div className="form-grid">
                  <label>
                    <span>EXPIRY</span>
                    <input type="text" placeholder="MM / YY" />
                  </label>

                  <label>
                    <span>CVV</span>
                    <input type="password" placeholder="•••" maxLength={3} />
                  </label>
                </div>
              </div>
            )}

            {payment === "COD" && (
              <div className="payment-message">
                <span>COD</span>
                <p>
                  Pay securely in cash when your RKN order arrives.
                </p>
              </div>
            )}
          </section>

          {/* Submit */}
          <button className="place-order-button" type="submit">
            {placing ? "PLACING ORDER..." : "PLACE ORDER →"}
          </button>
        </div>

        {/* RIGHT SUMMARY */}
        <aside className="checkout-summary">
          <p>RKN / ORDER SUMMARY</p>

          <h2>YOUR ORDER.</h2>

          <div className="checkout-product">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=85"
              alt="Classic Black Oversized Tee"
              width={500}
              height={500}
            />

            <div>
              <h3>Classic Black Oversized Tee</h3>
              <p>Size M × 1</p>
              <strong>{formatPrice(1299)}</strong>
            </div>
          </div>

          <div className="checkout-product">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=85"
              alt="Essential Black Hoodie"
              width={500}
              height={500}
            />

            <div>
              <h3>Essential Black Hoodie</h3>
              <p>Size L × 1</p>
              <strong>{formatPrice(2299)}</strong>
            </div>
          </div>

          <div className="checkout-divider" />

          <div className="checkout-row">
            <span>SUBTOTAL</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className="checkout-row">
            <span>SHIPPING</span>
            <strong>FREE</strong>
          </div>

          <div className="checkout-divider" />

          <div className="checkout-total">
            <span>TOTAL</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <p className="checkout-tax">
            INCLUDING ALL APPLICABLE TAXES
          </p>

          <div className="secure-note">
            <span>🔒</span>
            <p>
              Your payment information is encrypted and secure.
            </p>
          </div>
        </aside>
      </form>

      <footer className="checkout-footer">
        <div className="checkout-footer-logo">
          RKN<span>®</span>
        </div>

        <span>© 2026 RKN. ALL RIGHTS RESERVED.</span>

        <div>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
        </div>
      </footer>
    </main>
  );
}