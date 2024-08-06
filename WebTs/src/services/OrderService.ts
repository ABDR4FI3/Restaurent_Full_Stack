import axios from "axios";
import { GetOrderStatusResponse, Orders } from "../types/Orders"; 

const API_URL = "http://localhost:9090/order/status";

const getOrderStatusData = async (
  status: string
): Promise<Orders[]> => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const response = await axios.get<GetOrderStatusResponse>(API_URL, {
      params: {
        token,
        status,
      },
    });
    console.log("response", response.data.orders);
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};

export default getOrderStatusData;
