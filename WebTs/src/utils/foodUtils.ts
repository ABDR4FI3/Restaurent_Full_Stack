
import { Food } from "../types/Food";

// Define the shape of the formatted food data
export interface FormattedFood {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  price: number;
  category: string;
  calories: number;
  nutionValue: { [key: string]: number };
}

// ! Function to format food data
export const formatFoods = (foods: Food[]): FormattedFood[] => {
  return foods.map((food) => ({
    id: food.id,
    name: food.name,
    link: food.link,
    image: food.image,
    description: food.description,
    price: food.price,
    category: food.category.name,
    calories: food.totalCalories,
    nutionValue: food.nutritionValue,
  }));
};

export const emptyFormattedFood: FormattedFood = {
  id: 0,
  name: "",
  image: "",
  link: "",
  description: "",
  price: 0,
  category: "",
  calories: 0,
  nutionValue: {
    fat: 0,
    protein: 0,
    carbs: 0,
    calories: 0,
  },
};
