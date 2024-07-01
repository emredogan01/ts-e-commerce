import React from "react";
import dynamic from "next/dynamic";

const ClearBasket = dynamic(() => import("@/components/ClearBasket"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const ProductsQuantity = dynamic(
  () => import("@/components/ProductsQuantity"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const BasketContainer = () => {
  return (
    <div className="flex flex-col">
      <React.Suspense fallback={<div>Loading...</div>}>
        <ProductsQuantity />
        <ClearBasket />
      </React.Suspense>
    </div>
  );
};

export default BasketContainer;
