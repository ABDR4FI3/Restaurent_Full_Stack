import { useState, useEffect } from "react";

import { Inventory } from "../types/Inventory";
import { GetInventory } from "../services/InventoryService";

const useInventory = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchInventories();
  }, []);
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
    stats: {
      totalItems,
      categoriesCount,
      totalQuantity,
      suppliersCount,
    },
  };
};

export default useInventory;
