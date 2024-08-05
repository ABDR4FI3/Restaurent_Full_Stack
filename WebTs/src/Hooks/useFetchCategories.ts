import { useState, useEffect } from "react";
import { Category } from "../types/Category";
import { GetInventoryCategories } from "../services/InventoryService";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await GetInventoryCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories;
