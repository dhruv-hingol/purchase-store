"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Cart {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}
interface CartState {
  cartList: Cart[];
}
const initialState: CartState = {
  cartList: [],
};

const slice = createSlice({
  name: "cartListSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    updateCart(state, action: PayloadAction<Cart>) {
      const product = action.payload;
      const isProductAdded = state?.cartList.find(
        (item) => item?.id == product?.id
      );
      if (isProductAdded) {
        state.cartList = state.cartList.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cartList = [...state.cartList, { ...product, quantity: 1 }];
      }
    },
    addQuantity(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.cartList = [
        ...state?.cartList?.map((item) =>
          item?.id === id && item?.quantity < 10
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        ),
      ];
    },
    minusQuantity(state, action: PayloadAction<number>) {
      const id = action.payload;
      const isZeroQuantity = state?.cartList.find((item) => item?.id == id);
      if (isZeroQuantity?.quantity === 1) {
        state.cartList = state?.cartList?.filter((item) => item?.id !== id);
      } else {
        state.cartList = [
          ...state?.cartList?.map((item) =>
            item?.id === id && item?.quantity > 0
              ? { ...item, quantity: item?.quantity - 1 }
              : item
          ),
        ];
      }
    },
  },
});

export const reducer = slice.reducer;
export const cartListActions = slice.actions;
export default slice;
