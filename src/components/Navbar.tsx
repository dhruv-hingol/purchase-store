"use client";

import React, { useMemo } from "react";
import "../style/navbar.css";
import Link from "next/link";
import { useAppSelector } from "@/store/hook";
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}

function Navbar() {
  const cart = useAppSelector((state) => state?.cartList?.cartList);
  const totalQuantity = useMemo(() => {
    return cart?.reduce(
      (acc: number, product: Product) => acc + product.quantity,
      0
    );
  }, [cart]);
  return (
    <div className="navbar-container">
      <Link href="/" className="navbar-item">
        Home
      </Link>
      <Link href="/about" className="navbar-item">
        About
      </Link>
      <Link href="/products/cart" className="navbar-item">
        Cart
        <sup className="px-1 py-0 text-sm text-white bg-gray-600 rounded-full">
          {totalQuantity}
        </sup>
      </Link>
    </div>
  );
}

export default Navbar;
