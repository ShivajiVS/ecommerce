import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./cartType";

type CartType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  incrementQuantity: (id: string, size: string) => void;
  decrementQuantity: (id: string, size: string) => void;
  clearCart: () => void;
};

export const useCartState = create<CartType>()(
  persist(
    (set) => ({
      cart: [],

      // Add to Cart
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.id === product.id && cartItem.size === product.size
          );

          if (existingItem) {
            // If the same product with the same size exists, increment its quantity
            const updatedCart = state.cart.map((cartItem) => {
              if (
                cartItem.id === product.id &&
                cartItem.size === product.size
              ) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                };
              }
              return cartItem;
            });

            return { cart: updatedCart };
          } else {
            // If the product with the selected size doesn't exist, add it to the cart
            return { cart: [...state.cart, { ...product }] };
          }
        }),

      // Remove from Cart (based on id and size)
      removeFromCart: (productId, size) => {
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => !(item.id === productId && item.size === size)
          );
          return { cart: updatedCart };
        });
      },

      // Increment Quantity (based on id and size)
      incrementQuantity: (productId, size) => {
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === productId && cartItem.size === size) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          });
          return { cart: updatedCart };
        });
      },

      // Decrement Quantity (based on id and size)
      decrementQuantity: (productId, size) => {
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === productId && cartItem.size === size) {
              if (cartItem.quantity > 1) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                };
              }
            }
            return cartItem;
          });
          return { cart: updatedCart };
        });
      },

      // Clear the cart
      clearCart: () => {
        set(() => ({ cart: [] }));
      },
    }),
    { name: "cart" }
  )
);
