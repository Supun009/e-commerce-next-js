import { CartStoreActionType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.findIndex(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedSize === item.selectedSize &&
              cartItem.selectedColor === item.selectedColor
          );
          if (existingItem !== -1) {
            state.cart[existingItem].quantity += 1;
          } else {
            state.cart.push({ ...item, quantity: 1 });
          }
          return { cart: [...state.cart] };
        }),
      addToCartFromProductPage: (item) =>
        set((state) => {
          const existingItem = state.cart.findIndex(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedSize === item.selectedSize &&
              cartItem.selectedColor === item.selectedColor
          );
          if (existingItem !== -1) {
            state.cart[existingItem].quantity += item.quantity;
          } else {
            state.cart.push({ ...item, quantity: item.quantity });
          }
          return { cart: [...state.cart] };
        }),

      removeFromCart: (item) => {
        console.log(item),
          set((state) => ({
            cart: state.cart.filter(
              (cartItem) =>
                cartItem.id !== item.id ||
                cartItem.selectedSize !== item.selectedSize ||
                cartItem.selectedColor !== item.selectedColor
            ),
          }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
