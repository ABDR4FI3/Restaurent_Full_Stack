// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawerSlice";
import orderStatusReducer from "./slices/orderSlice"; 
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    orderStatus: orderStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
