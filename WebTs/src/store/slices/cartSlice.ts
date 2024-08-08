import { createSlice } from "@reduxjs/toolkit";
import { Orders } from "../../types/Orders";
import { getAllCartItems } from "../../services/CartService";

export interface CartState {
  cartSize: number;
  cartItems: Orders[];
}

const initialState: CartState = {
  cartItems: await getAllCartItems(),
  cartSize: await getAllCartItems().then((items) => items.length),
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartSize: (state, action) => {
      state.cartSize = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.cartSize = action.payload.length;
    },
  },
});

export const { setCartSize, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
