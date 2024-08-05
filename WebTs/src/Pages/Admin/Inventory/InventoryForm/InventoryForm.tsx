import React, { useState, useEffect } from "react";
import { Supplier } from "../../../../types/Supplier";
import useFetchCategories from "../../../../Hooks/useFetchCategories";
import { InventoryType } from "../../../../types/Inventory";
import { useSuppliers } from "../../../../Hooks/useSupplier";

interface InventoryFormProps {
  item: InventoryType | undefined;
  action: "add" | "edit";
  onSubmit: (inventory: InventoryType) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  item,
  action,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<InventoryType>({
    id: 0,
    itemName: "",
    quantity: 0,
    price: 0,
    minQuantity: 0,
    category: 0,
    suppliers: [],
  });

  const [supplierOptions, setSupplierOptions] = useState<Supplier[]>([]);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();
  const {
    suppliers,
    loading: suppliersLoading,
    error: suppliersError,
  } = useSuppliers();

  useEffect(() => {
    if (action === "edit" && item) {
      setFormState(item);
    }
  }, [action, item]);

  useEffect(() => {
    setSupplierOptions(suppliers);
  }, [suppliers]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const inputElement = e.target as HTMLInputElement;

    if (name === "suppliers") {
      const checked = inputElement.checked; // Narrow down the type here
      const supplierId = parseInt(value);
      setFormState((prevState) => ({
        ...prevState,
        suppliers: checked
          ? [
              ...prevState.suppliers,
              suppliers.find((s) => s.id === supplierId) as Supplier,
            ]
          : prevState.suppliers.filter(
              (supplier) => supplier.id !== supplierId
            ),
      }));
    } else if (name === "category") {
      setFormState((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    console.log("Form submitted with state:", formState);
  };

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold mb-4">
        {action === "add" ? "Add Inventory Item" : "Edit Inventory Item"}
      </h2>
      {categoriesLoading || suppliersLoading ? <p>Loading...</p> : null}
      {categoriesError && <p className="text-red-500">{categoriesError}</p>}
      {suppliersError && <p className="text-red-500">{suppliersError}</p>}
      {!categoriesLoading &&
        !suppliersLoading &&
        !categoriesError &&
        !suppliersError && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="itemName"
                value={formState.itemName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formState.quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Min Quantity
              </label>
              <input
                type="number"
                name="minQuantity"
                value={formState.minQuantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formState.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Suppliers
              </label>
              <div className="grid grid-cols-3">
                {supplierOptions.map((supplier) => (
                  <div key={supplier.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="suppliers"
                      value={supplier.id}
                      checked={formState.suppliers.some(
                        (s) => s.id === supplier.id
                      )}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label>{supplier.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-start gap-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {action === "add" ? "Add Inventory" : "Update Inventory"}
              </button>
            </div>
          </form>
        )}
    </div>
  );
};

export default InventoryForm;
