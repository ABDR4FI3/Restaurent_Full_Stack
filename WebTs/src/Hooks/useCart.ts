import { useState, useEffect } from "react";
import { getAllCartItems } from "../services/CartService";
import { Orders } from "../types/Orders";
import { useDispatch, useSelector } from "react-redux";
import { setCartSize } from "../store/slices/cartSlice";

export const useCart = () => {

  const [cartItems, setCartItems] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const cartSize = useSelector((state: any) => state.cartSize); 

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const items = await getAllCartItems();
      console.log("items data is", items);
      console.log("items length is", items.length);
      setCartItems(items);
      dispatch(setCartSize(items.length));
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return { cartItems, loading, error, cartSize, refreshCart: fetchCartItems , setCartSize  };
};
