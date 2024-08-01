
import { CarouselFood } from "../types/CarouselFood";
import { Category } from "../types/Category";
import { Food } from "../types/Food";

// Define the shape of the formatted food data
export interface FormattedFood {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  price: number;
  category: Category;
  calories: number;
  nutionValue: { [key: string]: number };
  carouselImage: CarouselFood;
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
    category: food.category,
    calories: food.totalCalories,
    nutionValue: food.nutritionValue,
    carouselImage: food.carousel,
  }));
};
export const formatFood = (food: Food): FormattedFood => {
  return {
    id: food.id,
    name: food.name,
    link: food.link,
    image: food.image,
    description: food.description,
    price: food.price,
    category: food.category,
    calories: food.totalCalories,
    nutionValue: food.nutritionValue,
    carouselImage: food.carousel,
  };
};

export const emptyFormattedFood: FormattedFood = {
  id: 0,
  name: "",
  image: "",
  link: "",
  description: "",
  price: 0,
  category: {
    id: 0,
    name: "",
  },
  calories: 0,
  carouselImage: {
    carouselId: 0,
    images: [],
    links: [],
  },
  nutionValue: {
    fat: 0,
    protein: 0,
    carbs: 0,
    calories: 0,
  },
};
