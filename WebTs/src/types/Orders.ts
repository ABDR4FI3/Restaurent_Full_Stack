import { Food } from "./Food";

export interface Orders {
  id: number;
  qte: number;
  status: string;
  food: Food;
}
export interface GetOrderStatusResponse {
  response: number;
  orders: Orders[];
}