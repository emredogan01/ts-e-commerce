"use client";

import React, { use } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import useBasketStore from "@/store/basket";

interface DetailCardProps {
  product: Product;
}

const DetailCard: React.FC<DetailCardProps> = ({ product }) => {
  const addProduct = useBasketStore((store) => store.addItem);

  const handleClick = () => {
    addProduct({
      name: product.name,
      id: parseInt(product.id),
      price: parseInt(product.price),
    });
  };
  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full px-2 mt-2">
      {/* Image */}
      <div className="relative md:col-span-1 md:order-1 flex justify-center items-center">
        <div className="relative w-full h-80 md:h-full">
          <Image
            className="rounded-md"
            src={"/images.jpeg"}
            layout="fill"
            objectFit="cover"
            alt="product image"
          />
        </div>
      </div>
      {/* Description */}
      <div className="col-span-1 md:col-span-1 md:order-2 flex flex-col gap-2 items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="font-light text-sm tracking-wider">
            {product.description}
          </p>
          <span className="text-green-600 font-bold">
            {formattedDate(product.createdAt)}
          </span>
        </div>
        <Button onClick={() => handleClick()} className="bg-orange-500 w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DetailCard;
