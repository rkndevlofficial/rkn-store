"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: string, change: number) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedCart = localStorage.getItem("rkn-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("rkn-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      }

      return [...currentCart, item];
    });
  };

  const updateQuantity = (
    id: number,
    size: string,
    change: number
  ) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id && item.size === size
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}