import { create } from "zustand";
import { Product } from "../../types";
import debounce from "lodash/debounce";

export const baseUrl: string =
  "https://5fc9346b2af77700165ae514.mockapi.io/products";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: boolean;
  fetchProducts: (params?: Record<string, string>) => void;
}

const useProducts = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: false,
  fetchProducts: debounce(async (params?: Record<string, string>) => {
    set({ isLoading: true, error: false });

    try {
      const url = new URL(baseUrl);
      if (params) {
        Object.keys(params).forEach((key) => {
          url.searchParams.append(key, params[key]);
        });
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        console.error("Network response was not ok");
        set({
          products: [],
          isLoading: false,
          error: true,
        });
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.length === 0) {
        if (params?.page && parseInt(params.page) > 1) {
          params.page = "1";
          await useProducts.getState().fetchProducts(params);
        } else {
          set({
            products: [],
            isLoading: false,
            error: false,
          });

          setTimeout(() => {
            set({ error: true });
          }, 500);
        }
        return;
      }

      set({
        products: data,
        isLoading: false,
        error: false,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ isLoading: false, error: true });
    }
  }, 200),
}));

export default useProducts;
