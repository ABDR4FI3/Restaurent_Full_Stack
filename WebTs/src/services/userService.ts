import axios from "axios";
import { User } from "../types/user";
import { Food } from "../types/Food";
import { UserFavoriteFood } from "../types/UserFavoriteFood";

const API_URL = "http://localhost:9090";


// Fetch all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/user/all`);
  console.log("response", response.data);
  return response.data;
};

export const GetUserData = async (): Promise<UserFavoriteFood> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<{
      user: User;
      favourites: Food[];
    }>(`${API_URL}/user/detail?token=${token}`);

    // Adjust the structure to match UserFavoriteFood
    return {
      user: response.data.user,
      food: response.data.favourites, // Map favourites to food
    };
  } catch (error) {
    console.error("Error Getting User Data :", error);
    throw error;
  }
};

