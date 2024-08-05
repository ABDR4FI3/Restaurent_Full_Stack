import axios from "axios";
import { InventoryType } from "../types/Inventory";

const API_URL = "http://localhost:9090";

export const GetInventory = async (): Promise<InventoryType[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<{ inventories: InventoryType[] }>(
      `${API_URL}/inventory/all?token=${token}`
    );

    console.log("response", response.data.inventories);
    return response.data.inventories;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
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
