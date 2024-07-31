import { CarouselFood } from "./CarouselFood";
import { Category } from "./Category";
import { Comments } from "./Comments";

export interface Food {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  rating: number;
  price: number;
  category: Category;
  nutritionValue: { [key: string]: number };
  totalCalories: number;
  comments: Comments[];
  carousels: CarouselFood;
}
