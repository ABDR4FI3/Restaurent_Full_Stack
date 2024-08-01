import React, { useState, useEffect } from "react";
import Loading from "../../../../lottie/Loading";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  useAddItemToCarousel,
  useDeleteItemFromCarousel,
  useFetchFood,
} from "../../../../Hooks/useCarousel";
import { FormattedFood } from "../../../../utils/foodUtils";

interface GalleryProps {
  fooditem: FormattedFood;
}

const Gallery: React.FC<GalleryProps> = ({ fooditem }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [newLink, setNewLink] = useState<string>("");
  const { food, refetch } = useFetchFood(fooditem.id);
  const [foodData, SetFoodData] = useState<FormattedFood>(fooditem);
  const { addItem, loading: adding, error: addError } = useAddItemToCarousel();
  const {
    deleteItem,
    loading: deleting,
    error: deleteError,
  } = useDeleteItemFromCarousel();

  useEffect(() => {
    if (food) {
      SetFoodData(food);
    }
  }, [food]);

  useEffect(() => {
    if (foodData) {
      setLoading(false);
    }
  }, [foodData]);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await addItem(fooditem.id, newLink, token);
        await refetch();
        setNewLink("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (link: string) => {
    if (foodData?.carouselImage.links.length === 1 ) {
      setError("You can't delete all the images");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (window.confirm("Are you sure you want to delete this image?")) {
          await deleteItem(fooditem.id, link, token);
          await refetch();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      {(loading || adding || deleting) && <Loading />}
      {error && <p className="text-red-500 text-2xl">{error}</p>}
      {addError && <p className="text-red-500">{addError}</p>}
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      <div className="flex justify-between">
        <h1 className="text-3xl font-libre">Gallery :</h1>
        <div className="flex justify-end">
          <input
            type="text"
            className="shadow-2xl text-center rounded-2xl p-2"
            required
            placeholder="Insert the link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 rounded-full p-2 text-white hover:text-blue-500 hover:bg-white hover:border-blue-500 border-2 duration-700"
          >
            <IoIosAddCircleOutline size={30} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 my-8">
        {foodData &&
          foodData.carouselImage.links.map((link: string, index: number) => (
            <div className="relative" key={index}>
              <img
                src={link}
                alt={`Carousel image ${index}`}
                className="w-full"
              />
              <div className="absolute top-0 right-0">
                <button
                  onClick={() => handleDelete(link)}
                  className="bg-red-500 rounded-full p-2 text-white hover:text-red-500 hover:bg-white hover:border-red-500 border-2 duration-500"
                >
                  <MdDelete size={30} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
