"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  id: number;
  name: string;
  category: "MEN" | "WOMEN" | "UNISEX";
  size: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: string;
  itemCount: number;
  createdAt: string;
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    try {
      const savedOrder =
        localStorage.getItem("rkn-last-order");

      if (savedOrder) {
        const parsedOrder: Order =
          JSON.parse(savedOrder);

        queueMicrotask(() => {
          if (active) {
            setOrder(parsedOrder);
          }
        });
      }
    } catch (error) {
      console.error(
        "Failed to load order:",
        error
      );
    }

    queueMicrotask(() => {
      if (active) {
        setLoaded(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const paymentLabel = (payment?: string) => {
    if (payment === "CARD") {
      return "CARD / SECURE";
    }

    if (payment === "COD") {
      return "CASH ON DELIVERY";
    }

    return "UPI / SECURE";
  };

  /* =========================================
     LOADING
  ========================================= */

  if (!loaded) {
    return (
      <main className="success-page">
        <div className="success-loading">
          LOADING ORDER...
        </div>
      </main>
    );
  }

  /* =========================================
     NO ORDER
  ========================================= */

  if (!order) {
    return (
      <main className="success-page">
        <header className="success-header">
          <Link
            href="/"
            className="success-logo"
          >
            RKN<span>®</span>
          </Link>

          <span>
            ORDER CONFIRMATION
          </span>

          <Link href="/shop">
            CONTINUE SHOPPING →
          </Link>
        </header>

        <section className="success-main">
          <div className="success-number">
            RKN / 00
          </div>

          <div className="success-icon">
            !
          </div>

          <p className="success-label">
            NO RECENT ORDER
          </p>

          <h1>
            YOUR BAG
            <br />
            <span>AWAITS.</span>
          </h1>

          <p className="success-message">
            We couldn&apos;t find a recent RKN
            order.
            <br />
            Start shopping to create your order.
          </p>

          <div className="success-actions">
            <Link
              href="/shop"
              className="success-primary"
            >
              EXPLORE COLLECTION →
            </Link>

            <Link
              href="/"
              className="success-secondary"
            >
              BACK TO HOME
            </Link>
          </div>
        </section>

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

          <span>
            © 2026 RKN. ALL RIGHTS RESERVED.
          </span>
        </footer>
      </main>
    );
  }

  /* =========================================
     SUCCESS PAGE
  ========================================= */

  return (
    <main className="success-page">
      {/* HEADER */}

      <header className="success-header">
        <Link
          href="/"
          className="success-logo"
        >
          RKN<span>®</span>
        </Link>

        <span>
          ORDER CONFIRMATION
        </span>

        <Link href="/shop">
          CONTINUE SHOPPING →
        </Link>
      </header>

      {/* MAIN */}

      <section className="success-main">
        <div className="success-number">
          RKN / 2026
        </div>

        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h1>
          THANK
          <br />
          <span>YOU.</span>
        </h1>

        <p className="success-message">
          Your RKN order has been successfully
          placed.
          <br />
          We&apos;ve received your order details.
        </p>

        {/* ORDER INFORMATION */}

        <div className="success-order">
          <div>
            <span>
              ORDER NUMBER
            </span>

            <strong>
              {order.orderNumber}
            </strong>
          </div>

          <div>
            <span>
              ESTIMATED DELIVERY
            </span>

            <strong>
              3–5 BUSINESS DAYS
            </strong>
          </div>

          <div>
            <span>
              PAYMENT
            </span>

            <strong>
              {paymentLabel(order.payment)}
            </strong>
          </div>
        </div>

        {/* ORDER TOTAL */}

        <div className="success-total">
          <span>
            ORDER TOTAL
          </span>

          <strong>
            {formatPrice(order.total)}
          </strong>
        </div>

        {/* ITEMS */}

        <div className="success-items">
          <div className="success-items-heading">
            <span>
              YOUR ITEMS
            </span>

            <span>
              {order.itemCount}{" "}
              {order.itemCount === 1
                ? "ITEM"
                : "ITEMS"}
            </span>
          </div>

          {order.items.map((item) => (
            <div
              className="success-item"
              key={`${item.id}-${item.size}`}
            >
              <div>
                <strong>
                  {item.name}
                </strong>

                <span>
                  {item.category}
                  {" · "}
                  SIZE {item.size}
                  {" · "}
                  × {item.quantity}
                </span>
              </div>

              <strong>
                {formatPrice(
                  item.price *
                    item.quantity
                )}
              </strong>
            </div>
          ))}
        </div>

        {/* PRICE BREAKDOWN */}

        <div className="success-breakdown">
          <div>
            <span>SUBTOTAL</span>

            <strong>
              {formatPrice(
                order.subtotal
              )}
            </strong>
          </div>

          <div>
            <span>SHIPPING</span>

            <strong>
              {order.shipping === 0
                ? "FREE"
                : formatPrice(
                    order.shipping
                  )}
            </strong>
          </div>

          <div>
            <span>TOTAL</span>

            <strong>
              {formatPrice(
                order.total
              )}
            </strong>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="success-actions">
          <Link
            href="/shop"
            className="success-primary"
          >
            CONTINUE SHOPPING →
          </Link>

          <Link
            href="/"
            className="success-secondary"
          >
            BACK TO HOME
          </Link>
        </div>
      </section>

      {/* FOOTER */}

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

        <span>
          © 2026 RKN. ALL RIGHTS RESERVED.
        </span>
      </footer>
    </main>
  );
}