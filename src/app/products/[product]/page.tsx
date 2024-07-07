import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BasketContainer from "@/containers/basket-container";
import ProductDetail from "@/containers/detail-container";

const ProductPage: React.FC = ({ params }: any) => {
  const id = params.product;

  return (
    <MaxWidthWrapper className="grid grid-cols-3 w-full">
      {/* product detail */}
      <div className="col-span-3 md:col-span-2">
        <ProductDetail id={id} />
      </div>
      {/* basket quantity */}
      <div className="hidden md:flex justify-center">
        <BasketContainer />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
