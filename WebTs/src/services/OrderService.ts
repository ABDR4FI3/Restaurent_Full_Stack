import axios from "axios";
import { GetOrderStatusResponse, Orders } from "../types/Orders";

const API_URL = "http://localhost:9090";


export const getOrderStatusData = async (status: string): Promise<Orders[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<GetOrderStatusResponse>(
      `${API_URL}/order/status`,
      {
        params: {
          token,
          status,
        },
      }
    );
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};

export const PlaceOrder = async (
  foodId: number,
  qte: number
): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    const apiBody = {
      foodId,
      qte,
      token,
    };
    const response = await axios.post(`${API_URL}/order/make`, apiBody);
    console.log("Order placed successfully:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export default getOrderStatusData;
