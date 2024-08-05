import { useState, useEffect } from "react";

import { emptyInventory, InventoryType } from "../types/Inventory";
import { GetInventory } from "../services/InventoryService";

const useInventory = () => {
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [item, setItem] = useState<InventoryType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<"add" | "edit">("add");
  const [visible, setVisible] = useState(false);

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
      if (action === "add") {
        // todo: add new item
        console.log("Add item:", item);
      } else {
        // todo: edit item
        console.log("Edit item:", item);
      }
      fetchInventories(); // * Refresh the inventory list
      setVisible(false); // * Hide the form after submission
    } catch (error) {
      console.error("Error submitting food data:", error);
    }
  };
  // * Calculate total items
  const totalItems = inventories.length;

  // * Calculate unique categories
  const uniqueCategories = new Set(inventories.map((item) => item.category));
  const categoriesCount = uniqueCategories.size;

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
    stats: {
      totalItems,
      categoriesCount,
      totalQuantity,
      suppliersCount,
    },
  };
};

export default useInventory;
