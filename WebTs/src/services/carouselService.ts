import axios from "axios";

const API_URL = "http://localhost:9090"; // Replace with your actual API base URL

export const addItemToCarousel = async (
  foodId: number,
  link: string,
  token: string
) => {
  try {
    const response = await axios.post(`${API_URL}/carousel/add`, null, {
      params: {
        food_id: foodId,
        link,
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItemFromCarousel = async (
  foodId: number,
  link: string,
  token: string
) => {
  try {
    const response = await axios.post(`${API_URL}carousel/delete`, null, {
      params: {
        food_id: foodId,
        link,
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
