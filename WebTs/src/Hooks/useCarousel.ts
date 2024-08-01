import { useCallback, useEffect, useState } from "react";
import {
  addItemToCarousel,
  deleteItemFromCarousel,
} from "../services/carouselService";
import axios from "axios";
import { FormattedFood } from "../utils/foodUtils";

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

export const useFetchFood = (foodId: number) => {
  const [food, setFood] = useState<FormattedFood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFood = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9090/food/${foodId}`);
      setFood(response.data);
    } catch (err) {
      setError("Failed to fetch food details");
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  return { food, loading, error, refetch: fetchFood };
};