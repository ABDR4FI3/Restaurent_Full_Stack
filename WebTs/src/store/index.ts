// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawerSlice";
import orderStatusReducer from "./slices/orderSlice"; 
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    orderStatus: orderStatusReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
