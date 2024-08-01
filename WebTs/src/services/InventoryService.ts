import axios from "axios";

const API_URL = "http://localhost:9090";

export const getAllFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/food/all`);
    return response.data["foods"];
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
/*
export const addFoodToMenu = async (food: FormattedFood, token: string) => {
  const response = await axios.post(`${API_URL}/food/admin/add`, food, {
    params: { token },
  });
  return response.data;
};

export const editFoodFromMenu = async (food: FormattedFood, token: string) => {
  const response = await axios.post(`${API_URL}/food/admin/edit`, food, {
    params: { token },
  });
  return response.data;
};
*/