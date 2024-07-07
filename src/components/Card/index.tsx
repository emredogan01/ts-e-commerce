import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "../ui/button";
import useBasketStore from "@/store/basket";
import Link from "next/link";

interface ICardProps {
  card: Product;
}

const truncateName = (name: string) => {
  return name.length > 17 ? `${name.slice(0, 12)}...` : name;
};

const Card: React.FC<ICardProps> = ({ card }) => {
  const addProduct = useBasketStore((state) => state.addItem);
  const handleClick = () => {
    addProduct({
      name: card.name,
      id: parseInt(card.id),
      price: parseInt(card.price),
    });
  };
  return (
    <div className="flex flex-col border-2 border-gray w-[160px] h-[280px] justify-between p-1 rounded-md gap-2">
      <div className="relative w-full h-1/2">
        <Link href={`/products/${card.id}`}>
          <Image
            className="rounded-md"
            src="/images.jpeg"
            layout="fill"
            objectFit="cover"
            alt="gray-img"
          />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-center gap-1 font-light">
        <div className="text-sm font-bold  text-green-600">{card.price}</div>
        <div className="text-sm ">{truncateName(card.name)}</div>
        <div className="text-sm">{card.model}</div>
        <div className="text-sm">{card.brand}</div>
        <Button onClick={() => handleClick()} className="bg-orange-500">
          Add To Card
        </Button>
      </div>
    </div>
  );
};

export default Card;
