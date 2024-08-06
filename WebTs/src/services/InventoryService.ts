import axios from "axios";
import { InventoryType } from "../types/Inventory";
import { InventoryCategory } from "../types/inventoryCategory";

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
export const GetInventoryCategories = async (): Promise<
  InventoryCategory[]
> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<{ categories: InventoryCategory[] }>(
      `${API_URL}/inventoryCategory/all?token=${token}`
    );

    console.log("response Categories", response.data.categories);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

export const addFoodToMenu = async (item: InventoryType, token: string) => {
  console.log("addFoodToMenu", item);
  const response = await axios.post(`${API_URL}/inventory/add?token=${token}`, item);

  console.log("response Add food", response.data);
  return response.data;
};

export const editFoodFromMenu = async (item: InventoryType, token: string) => {
  const response = await axios.post(`${API_URL}/inventory/edit`, item, {
    params: { token },
  });
  return response.data;
};
