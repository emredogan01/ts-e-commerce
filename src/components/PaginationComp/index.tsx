import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useProducts from "@/store/products";

const PaginationComp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 12;
  const { products, isLoading } = useProducts((state) => ({
    products: state.products,
    isLoading: state.isLoading,
  }));

  React.useEffect(() => {
    if (!searchParams.get("limit")) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("limit", limit.toString());
      router.replace(`?${newSearchParams.toString()}`);
    }
  }, []);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", limit.toString());
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1 && !isLoading)
                handlePageChange(currentPage - 1);
            }}
            className={`${
              currentPage === 1 || isLoading
                ? "pointer-events-none opacity-50"
                : "hover:underline"
            }`}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        {currentPage > 1 && !isLoading && (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className="hover:underline"
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {products.length > 0 && (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage);
              }}
              className="font-bold text-orange-500 hover:underline"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {products.length === limit && (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className="hover:underline"
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (products.length === limit && !isLoading)
                handlePageChange(currentPage + 1);
            }}
            className={`${
              products.length < limit || isLoading
                ? "pointer-events-none opacity-50"
                : "hover:underline"
            }`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
