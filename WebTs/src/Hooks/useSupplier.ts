import { useEffect, useState } from "react";
import { Supplier } from "../types/Supplier";
import { fetchSuppliers } from "../services/supplierService";

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
      console.log("my suppliers:", data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load suppliers");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  return { suppliers, loading, error };
};
