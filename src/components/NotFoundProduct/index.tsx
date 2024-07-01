import React from "react";
import { FaNotEqual } from "react-icons/fa";

const NotFoundProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <FaNotEqual size={50} className="text-gray-400" />
      <h1 className="text-2xl ml-2 text-gray-500 tracking-widest">
        No products found!
      </h1>
    </div>
  );
};

export default NotFoundProduct;
