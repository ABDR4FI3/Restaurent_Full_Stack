import axios from "axios";
import { convertToFoodDTO, FormattedFood } from "../utils/foodUtils";
import { Food } from "../types/Food";

const API_URL = "http://localhost:9090";

export const getAllFoods = async (): Promise<Food[]> => {
  try {
    const response = await axios.get<{ foods: Food[] }>(
      `${API_URL}/food/all`
    );
    return response.data.foods;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
export const getFood = async (foodid: number): Promise<Food> => {
  try {
    const response = await axios.get<{ food: Food }>(
      `${API_URL}/food/${foodid}`
    );
    return response.data.food;
  } catch (error: any) {
        console.error("Error fetching food data:", error);
        throw error;
  }
};

export const addFoodToMenu = async (food: FormattedFood, token: string) => {
  console.log("addFoodToMenu", food);
  const foodDto = convertToFoodDTO(food);
  const response = await axios.post(`${API_URL}/food/admin/add`, foodDto, {
    params: { token },
  });
  return response.data;
};

export const editFoodFromMenu = async (food: FormattedFood, token: string) => {
  console.log("editFoodFromMenu", food);
  const foodDto  = convertToFoodDTO(food);
  console.log("foodDto", foodDto);
  const response = await axios.post(`${API_URL}/food/admin/edit`, foodDto, {
    params: { token },
  });
  return response.data;
};
