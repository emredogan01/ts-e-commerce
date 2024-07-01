"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useEffect } from "react";
import useProducts from "@/store/products";
import ProductsContainer from "@/containers/products-container";
import FilterContainer from "@/containers/filter-container";
import BasketContainer from "@/containers/basket-container";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const fetchProducts = useProducts((store) => store.fetchProducts);
  const products = useProducts((store) => store.products);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    fetchProducts(params);
  }, [searchParams, fetchProducts]);

  return (
    <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(0,_4fr)_1fr] w-full">
      {/* filter section */}
      <section className="hidden sm:flex flex-col items-center">
        <FilterContainer />
      </section>
      {/* products section */}
      <section className="flex justify-center py-4 min-h-screen col-span-1 sm:col-span-1 md:col-span-1">
        <ProductsContainer products={products} />
      </section>
      {/* basket section */}
      <section className="hidden md:flex flex-col items-center">
        <BasketContainer />
      </section>
    </MaxWidthWrapper>
  );
};

export default Products;
