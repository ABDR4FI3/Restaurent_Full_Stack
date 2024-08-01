import { useState, useEffect } from "react";
import axios from "axios";
import { FormattedFood } from "../utils/foodUtils";

const API_URL = "http://localhost:9090"; // Replace with your actual API base URL

export const useFetchFood = (foodId: number) => {
  const [food, setFood] = useState<FormattedFood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchFood = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/food/${foodId}`);
      setFood(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  // Fetch food data when component mounts or foodId changes
  useEffect(() => {
    fetchFood();
  }, [foodId]);

  return { food, loading, error, refetch: fetchFood };
};
