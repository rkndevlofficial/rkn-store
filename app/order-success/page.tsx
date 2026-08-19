import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="success-page">
      {/* Header */}
      <header className="success-header">
        <Link href="/" className="success-logo">
          RKN<span>®</span>
        </Link>

        <span>ORDER CONFIRMATION</span>

        <Link href="/shop">CONTINUE SHOPPING →</Link>
      </header>

      {/* Main */}
      <section className="success-main">
        <div className="success-number">RKN / 2026</div>

        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">ORDER CONFIRMED</p>

        <h1>
          THANK
          <br />
          <span>YOU.</span>
        </h1>

        <p className="success-message">
          Your RKN order has been successfully placed.
          <br />
          We&apos;ve sent the order confirmation to your email.
        </p>

        <div className="success-order">
          <div>
            <span>ORDER NUMBER</span>
            <strong>RKN-2026-08421</strong>
          </div>

          <div>
            <span>ESTIMATED DELIVERY</span>
            <strong>3–5 BUSINESS DAYS</strong>
          </div>

          <div>
            <span>PAYMENT</span>
            <strong>UPI / SECURE</strong>
          </div>
        </div>

        <div className="success-actions">
          <Link href="/shop" className="success-primary">
            CONTINUE SHOPPING →
          </Link>

          <Link href="/" className="success-secondary">
            BACK TO HOME
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="success-footer">
        <div className="success-footer-logo">
          RKN<span>®</span>
        </div>

        <p>
          Modern clothing.
          <br />
          Timeless identity.
        </p>

        <div>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
          <a href="#">CONTACT</a>
        </div>

        <span>© 2026 RKN. ALL RIGHTS RESERVED.</span>
      </footer>
    </main>
  );
}