import React from "react";
import useBasketStore from "@/store/basket";

const ProductsQuantity = () => {
  const removeProduct = useBasketStore((state) => state.removeItem);
  const products = useBasketStore((state) => state.items);
  const updateProductQuantity = useBasketStore(
    (state) => state.updateItemQuantity
  );

  return (
    <div className="max-w-sm p-4 bg-white shadow-md rounded-lg mt-4">
      {products.length === 0 ? (
        <span className="text-gray-500">Basket is Empty.</span>
      ) : (
        products.map((product) => (
          <div className="flex flex-col justify-between py-2" key={product.id}>
            <div className="flex flex-col mb-4">
              <p className="font-semibold text-sm">{product.name}</p>
              <p className="text-green-600 text-sm font-bold">
                {product.price}.00<span>&#8378;</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                onClick={() => {
                  if (product.quantity > 1) {
                    updateProductQuantity(product.id, product.quantity - 1);
                  } else {
                    removeProduct(product.id);
                  }
                }}
                className="bg-gray-200 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-300 text-sm"
              >
                -
              </span>
              <p className="bg-orange-500 text-white font-medium w-6 h-6 flex items-center justify-center rounded-full cursor-pointer text-sm">
                {product.quantity}
              </p>
              <span
                onClick={() =>
                  updateProductQuantity(product.id, product.quantity + 1)
                }
                className="bg-gray-200 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-300 text-sm"
              >
                +
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductsQuantity;
