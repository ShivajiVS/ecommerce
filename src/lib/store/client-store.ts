import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

type CartType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromeCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
};

export const useCartState = create<CartType>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === product.id
          );

          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === product.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                };
              }
              return cartItem;
            });

            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...product }] };
          }
        }),

      //remove product
      removeFromeCart: (productId) => {
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item.id !== productId
          );
          return { cart: updatedCart };
        });
      },

      // Increment Quantity
      incrementQuantity: (productId) => {
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === productId) {
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

      // Decrement Quantity
      decrementQuantity: (productId) => {
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === productId) {
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
      clearCart: () => {
        set(() => ({ cart: [] }));
      },
    }),
    { name: "cart" }
  )
);
