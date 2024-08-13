import React, { useState, useEffect } from "react";
import { FormattedFood } from "../../../../utils/foodUtils";
import { Category } from "../../../../types/Category";
import { useFoods } from "../../../../Hooks/useFood";
import { Food } from "../../../../types/Food";

interface MenuFormProps {
  food: Food | undefined;
  action: "add" | "edit";
  onSubmit: (food: FormattedFood) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ food, action, onSubmit }) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [formState, setFormState] = useState<Food>({
    id: 0,
    name: "",
    image: "",
    link: "",
    description: "",
    price: 0,
    category: {
      id: 0,
      name: "",
    },
    totalCalories: 0,
    carousel: {
      carouselId: 0,
      images: [""],
      links: [""],
    },
    nutritionValue: {
      fat: 0,
      protein: 0,
      carbs: 0,
      vitamins: 0,
    },
    comments: [],
    rating: 0,
  });

  //const { categories, loading, error } = useFetchCategories();
  const { categories, loading, error } = useFoods();

  useEffect(() => {
    if (action === "edit" && food) {
      setFormState(food);
      setPreviewImageUrl(food.image);
    }
  }, [action, food]);

  useEffect(() => {
    // Update previewImageUrl when formState.link changes
    setPreviewImageUrl(formState.link);
  }, [formState.link]);

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  if (name === "calories") {
    setFormState((prevState) => ({
      ...prevState,
      totalCalories: parseInt(value),
    }));
  } else if (name in formState.nutritionValue) {
    setFormState((prevState) => ({
      ...prevState,
      nutritionValue: {
        ...prevState.nutritionValue,
        [name]: parseInt(value),
      },
    }));
  } else if (name === "category") {
    const selectedCategory = categories.find(
      (category) => category.id.toString() === value
    );
    setFormState((prevState) => ({
      ...prevState,
      category: selectedCategory || prevState.category,
    }));
  } else {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
};
  console.log("formState:", formState);
  console.log("Original food:", food);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    console.log("Form submitted with state:", formState);
  };
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold mb-4">
        {action === "add" ? "Add Food Item" : "Edit Food Item"}
      </h2>
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
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
              name="link"
              value={formState.link}
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
            <select
              name="category"
              value={formState.category.id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex lg:flex-row sm:flex-col-reverse mb-4">
            <div className="basis-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Preview
              </label>
              <img
                src={previewImageUrl ? formState.link : previewImageUrl}
                height={200}
                width={200}
                alt=""
              />
            </div>
            <div className="flex flex-col basis-2/3">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formState.totalCalories}
                  onChange={handleChange}
                  id=""
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold my-3">
                  Nutrition Value
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Fat
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="fat"
                      value={formState.nutritionValue["fat"]}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-3/4 lg:w-full"
                      id=""
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Carbs
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="carbs"
                      value={formState.nutritionValue["carbs"]}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-3/4 lg:w-full"
                      id=""
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Protein
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="protein"
                      value={formState.nutritionValue["protein"]}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-3/4 lg:w-full"
                      id=""
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Vitamins
                    </label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="vitamins"
                      value={formState.nutritionValue["vitamins"]}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-3/4 lg:w-full"
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {action === "add" ? "Add Food" : "Update Food"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MenuForm;
