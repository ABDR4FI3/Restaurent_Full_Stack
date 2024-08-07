import { useLocation } from "react-router-dom";
import { FormattedFood } from "../../utils/foodUtils";
import Navbar from "../../Components/Nav/Navbar";
import Footer from "../../Components/Footer/footer";
import repeatStars from "../../utils/repeatStars";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PieChart } from "@mui/x-charts/PieChart";

const FoodDetails: React.FC = () => {
  const location = useLocation();
  const { food } = location.state as { food: FormattedFood };

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

  food.comments.map((comment) => console.log("Profile Image     : ", comment.user.image));

  return (
    <div className="bg-dark-bg min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center bg-dark-bg text-white mx-24 my-16">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-4/12 font-montserrat gap-10">
            <h2 className="text-4xl font-bold">{food.name}</h2>
            <p className="text-xl">Description: {food.description}</p>
            <p className="text-xl">Category: {food.category.name}</p>
            <p className="text-xl">Price: ${food.price}</p>
            <p className="text-lg">Rating: {repeatStars(food.rating)}</p>
          </div>
          {/* Image Section */}
          <div className="flex sm:h-3/4 justify-center items-center hover:bg-lightwood bg-wood rounded-xl hover:scale-125 duration-500 w-4/12 p-4">
            <img
              src={food.link}
              alt={food.name}
              className="w-full rounded-lg mb-2"
            />
          </div>
        </div>
        {/* Carousel Section */}
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
        {/*nutrition Chart Section */}
        <div className="my-8 flex sm:flex-col lg:flex-row w-full  justify-between">
          <div className="font-montserrat flex flex-col gap-4 justify-center ">
            <h2 className="text-4xl font-bold">Nutrition Facts</h2>
            <p className="text-xl">Calories: {food.totalCalories}</p>
          </div>
          <div
            className="flex justify-center items-center h-92"
            style={{ height: 400, width: 400 }}
          >
            {" "}
            <PieChart
              series={[
                {
                  data: nutritionData,
                  arcLabel(item) {
                    return `${item.id}: ${item.value}`;
                  },
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
        {/* Comment Section */}
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default FoodDetails;
