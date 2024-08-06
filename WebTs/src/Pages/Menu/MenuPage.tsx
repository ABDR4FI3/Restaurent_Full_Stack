import React, { useState } from "react";
import Navbar from "../../Components/Nav/Navbar";
import { useFoods } from "../../Hooks/useFood";

import Footer from "../../Components/Footer/footer";
import FoodContainer from "./Container/FoodContainer";

const MenuPage: React.FC = () => {
  const { categories, foods, loading, error } = useFoods();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filter foods based on selected category
  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category.id === selectedCategory)
    : foods;

  return (
    <div className="flex flex-col bg-dark-bg text-white h-full">
      <Navbar />
      {/* ul categories */}
      <div>
        <ul className="flex gap-20 justify-center text-2xl font-montserrat ">
          {loading && <li>Loading...</li>}
          {error && <li>Error: {error}</li>}
          {!loading && !error && categories.length === 0 && (
            <li>No categories found</li>
          )}
          {!error &&
            !loading &&
            categories.map((category) => (
              <li
                className="hover:text-dark-yellow duration-150 cursor-pointer nav-link hover:text-dark-yellew"
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
      {/* Data */}
      <div className="flex justify-center my-8">
        <div className="grid grid-cols-4 gap-16 w-10/12 ">
          {filteredFoods.map((food) => (
            <FoodContainer
              key={food.id}
              img={food.link}
              rating={food.rating}
              price={food.price}
              name={food.name}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
