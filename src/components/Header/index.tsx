"use client";

import React, { Suspense } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { FormValues } from "./search-form";
import { FaShoppingBasket } from "react-icons/fa";
import SearchForm from "./search-form";
import DrawerSide from "../DrawerSide";
import { useSearchParams, useRouter } from "next/navigation";
import useBasketStore from "@/store/basket";
import SheetMenu from "../SheetMenu";
import ProductsQuantity from "../ProductsQuantity";
import ClearBasket from "../ClearBasket";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPrice = useBasketStore((state) => state.totalPrice);
  const totalItems = useBasketStore((state) => state.items.length);
  console.log(totalItems);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { search } = data;

    if (pathname.includes("/products/")) {
      router.push(
        `/products?limit=12&page=1&search=${encodeURIComponent(search)}`
      );
    } else {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("search", search);
      router.push(`?${currentParams.toString()}`);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="sticky top-0 bg-orange-500 z-10">
        <MaxWidthWrapper className="text-white">
          <header className="py-2 px-2 grid grid-cols-6 md:grid-cols-3 items-end gap-10">
            {/* left section */}
            <div className="flex flex-col gap-2 col-span-5 md:col-span-2">
              <Link href={"/"} className="font-bold text-xl">
                Shopping
              </Link>
              <SearchForm onSubmit={onSubmit} />
            </div>
            {/* right section */}
            <div className="col-span-1 grid grid-cols-5 gap-2">
              <div className="hidden md:flex bg-white text-black rounded-md py-2 px-2 gap-2 items-center col-span-3 justify-around">
                <span className="text-green-600 font-bold tracking-widest">
                  {totalPrice.toFixed(2)}
                  <span className="pl-1">&#8378;</span>
                </span>
                <FaShoppingBasket size={20} />
              </div>
              {/* dropdown */}
              <div className="hidden md:flex bg-white text-black rounded-md py-2 px-2 col-span-2">
                <DrawerSide />
              </div>
              {/* sheet */}
              <div className="md:hidden flex justify-center col-span-5">
                <SheetMenu
                  title="My Basket"
                  side="right"
                  triggerIcon={
                    <div className="flex items-center relative">
                      <FaShoppingBasket size={35} />
                      {totalItems === 0 ? (
                        ""
                      ) : (
                        <span className="absolute bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center top-0 right-0">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  }
                >
                  <ProductsQuantity />
                  <ClearBasket />
                </SheetMenu>
              </div>
            </div>
          </header>
        </MaxWidthWrapper>
      </div>
    </Suspense>
  );
};

export default Header;
