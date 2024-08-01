import { Supplier } from "./Supplier";

export interface Inventory{
    id: number;
    name: string;
    quantity: number;
    price: number;
    category: string;
    suppliers: Supplier[];
}