import { useState } from "react";
import { emptyFormattedFood, FormattedFood } from "../utils/foodUtils";
import { addFoodToMenu, editFoodFromMenu } from "../services/foodService";

const useFoodHandlers = () => {
  const [visible, setVisible] = useState(false);
  const [fooditem, setFooditem] = useState<FormattedFood | undefined>();
  const [action, setAction] = useState<"add" | "edit">("add");

  
  // * init the Modal feilds using handleEdit / HandleAddFood

  const handleEdit = (food: FormattedFood) => {
    setAction("edit");
    setFooditem(food);
    setVisible(true);
  };

  const handleAddFood = () => {
    setAction("add");
    setFooditem(emptyFormattedFood); 
    setVisible(true);
  };

  // *  handle delete
  const handleDelete = (food: FormattedFood) => {
    // todo Handle delete logic
    console.log("Delete food:", food);
  };

  const submitFood = async (food: FormattedFood) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again."
        );
      }
      if (action === "add") {
        await addFoodToMenu(food, token);
      } else {
        await editFoodFromMenu(food, token);
      }
      // Refresh the food list or perform additional actions after submission
      setVisible(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting food data:", error);
    }
  };

  return {
    visible,
    fooditem,
    action,
    handleEdit,
    handleDelete,
    handleAddFood,
    setVisible,
    submitFood,
  };
};

export default useFoodHandlers;
