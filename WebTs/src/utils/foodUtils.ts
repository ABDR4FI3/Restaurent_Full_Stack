
import { Food } from "../types/Food";

// Define the shape of the formatted food data
export interface FormattedFood {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

// ! Function to format food data
export const formatFoods = (foods: Food[]): FormattedFood[] => {
  return foods.map((food) => ({
    id: food.id,
    name: food.name,
    image: food.image,
    description: food.description,
    price: food.price,
    category: food.category.name,
  }));
};
