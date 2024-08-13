import { useState, useEffect } from "react";
import { getAllFoods, getFood } from "../services/foodService";
import { Category } from "../types/Category";
import { Food } from "../types/Food";

export const useFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    try {
      const foodData = await getAllFoods();
      console.log("foodData:", foodData);
      setFoods(foodData);
      // Deduplicate categories based on their IDs
      const uniqueCategories = Array.from(
        new Map(
          foodData.map((food) => [food.category.id, food.category])
        ).values()
      );
      uniqueCategories.push({ id: 0, name: "All" });
      uniqueCategories.sort((a,b) => a.id - b.id);
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch food data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return { foods, categories, loading, error };
};
export const useFetchFood = (foodId: number) => {
  const [food, setFood] = useState<Food | null>(null);
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
