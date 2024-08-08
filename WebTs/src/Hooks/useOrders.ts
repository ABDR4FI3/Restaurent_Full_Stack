import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { fetchOrderStatus } from "../store/slices/orderSlice";
import { PlaceOrder } from "../services/OrderService";
import { setCartItems } from "../store/slices/cartSlice";

export const useOrderStatus = (status: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.orderStatus
  );

  useEffect(() => {
    dispatch(fetchOrderStatus(status));
  }, [status, dispatch]);

  return { data, loading, error };
};

export const usePlaceOrder = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const placeOrder = async (foodId: number, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await PlaceOrder(foodId, quantity);
      setMessage(response);
      dispatch(setCartItems([...cartItems, { foodId, quantity }]));
    } catch (err) {
      setError("Failed to place the order.");
      console.error("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    error,
    loading,
    placeOrder,
  };
};
