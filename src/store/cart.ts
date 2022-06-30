import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatedCartItems } from "../lib/utils";
import { ProductInterface } from "../types/Product";

export interface CounterState {
  cartItems: ProductInterface[];
  showCart: boolean;
}

const initialState: CounterState = {
  cartItems: [],
  showCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<any>) => {
      state.cartItems = updatedCartItems(state.cartItems, action.payload);
    },
    updateCart: (state, action: PayloadAction<any>) => {
      state.cartItems = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload
      );
    },
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
  },
});

export const {
  addProductToCart,
  openCart,
  closeCart,
  updateCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
