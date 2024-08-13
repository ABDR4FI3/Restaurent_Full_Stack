import { CarouselFood } from "../types/CarouselFood";
import { Category } from "../types/Category";
import { Comments } from "../types/Comments";
import { Food } from "../types/Food";

// Define the shape of the formatted food data
export interface FormattedFood {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  comments: Comments[];
  price: number;
  rating: number;
  category: Category;
  totalCalories: number;
  nutritionValue: { [key: string]: number };
  carousel: CarouselFood;
}
export interface FoodDTO {
  id: number;
  name: string;
  image: string;
  link: string;
  totalCalories: number;
  description: string;
  price: number;
  category: string;
  nutritionValue: { [key: string]: number };
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
    comments: food.comments,
    rating: food.rating,
    category: food.category,
    totalCalories: food.totalCalories,
    nutritionValue: food.nutritionValue,
    carousel: food.carousel,
  }));
};
export const formatFood = (food: Food): FormattedFood => {
  return {
    id: food.id,
    name: food.name,
    link: food.link,
    image: food.image,
    rating: food.rating,
    description: food.description,
    comments: food.comments,
    price: food.price,
    category: food.category,
    totalCalories: food.totalCalories,
    nutritionValue: food.nutritionValue,
    carousel: food.carousel,
  };
};

export const emptyFormattedFood: FormattedFood = {
  id: 0,
  name: "",
  image: "",
  link: "",
  description: "",
  rating: 0,
  price: 0,
  category: {
    id: 0,
    name: "",
  },
  comments: [],
  totalCalories: 0,
  carousel: {
    carouselId: 0,
    images: [],
    links: [],
  },
  nutritionValue: {
    fat: 0,
    protein: 0,
    carbs: 0,
    calories: 0,
  },
};

export const convertToFoodDTO = (food: FormattedFood): FoodDTO => {
  return {
    id: food.id,
    name: food.name,
    image: food.image,
    link: food.link,
    totalCalories: food.totalCalories,
    description: food.description,
    price: food.price,
    category: food.category.name, // Converting Category object to a string
    nutritionValue: convertNutritionValueToFloats(food.nutritionValue),
  };
};

const convertNutritionValueToFloats = (nutritionValue: {
  [key: string]: number;
}): { [key: string]: number } => {
  const floatValues: { [key: string]: number } = {};

  Object.keys(nutritionValue).forEach((key) => {
    floatValues[key] = parseFloat(nutritionValue[key].toFixed(1)); // Ensuring float precision
  });

  return floatValues;
};