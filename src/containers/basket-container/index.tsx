import React from "react";
import ClearBasket from "@/components/ClearBasket";
import ProductsQuantity from "@/components/ProductsQuantity";
// import dynamic from "next/dynamic";
// const ClearBasket = dynamic(() => import("@/components/ClearBasket"), {
//   ssr: false,
// });
// const ProductsQuantity = dynamic(
//   () => import("@/components/ProductsQuantity"),
//   {
//     ssr: false,
//   }
// );
const BasketContainer = () => {
  return (
    <div className="flex flex-col">
      <ProductsQuantity />
      <ClearBasket />
    </div>
  );
};

export default BasketContainer;
