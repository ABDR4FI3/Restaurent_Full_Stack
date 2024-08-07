import axios from "axios";

const API_URL = "http://localhost:9090";

export const getAllCartItems = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/cart/all`, {
      params: {
        token,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};
