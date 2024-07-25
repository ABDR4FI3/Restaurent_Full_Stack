import axios from "axios";
import { GetOrderStatusResponse } from "../types/Orders"; 

const API_URL = "http://localhost:9090/order/status";

const getOrderStatusData = async (
  status: string
): Promise<GetOrderStatusResponse> => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const response = await axios.get<GetOrderStatusResponse>(API_URL, {
      params: {
        token,
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};

export default getOrderStatusData;
