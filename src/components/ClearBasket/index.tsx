import React from "react";
import { Button } from "../ui/button";
import useBasketStore from "@/store/basket";

const ClearBasket: React.FC = () => {
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const totalPrice = useBasketStore((state) => state.totalPrice);

  const handleClearBasket = () => {
    clearBasket();
    console.log("Basket Cleared!");
  };

  return (
    <div className=" max-w-sm p-4 bg-white shadow-md rounded-lg mt-4">
      <div className="flex flex-col items-start justify-between">
        <div className="font-semibold text-md mb-4">Basket Summary</div>
        <div className="flex flex-col mb-4">
          <p className="text-sm">
            Total Price:{" "}
            <span className="text-green-600 font-bold">
              {totalPrice.toFixed(2)} &#8378;
            </span>
          </p>
        </div>
        <Button
          onClick={handleClearBasket}
          className="bg-orange-500 text-white"
        >
          Clear Basket
        </Button>
      </div>
    </div>
  );
};

export default ClearBasket;
