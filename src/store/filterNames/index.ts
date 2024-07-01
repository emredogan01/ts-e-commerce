import create from "zustand";
import { baseUrl } from "../products";

interface FilterNamesState {
  models: string[];
  brands: string[];
  fetchFilterNames: () => void;
}

const useFilterNames = create<FilterNamesState>((set) => ({
  models: [],
  brands: [],
  fetchFilterNames: async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const modelsSet = new Set<string>();
      const brandsSet = new Set<string>();

      data.forEach((item: { model: string; brand: string }) => {
        modelsSet.add(item.model);
        brandsSet.add(item.brand);
      });

      const models = Array.from(modelsSet);
      const brands = Array.from(brandsSet);

      set({ models, brands });
    } catch (error) {
      console.error("Failed to fetch filter names:", error);
    }
  },
}));

export default useFilterNames;
