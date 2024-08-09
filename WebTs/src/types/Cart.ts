import { Orders } from "./Orders";

export interface Cart {
    id: number;
    orders: Orders[];
  }