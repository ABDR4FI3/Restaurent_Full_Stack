import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Example images
import food1 from "../../../assets/Images/pizza/pizza.jpg";
import food2 from "../../../assets/Images/pasta/pasta.jpg";
import food3 from "../../../assets/Images/Biryani/biryani1.png";
import food4 from "../../../assets/Images/Burger/burger1.png";
import FoodContainer from "../Popular food/FoodContainer";

const CarouselComponent: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="mx-8 ">
      <Slider {...settings} className="carousel-slider ">
        <div className="px-4">
          {" "}
          {/* Adjust padding for gap */}
          <FoodContainer img={food1} rating={3} price={10} name="Pizza" />
        </div>
        <div className="px-4">
          {" "}
          {/* Adjust padding for gap */}
          <FoodContainer img={food2} rating={4.5} price={12} name="Burger" />
        </div>
        <div className="px-4">
          {" "}
          {/* Adjust padding for gap */}
          <FoodContainer img={food3} rating={4.0} price={8} name="Sushi" />
        </div>
        <div className="px-4">
          {" "}
          {/* Adjust padding for gap */}
          <FoodContainer img={food4} rating={5.0} price={15} name="Pasta" />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;