"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../../../style/product.css";
import { useAppDispatch } from "@/store/hook";
import { cartListActions } from "@/slices/cartReducer";
import { Link } from "@nextui-org/react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
type Props = { params: { productId: number } };
interface rating {
  rate: number;
  count: number;
}
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category: string;
  rating: rating;
}
const defaultProduct: Product = {
  id: 0,
  title: "",
  price: 0,
  image: "",
  quantity: 0,
  description: "",
  category: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

function ProductDetails({ params }: Props) {
  const [productDetails, setProductDetails] = useState<Product>(defaultProduct);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params?.productId}`)
      .then((res) => res.json())
      .then((json) => setProductDetails(json));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //can set not found page with next js not found hook like this
  const roundValue = Math.round(productDetails?.rating?.rate);
  const starChecker = [];
  for (let i = 0; i < 5; i++) {
    if (i < roundValue) {
      starChecker.push(<span key={i} className="fa fa-star checked"></span>);
    } else {
      starChecker.push(<span key={i} className="fa fa-star "></span>);
    }
  }

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
  if (productDetails?.title === "") {
    return (
      <div className="h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 p-4 mt-20">
      <div className="flex flex-col sm:flex-row gap-8  max-w-[1000px] mx-auto ">
        <Image
          src={productDetails?.image}
          width={350}
          height={350}
          alt="Picture of the author"
          className="mx-auto"
        />
        <div className="mx-0 my-auto" style={{ margin: "auto 0" }}>
          <p>{productDetails?.title}</p>
          <div className="flex items-center gap-3">
            <p>{productDetails?.rating?.rate}</p>
            <div className="flex gap-1">{starChecker}</div>
            <p>{productDetails?.rating?.count} ratings</p>
          </div>
          <p>{productDetails?.description}</p>
          <div className="flex justify-between">
            <p className="text-2xl">${productDetails?.price}</p>
            <button
              onClick={() => handleAddToCart(productDetails)}
              className="px-2 text-white bg-gray-500 rounded-lg hover:bg-gray-400 w-fit "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 w">
        {products?.map((item: Product) => (
          <div key={item?.id} className="w-56 m-4 break-inside-avoid-column">
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

export default ProductDetails;
