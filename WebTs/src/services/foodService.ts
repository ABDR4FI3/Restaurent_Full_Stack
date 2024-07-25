import axios from "axios";

const API_URL = "http://localhost:9090/food/all";

export const getAllFoods = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data["foods"];
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
