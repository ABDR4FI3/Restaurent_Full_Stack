import axios from "axios";
import { Orders } from "../types/Orders";

const API_URL = "http://localhost:9090";

export const getAllCartItems = async (): Promise<Orders[]> => {
  try {
    const token = localStorage.getItem("token");
    const status = "pending"
    const response = await axios.get(`${API_URL}/order/status`, {
      params: {
        token,
        status
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};
export const PayCartService = async (): Promise<Orders[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/cart/pay`, {
      params: {
        token,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error Paying cart items:", error);
    throw error;
  }
};
export const DeleteOrder = async (orderId : number): Promise<Orders[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/cart/remove`, null, {
      params: {
        token: token,
        orderId: orderId,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error Deleting your Order:", error);
    throw error;
  }
};
