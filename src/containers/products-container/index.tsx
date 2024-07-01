import React from "react";
import { Product } from "@/types";
import Card from "@/components/Card";
import CardSkeleton from "@/components/Card/CardSkeleton";
import { FaFilter } from "react-icons/fa";
import SheetMenu from "@/components/SheetMenu";
import RadioFilters from "@/components/RadioFilters";
import CheckBoxFilter from "@/components/CheckboxFilter";
import useFilterNames from "@/store/filterNames";
import NotFoundProduct from "@/components/NotFoundProduct";
import PaginationComp from "@/components/PaginationComp";
import useProducts from "@/store/products";

interface IProductsContainerProps {
  products: Product[];
}

const ProductsContainer: React.FC<IProductsContainerProps> = ({ products }) => {
  const { brands, models } = useFilterNames((state) => state);
  const { isLoading, error } = useProducts((state) => state);

  const hasProducts = products.length > 0;

  return (
    <div className="relative h-full flex min-h-screen justify-center pb-12">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
        {isLoading ? (
          Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full">
                <CardSkeleton />
              </div>
            ))
        ) : !hasProducts && !isLoading ? (
          <div className="col-span-full mt-20">
            <NotFoundProduct />
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="w-full">
              <Card card={product} />
            </div>
          ))
        )}
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 mb-20 ml-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
        <SheetMenu
          title="My Basket"
          side="left"
          triggerIcon={<FaFilter size={15} className="text-white" />}
        >
          <RadioFilters />
          <CheckBoxFilter type="model" values={models} name="Model" />
          <CheckBoxFilter type="brand" values={brands} name="Brand" />
        </SheetMenu>
      </div>
      <div className="fixed bottom-0 bg-gray-200 rounded-md py-1">
        <PaginationComp />
      </div>
    </div>
  );
};

export default ProductsContainer;
