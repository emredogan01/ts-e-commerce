import React from "react";
import DetailCard from "@/components/DetailCard";
import { baseUrl } from "@/store/products";
import NotFoundProduct from "@/components/NotFoundProduct";

const getCardById = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`);
  return res.json();
};

interface ProductDetailProps {
  id: number;
}

const ProductDetail: React.FC<ProductDetailProps> = async ({ id }) => {
  const post = await getCardById(id);
  return (
    <div className="mt-4">
      {post === "Not found" ? (
        <NotFoundProduct />
      ) : (
        <DetailCard product={post} />
      )}
    </div>
  );
};

export default ProductDetail;
