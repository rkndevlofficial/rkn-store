import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

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

export default function Home() {
  return (
    <main>
      {/* ================================
          NAVBAR
      ================================= */}
      <Navbar />

      {/* ================================
          HERO
      ================================= */}
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

          <Link href="/shop" className="hero-button">
            SHOP COLLECTION <span>→</span>
          </Link>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span>01 / 04</span>
        </div>
      </section>

      {/* ================================
          PHILOSOPHY
      ================================= */}
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

      {/* ================================
          CATEGORIES
      ================================= */}
      <section className="section" id="collections">
        <div className="section-heading">
          <div>
            <p className="label">EXPLORE RKN</p>
            <h2>SHOP BY CATEGORY</h2>
          </div>

          <Link href="/shop">VIEW ALL →</Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              href="/shop"
              className="category-card"
              key={category.title}
            >
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
            </Link>
          ))}
        </div>
      </section>

      {/* ================================
          NEW ARRIVALS
      ================================= */}
      <section className="section products" id="new">
        <div className="section-heading">
          <div>
            <p className="label">RKN / 01</p>
            <h2>NEW ARRIVALS</h2>
          </div>

          <Link href="/shop">SHOP ALL →</Link>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              badge={product.badge}
            />
          ))}
        </div>
      </section>

      {/* ================================
          STATEMENT
      ================================= */}
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

          <Link href="/shop" className="hero-button">
            SHOP ESSENTIALS →
          </Link>
        </div>
      </section>

      {/* ================================
          FEATURES
      ================================= */}
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

      {/* ================================
          NEWSLETTER
      ================================= */}
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

      {/* ================================
          FOOTER
      ================================= */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              RKN<span>®</span>
            </div>

            <p>
              Modern clothing.
              <br />
              Timeless identity.
            </p>
          </div>

          <div>
            <h4>SHOP</h4>

            <Link href="/shop?category=men">Men</Link>
            <Link href="/shop?category=women">Women</Link>
            <Link href="/shop">New Arrivals</Link>
            <Link href="/shop?sale=true">Sale</Link>
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