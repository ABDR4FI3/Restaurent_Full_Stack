import { useState } from "react";
import {
  addItemToCarousel,
  deleteItemFromCarousel,
} from "../services/carouselService";

export const useAddItemToCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addItem = async (foodId: number, link: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addItemToCarousel(foodId, link, token);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return { addItem, loading, error };
};

export const useDeleteItemFromCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const deleteItem = async (foodId: number, link: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteItemFromCarousel(foodId, link, token);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return { deleteItem, loading, error };
};
