import React, { useState } from "react";
import Navbar from "../../Components/Nav/Navbar";
import { useFoods } from "../../Hooks/useFood";

import Footer from "../../Components/Footer/footer";
import FoodContainer from "./Container/FoodContainer";
import { useNavigate } from "react-router-dom";
import { FormattedFood } from "../../utils/foodUtils";

const MenuPage: React.FC = () => {
  const { categories, foods, loading, error } = useFoods();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  // Filter foods based on selected category
  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category.id === selectedCategory)
    : foods;

  const OpenDetails = (food: FormattedFood) => {
    navigate("/details", { state: { food } });
  };

  return (
    <div className="flex flex-col bg-dark-bg text-white h-full">
      <Navbar />
      {/* ul categories */}
      <div>
        <ul className="lg:flex sm:grid sm:grid-cols-3 gap-20 justify-center text-2xl font-montserrat ">
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
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-16 w-10/12 ">
          {filteredFoods.map((food) => (
            <FoodContainer
              key={food.id}
              img={food.link}
              rating={food.rating}
              price={food.price}
              name={food.name}
              onClick={() => {
                OpenDetails(food);
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
