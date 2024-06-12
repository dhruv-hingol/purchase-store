"use client";

import { cartListActions } from "@/slices/cartReducer";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Image } from "@nextui-org/react";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}
function CartList() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state?.cartList?.cartList);
  const total = useMemo(() => {
    return cart?.reduce(
      (acc: number, product: Product) => acc + product.price * product.quantity,
      0
    );
  }, [cart]);
  const handleMinusQuantity = (id: number) => {
    dispatch(cartListActions.minusQuantity(id));
  };
  const handleAddQuantity = (id: number) => {
    dispatch(cartListActions.addQuantity(id));
  };
  return (
    <div className="max-w-[1000px] mx-auto mt-20">
      <p className="mb-4 text-3xl font-bold">CART ITEMS</p>
      <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden h-[43rem]">
        {cart?.length ? (
          cart?.map((item: Product) => (
            <div
              className="flex flex-col w-full gap-4 sm:flex-row"
              key={item?.id}
            >
              <Image
                src={item?.image}
                alt="Picture of the author"
                className="w-full h-60 sm:h-40 sm:max-w-28 sm:min-w-28"
                classNames={{ wrapper: "mx-auto" }}
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{item?.title}</p>
                <p className="text-base break-words ">{item?.description}</p>
                <div className="flex items-start justify-between px-3">
                  <p className="text-lg text-black no-underline">
                    ${item?.price}
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 px-3 bg-gray-300 border-2 border-black rounded-lg">
                      <p
                        className="text-3xl leading-6 cursor-pointer"
                        onClick={() => handleMinusQuantity(item?.id)}
                      >
                        -
                      </p>
                      <p className="text-lg font-medium text-black no-underline">
                        {parseFloat(item?.quantity.toFixed(2))}
                      </p>
                      <p
                        className="text-2xl leading-6 cursor-pointer"
                        onClick={() => handleAddQuantity(item?.id)}
                      >
                        +
                      </p>
                    </div>
                    <p className="text-lg text-black no-underline">
                      ${parseFloat((item?.price * item?.quantity).toFixed(2))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl ">No items in cart</p>
        )}
      </div>
      <div className="flex items-center justify-between px-3 mt-4 border-t-2 border-t-gray-200">
        <p className="text-xl font-medium">Total</p>
        <p className="text-lg font-semibold">
          ${parseFloat(total?.toFixed(2))}
        </p>
      </div>
    </div>
  );
}

export default CartList;
