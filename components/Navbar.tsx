import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="top-bar">
        FREE SHIPPING ON ORDERS ABOVE ₹1,999
      </div>

      <header className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            RKN<span>®</span>
          </Link>

          <nav className="nav-links">
            <Link href="/shop">NEW ARRIVALS</Link>
            <Link href="/shop?category=men">MEN</Link>
            <Link href="/shop?category=women">WOMEN</Link>
            <Link href="/shop">COLLECTIONS</Link>
            <Link href="/shop?sale=true">SALE</Link>
          </nav>

          <div className="nav-actions">
            <button aria-label="Search">⌕</button>
            <button aria-label="Account">♙</button>
            <button aria-label="Wishlist">♡</button>

            <Link href="/cart" aria-label="Cart">
              🛍
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}