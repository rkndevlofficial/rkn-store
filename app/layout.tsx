import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./cart-context";

export const metadata: Metadata = {
  title: "RKN — Modern Clothing",
  description:
    "RKN — Premium modern clothing designed for those who wear their identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}