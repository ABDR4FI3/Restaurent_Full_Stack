import { Food } from "./Food";
import { User } from "./user";

export interface UserFavoriteFood {
  user: User;
  food: Food[];
}
