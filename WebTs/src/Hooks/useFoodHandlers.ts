import { useState } from "react";
import { FormattedFood } from "../utils/foodUtils";

const useFoodHandlers = () => {
  const [visible, setVisible] = useState(false);
  const [fooditem, setFooditem] = useState<FormattedFood | undefined>();
  const [action, setAction] = useState<"add" | "edit">("add");

  const handleEdit = (food: FormattedFood) => {
    setAction("edit");
    setFooditem(food);
    setVisible(true);
  };

  const handleDelete = (food: FormattedFood) => {
    setFooditem(food);
    setVisible(true);
  };

  const handleAddFood = () => {
    setAction("add");
    setFooditem(undefined); // Clear the current food item
    setVisible(true);
  };

  return {
    visible,
    fooditem,
    action,
    handleEdit,
    handleDelete,
    handleAddFood,
    setVisible,
  };
};

export default useFoodHandlers;
