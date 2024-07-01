import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Product {
  id: number;
  price: number;
  name: string;
}

export interface BasketItem extends Product {
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearBasket: () => void;
}

const calculateTotalPrice = (items: BasketItem[]) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const getInitialState = () => {
  const storedItems =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("basketItems") || "[]")
      : [];
  return {
    items: storedItems,
    totalPrice: calculateTotalPrice(storedItems),
  };
};

const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set, get) => ({
        ...getInitialState(),
        addItem: (product: Product) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.id === product.id
            );
            let updatedItems;
            if (existingItem) {
              updatedItems = state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              const newItem: BasketItem = { ...product, quantity: 1 };
              updatedItems = [...state.items, newItem];
            }
            localStorage.setItem("basketItems", JSON.stringify(updatedItems));
            return {
              items: updatedItems,
              totalPrice: calculateTotalPrice(updatedItems),
            };
          });
        },
        removeItem: (productId: number) => {
          set((state) => {
            const updatedItems = state.items.filter(
              (item) => item.id !== productId
            );
            localStorage.setItem("basketItems", JSON.stringify(updatedItems));
            return {
              items: updatedItems,
              totalPrice: calculateTotalPrice(updatedItems),
            };
          });
        },
        updateItemQuantity: (productId: number, quantity: number) => {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            );
            localStorage.setItem("basketItems", JSON.stringify(updatedItems));
            return {
              items: updatedItems,
              totalPrice: calculateTotalPrice(updatedItems),
            };
          });
        },
        clearBasket: () => {
          set({
            items: [],
            totalPrice: 0,
          });
          localStorage.removeItem("basketItems");
        },
      }),
      {
        name: "basket-storage",
      }
    )
  )
);

export default useBasketStore;
