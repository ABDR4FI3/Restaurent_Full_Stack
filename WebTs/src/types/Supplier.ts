import { InventoryType } from "./Inventory";

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string; // ! Optional if not always present
  inventories?: InventoryType[]; 
}