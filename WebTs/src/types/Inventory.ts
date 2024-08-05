import { Supplier } from "./Supplier";

export interface InventoryType {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
  category: number;
  minQuantity: number;
  suppliers: Supplier[];
}

export const emptyInventory: InventoryType = {
  id: 0,
  itemName: "",
  quantity: 0,
  price: 0,
  category: 0,
  minQuantity: 0,
  suppliers: [],
} 