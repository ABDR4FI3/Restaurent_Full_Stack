import React, { useState, useEffect } from "react";
import { FormattedFood } from "../../../../utils/foodUtils";

interface MenuFormProps {
  food: FormattedFood | undefined;
  action: "add" | "edit";
}

const MenuForm: React.FC<MenuFormProps> = ({ food, action }) => {
  const [formState, setFormState] = useState<FormattedFood>({
    id: 0,
    name: "",
    image: "",
    link: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (action === "edit" && food) {
      setFormState(food);
    }
  }, [action, food]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add submit logic here, such as calling an API to save the food item
    console.log("Form submitted with state:", formState);
  };

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold mb-4">
        {action === "add" ? "Add Food Item" : "Edit Food Item"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formState.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formState.description}
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
          <input
            type="text"
            name="category"
            value={formState.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Preview
          </label>
          <img src={formState.link}  height={200} width={200} alt=""  />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {action === "add" ? "Add Food" : "Update Food"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
