import React, { useState, useEffect } from "react";
import { FormattedFood } from "../../../../utils/foodUtils";
import Loading from "../../../../lottie/Loading";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  useAddItemToCarousel,
  useDeleteItemFromCarousel,
} from "../../../../Hooks/useCarousel";

interface GalleryProps {
  food: FormattedFood;
}

const Gallery: React.FC<GalleryProps> = ({ food }) => {
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [newLink, setNewLink] = useState<string>("");
  const totalImages = food?.carouselImage.links.length || 0;
  const { addItem, loading: adding, error: addError } = useAddItemToCarousel();
  console.log(" test a43 ", food);
  const {
    deleteItem,
    loading: deleting,
    error: deleteError,
  } = useDeleteItemFromCarousel();

  useEffect(() => {
    if (loadedCount === totalImages) {
      setLoading(false);
    }
  }, [loadedCount, totalImages]);

  const handleImageLoad = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  const handleImageError = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token !== null) {
        await addItem(food.id, newLink, token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (link: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token !== null) {
        await deleteItem(food.id, link, token);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      {(loading || adding || deleting) && <Loading />}
      {addError && <p className="text-red-500">{addError}</p>}
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      <div className="flex justify-between">
        <h1 className="text-3xl font-libre">Gallery :</h1>
        <div className="flex justify-end">
          <input
            type="text"
            className="shadow-2xl text-center rounded-2xl p-2"
            required
            placeholder="insert the link "
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
        {food.carouselImage !== null  &&
          food?.carouselImage.links.map((link, index) => (
            <div className="relative" key={index}>
              <img
                src={link}
                alt={`Carousel image ${index}`}
                className="w-full"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {/* absolute delete button */}
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
