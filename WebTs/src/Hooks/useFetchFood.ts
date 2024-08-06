import { useState, useEffect } from "react";
import { FormattedFood } from "../utils/foodUtils";
import { getFood } from "../services/foodService";

// ! Not used in the app

export const useFetchFood = (foodId: number) => {
  const [food, setFood] = useState<FormattedFood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchFood = async () => {
    setLoading(true);
    setError(null);
    setFood(await getFood(foodId));
  };

  
  useEffect(() => {
    fetchFood();
  }, [foodId]);

  return { food, loading, error, refetch: fetchFood };
};
