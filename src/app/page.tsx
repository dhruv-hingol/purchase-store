"use client";
import Loader from "@/components/Loader";
import { cartListActions } from "@/slices/cartReducer";
import { useAppDispatch } from "@/store/hook";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";
import { toast } from "react-toastify";
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category:string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [search,setSearch]=useState('')
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
  useEffect(()=>{
    setProductList(products?.filter((el:Product)=>search===''?el:el?.category?.includes(search)))
  },[search,products])
  if (products?.length === 0) {
    return (
      <div className="h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-12 p-4">
    <div className="flex justify-between items-center">
      <input value={search} onChange={e=>setSearch(e?.target?.value)} type="search" className="border-[1px] outline-none border-black px-2 w-[22rem] text-lg h-10 rounded-2xl" placeholder="Search for category"/>
      <p className="text-3xl animate-bounce">Purchase Your Product Here</p>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {productList?.map((item: Product) => (
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
