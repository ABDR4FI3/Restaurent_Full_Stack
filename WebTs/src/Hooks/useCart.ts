import { useState, useEffect } from "react";
import { getAllCartItems } from "../services/CartService";
import { Orders } from "../types/Orders";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartSize, setCartSize] = useState<number>(0);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const items = await getAllCartItems();
      setCartItems(items);
      setCartSize(items.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return { cartItems, loading, error, cartSize, refreshCart: fetchCartItems };
};
