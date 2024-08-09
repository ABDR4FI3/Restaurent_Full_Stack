import { useLocation } from "react-router-dom";
import { FormattedFood } from "../../utils/foodUtils";
import Navbar from "../../Components/Nav/Navbar";
import Footer from "../../Components/Footer/footer";
import repeatStars from "../../utils/repeatStars";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PieChart } from "@mui/x-charts/PieChart";
import Comment from "./Comments/Comments";
import OrderButton from "./OrderButton/OrderButton";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaCircle, FaMinus, FaPlus } from "react-icons/fa";
import { usePlaceOrder } from "../../Hooks/useOrders";
import { CiStar } from "react-icons/ci";

const FoodDetails: React.FC = () => {
  const location = useLocation();
  const { food } = location.state as { food: FormattedFood };
  const [quantity, setQuantity] = useState<number>(1);
  const { error, loading, placeOrder } = usePlaceOrder();

  // * Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // * Chart Data
  const nutritionData = [
    { id: "carbs", value: food.nutritionValue.carbs },
    { id: "protein", value: food.nutritionValue.protein },
    { id: "fat", value: food.nutritionValue.fat },
    { id: "vitamins", value: food.nutritionValue.vitamins },
  ];

  // * Quantity Handlers
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handlePlaceOrder = async (id: number, quantity: number) => {
    try {
      await placeOrder(id, quantity);
      toast.success("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen">
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar />
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="flex flex-col items-center bg-dark-bg text-white mx-24 my-16">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-4/12 font-montserrat gap-10 basis-6/12">
            <h2 className="text-4xl font-bold">{food.name}</h2>
            <p className="text-xl">
              <span className="font-bold text-dark-yellew">Description:</span>{" "}
              {food.description}
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col gap-8">
                <p className="text-xl">
                  <span className="text-dark-yellew font-bold">
                    Category :{" "}
                  </span>{" "}
                  {food.category.name}
                </p>
                <p className="text-xl">
                  <span className="text-dark-yellew font-bold">Price : </span> $
                  {food.price}
                </p>
                <p className="text-lg">
                  <span className="text-dark-yellew font-bold">Rating : </span>{" "}
                  {repeatStars(food.rating)}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end items-center">
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-4 border rounded-full"
                >
                  <FaMinus />
                </button>
                <span className="mx-4 text-xl">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-4 border rounded-full"
                >
                  <FaPlus />
                </button>
              </div>
              <OrderButton
                onClick={() => handlePlaceOrder(food.id, quantity)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8 w-4/12">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-dark-yellew text-white px-4 py-2 rounded-2xl font-montserrat">
                Add to Favourites <CiStar size={30} />
              </button>
            </div>
            <div className="flex  sm:h-3/4 justify-center items-center hover:bg-lightwood bg-wood rounded-xl hover:scale-110 duration-500  p-4">
              <img
                src={food.link}
                alt={food.name}
                className="w-full rounded-lg mb-2"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <Slider {...settings} className="carousel-slider">
            {food.carousel.links.map((link, index) => (
              <div
                className="px-4 flex justify-center items-center"
                key={index}
              >
                <img
                  src={link}
                  style={{ objectFit: "contain" }}
                  alt={`Slide ${index}`}
                  className="rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="my-8 flex sm:flex-col lg:flex-row w-full  justify-between">
          <div className="font-montserrat flex flex-col gap-4 justify-center ">
            <h2 className="text-4xl font-bold">Nutrition Facts</h2>
            <p className="text-xl">Calories: {food.totalCalories}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-2 items-center">
                <p className="text-xl">Carbs: {food.nutritionValue.carbs}</p>
                <div className="flex justify-center">
                  <FaCircle color="#02b3b0" />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="text-xl">
                  Protein: {food.nutritionValue.protein}
                </p>
                <div className="flex justify-center">
                  <FaCircle color="#2e96ff" />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="text-xl">Fat: {food.nutritionValue.fat}</p>
                <div className="flex justify-center">
                  <FaCircle color="b800d9" />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="text-xl">
                  Vitamins: {food.nutritionValue.vitamins}
                </p>
                <div className="flex justify-center">
                  <FaCircle color="60009c" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center h-92"
            style={{ height: 400, width: 400 }}
          >
            <PieChart
              series={[
                {
                  data: nutritionData,
                  arcLabelRadius: 80,
                  innerRadius: 15,
                  outerRadius: 150,
                  paddingAngle: 5,
                  cornerRadius: 10,
                  startAngle: -90,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-4xl font-bold font-montserrat">Comments</h2>
          {food.comments.map((comment) => (
            <Comment comments={comment} key={comment.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoodDetails;
