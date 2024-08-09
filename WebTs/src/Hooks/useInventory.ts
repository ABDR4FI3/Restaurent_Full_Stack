import { useState, useEffect } from "react";

import { emptyInventory, InventoryType } from "../types/Inventory";
import {
  addFoodToMenu,
  GetInventory,
  HandleQuantity,
} from "../services/InventoryService";

const useInventory = () => {
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [item, setItem] = useState<InventoryType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const fetchInventories = async () => {
    setLoading(true);
    try {
      const data = await GetInventory();
      setInventories(data);
    } catch (error) {
      setError("Failed to fetch inventory data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  // * Handle Actions
  // ! Add
  const handleAdd = () => {
    setAction("add");
    setItem(emptyInventory);
    setVisible(true);
  };
  // ! Edit
  const handleEdit = (item: InventoryType) => {
    setAction("edit");
    setItem(item);
    setVisible(true);
  };
  // ! Delete
  const handleDelete = (item: InventoryType) => {
    // todo Handle delete logic
    console.log("Delete item:", item);
  };
  // ! Submit
  const submit = async (item: InventoryType) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again."
        );
      }
      console.log("Submit item:", item);

      // Create a new item object without the inventories property in suppliers
      const itemWithoutInventories = {
        ...item,
        suppliers: item.suppliers.map(({ inventories, ...rest }) => rest),
      };

      console.log("Item without inventories:", itemWithoutInventories);

      if (action === "add") {
        // Add new item
        console.log("Add item:", itemWithoutInventories);
        await addFoodToMenu(itemWithoutInventories, token);
      } else {
        // Edit item
        console.log("Edit item:", itemWithoutInventories);
        // Add your edit logic here
      }
      fetchInventories(); // Refresh the inventory list
      setVisible(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting food data:", error);
    }
  };
  // ! Quantity
  const handleQuantity = async (id: number, qte: number, action: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again."
        );
      }
      const response = await HandleQuantity(id, qte, action, token);
      console.log("Response:", response);
      setMessage(response);
      fetchInventories();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting food data:", error);
    }
  };

  // * Calculate total items
  const totalItems = inventories.length;

  // * return categories
  useEffect(() => {
    const categor = inventories.map((item) => item.category.name);
    categor.push("All");
    categor.push("Warning");
    categor.sort();
    const uniqueCategories8 = Array.from(new Set(categor));
    setCategories(uniqueCategories8);
  }, [inventories]);

  // * Calculate unique categories

  const categoriesCount = categories.length;

  // * Calculate total quantity
  const totalQuantity = inventories.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // * Calculate unique suppliers
  const allSuppliers = inventories.flatMap((item) => item.suppliers);
  const uniqueSuppliers = new Set(allSuppliers.map((supplier) => supplier.id));
  const suppliersCount = uniqueSuppliers.size;

  return {
    inventories,
    categories,
    loading,
    error,
    action,
    visible,
    setVisible,
    item,
    handleAdd,
    handleEdit,
    submit,
    handleDelete,
    handleQuantity,
    message,
    stats: {
      totalItems,
      categoriesCount,
      totalQuantity,
      suppliersCount,
    },
  };
};

export default useInventory;
