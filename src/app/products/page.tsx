import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import ProductsContainer from "@/containers/products-container";
import FilterContainer from "@/containers/filter-container";
import BasketContainer from "@/containers/basket-container";

const Products = () => {
  return (
    <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(0,_4fr)_1fr] w-full">
      {/* filter section */}
      <section className="hidden sm:flex flex-col items-center">
        <FilterContainer />
      </section>
      {/* products section */}
      <section className="flex justify-center py-4 min-h-screen col-span-1 sm:col-span-1 md:col-span-1">
        <ProductsContainer />
      </section>
      {/* basket section */}
      <section className="hidden md:flex flex-col items-center">
        <BasketContainer />
      </section>
    </MaxWidthWrapper>
  );
};

export default Products;
