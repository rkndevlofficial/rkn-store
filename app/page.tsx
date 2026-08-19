import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "MEN",
    subtitle: "Explore Collection",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "WOMEN",
    subtitle: "Explore Collection",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "NEW ARRIVALS",
    subtitle: "Latest Styles",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
  },
];

const products = [
  {
    name: "Classic Black Tee",
    category: "MEN",
    price: "₹1,299",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Premium White Shirt",
    category: "MEN",
    price: "₹1,899",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Essential Black Hoodie",
    category: "UNISEX",
    price: "₹2,299",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Minimal Fashion Top",
    category: "WOMEN",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Home() {
  return (
    <main>
      {/* Announcement */}
      <div className="announcement">
        FREE SHIPPING ON ORDERS ABOVE ₹1,999
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            RKN<span>®</span>
          </Link>

          <nav>
            <a href="#new">NEW ARRIVALS</a>
            <a href="#men">MEN</a>
            <a href="#women">WOMEN</a>
            <a href="#collections">COLLECTIONS</a>
            <a href="#sale">SALE</a>
          </nav>

          <div className="nav-icons">
            <button aria-label="Search">⌕</button>
            <button aria-label="Account">♙</button>
            <button aria-label="Wishlist">♡</button>
            <button aria-label="Cart">🛍</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">THE RKN EDIT — 2026</p>

          <h1>
            WEAR YOUR
            <br />
            <span>IDENTITY.</span>
          </h1>

          <p>
            Premium essentials designed for those
            <br />
            who believe less is always more.
          </p>

          <a href="#new" className="hero-button">
            SHOP COLLECTION <span>→</span>
          </a>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span>01 / 04</span>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy">
        <p className="label">RKN / PHILOSOPHY</p>

        <h2>
          SIMPLE.
          <br />
          <span>ICONIC.</span>
          <br />
          UNAPOLOGETIC.
        </h2>

        <p className="philosophy-text">
          RKN is a modern clothing label built around timeless design,
          exceptional quality and the confidence to stand apart.
        </p>
      </section>

      {/* Categories */}
      <section className="section" id="collections">
        <div className="section-heading">
          <div>
            <p className="label">EXPLORE RKN</p>
            <h2>SHOP BY CATEGORY</h2>
          </div>

          <a href="#new">VIEW ALL →</a>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a href="#new" className="category-card" key={category.title}>
              <Image
                src={category.image}
                alt={category.title}
                width={1200}
                height={800}
                unoptimized
              />

              <div className="card-overlay" />

              <div className="category-content">
                <small>{category.subtitle}</small>
                <h3>{category.title}</h3>
                <span>SHOP NOW →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="section products" id="new">
        <div className="section-heading">
          <div>
            <p className="label">RKN / 01</p>
            <h2>NEW ARRIVALS</h2>
          </div>

          <a href="#new">SHOP ALL →</a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                />

                <button
                  className="wishlist"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  ♡
                </button>

                <span className="quick-add">QUICK ADD +</span>
              </div>

              <div className="product-info">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="statement" id="sale">
        <div className="statement-overlay" />

        <div className="statement-content">
          <p className="label">RKN / ESSENTIALS</p>

          <h2>
            LESS
            <br />
            <span>NOISE.</span>
            <br />
            MORE
            <br />
            <span>STYLE.</span>
          </h2>

          <a href="#new" className="hero-button">
            SHOP ESSENTIALS →
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div>
          <span>01</span>
          <h3>PREMIUM QUALITY</h3>
          <p>
            Carefully selected fabrics and precise craftsmanship in every
            piece.
          </p>
        </div>

        <div>
          <span>02</span>
          <h3>TIMELESS DESIGN</h3>
          <p>
            Clean silhouettes designed to stay relevant season after season.
          </p>
        </div>

        <div>
          <span>03</span>
          <h3>MADE FOR YOU</h3>
          <p>
            Clothing that lets your personality speak without saying a word.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <p className="label">RKN / INSIDER</p>

        <h2>BE THE FIRST TO KNOW.</h2>

        <p>
          New drops, exclusive offers and everything RKN — straight to your
          inbox.
        </p>

        <form>
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            aria-label="Email address"
          />

          <button type="submit">JOIN →</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">RKN<span>®</span></div>

            <p>
              Modern clothing.
              <br />
              Timeless identity.
            </p>
          </div>

          <div>
            <h4>SHOP</h4>
            <a href="#men">Men</a>
            <a href="#women">Women</a>
            <a href="#new">New Arrivals</a>
            <a href="#sale">Sale</a>
          </div>

          <div>
            <h4>HELP</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">FAQ</a>
          </div>

          <div>
            <h4>FOLLOW</h4>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 RKN. ALL RIGHTS RESERVED.</span>
          <span>PRIVACY / TERMS</span>
        </div>
      </footer>
    </main>
  );
}