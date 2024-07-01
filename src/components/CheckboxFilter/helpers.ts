"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useFilterNames from "@/store/filterNames";

export interface CheckBoxFilterState {
  searchTerm: string;
  selectedItem: string | null;
  handleCheckboxChange: (item: string) => void;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useCheckBoxFilterState = (
  type: "model" | "brand",
  initialSelected: string | null
): CheckBoxFilterState => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fetchFilterNames = useFilterNames((state) => state.fetchFilterNames);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(
    initialSelected ?? (searchParams.get(type)?.toLowerCase() || null)
  );

  useEffect(() => {
    fetchFilterNames();
    const currentSelectedItem = searchParams.get(type)?.toLowerCase() || null;
    setSelectedItem(currentSelectedItem);
  }, [searchParams, type, fetchFilterNames]);

  const handleCheckboxChange = (item: string) => {
    const newSelectedItem =
      item.toLowerCase() === selectedItem ? null : item.toLowerCase();
    setSelectedItem(newSelectedItem);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newSelectedItem) {
      newSearchParams.set(type, newSelectedItem);
    } else {
      newSearchParams.delete(type);
    }
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
  };

  return {
    searchTerm,
    selectedItem,
    handleCheckboxChange,
    handleSearchTermChange,
  };
};
