import { UserRole } from "./UserRole";
import { Cart } from "./Cart";
export interface User {
  id: number;
  name: string;
  password: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  image: string;
  userRole: UserRole;
  cart: Cart;
}
