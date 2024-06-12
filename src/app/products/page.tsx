"use client";
import { cartListActions } from "@/slices/cartReducer";
import { useAppDispatch } from "@/store/hook";
import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}
function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  const handleAddToCart = (item: Product) => {
    fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      body: JSON.stringify({
        userId: item?.id,
      }),
    }).then((res) => {
      toast.success("Product added in cart successfully");
      dispatch(cartListActions.updateCart(item));
    });
  };

  return (
    <div className="p-4">
      <p className="text-3xl">All Products</p>
      <div className="flex flex-wrap justify-between gap-4">
        {products?.map((item: Product) => (
          <div key={item?.id} className="w-56">
            <Link
              href={`/products/${item?.id}`}
              style={{
                width: "220px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Image
                src={item?.image}
                width={200}
                height={200}
                alt="Picture of the author"
                className="h-60"
              />
            </Link>
            <p className="mb-2 overflow-hidden text-black no-underline text-ellipsis whitespace-nowrap">
              {item?.title}
            </p>
            <div className="flex justify-around">
              <p className="text-lg text-black no-underline">${item?.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-400 w-fit "
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
