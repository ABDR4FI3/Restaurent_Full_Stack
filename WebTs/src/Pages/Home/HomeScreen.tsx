import Navbar from "../../Components/Nav/Navbar";
import "./style.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import plat from "../../assets/Img/Home/fancyBurger.png";
import { Link } from "react-router-dom";
import { FaLeaf, FaLongArrowAltRight } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import FoodContainer from "./Popular food/FoodContainer";
import food1 from "../../assets/Images/pizza/pizza.jpg";
import food2 from "../../assets/Images/Burger/burger1.png";
import food3 from "../../assets/Images/Biryani/biryani1.png";
import food4 from "../../assets/Images/Ramen/ramen1.png";


const HomePage: React.FC = () => {
  return (
    <div className="bg-dark-bg text-white">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center w ">
        {/* Hero Section Sying + image */}
        <div className="flex justify-center items-center w-full bg-home1 h-screen">
          {/* Text Section */}
          <div className="flex flex-col ">
            <h1 className="text-4xl font-bold  custom-font px-28">
              Discover our gourmet recipes.
            </h1>
            <div className="flex justify-evenly items-center mt-10">
              {/* Location Section */}
              <div className="flex gap-5">
                <FaLocationDot color="#FFFFE0" size={30} />
                <p className="  text-xl SecondPolice">Discover our Locations</p>
              </div>
              <div className="flex gap-5">
                <IoMdTime color="#FFFFE0" size={30} />
                <p className=" text-2xl SecondPolice">Our Working Hours</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="Font text-2xl mt-10 border p-5 rounded-xl hover:scale-105 duration-1000"
                style={{ fontFamily: "LibreBodoni", fontWeight: "lighter" }}
              >
                Check our Menu
              </button>
            </div>{" "}
          </div>
        </div>
        {/* Second Section Sying +  */}
        <div className="bg-gradient">
          <div className="flex justify-center items-center w-full  ">
            {/* Container */}
            <div className="flex w-9/12 justify-center items-center p-8 mt-10">
              <img src={plat} className="w-1/2" alt="" />
              <div className="flex flex-col w-1/2 rounded-2xl bg-lighter-dark p-10 items-center justify-center sm:h-1/4">
                <h1 className="text-4xl   font-bold text-dark-yellew custom-font">
                  Why choose us
                </h1>
                <p className="text-white text-justify text-sm mt-5 px-10 LibreBodoni_description sm:text-ellipsis">
                  Experience the perfect fusion of innovation and style. Our
                  platform offers cutting-edge technology wrapped in a sleek,
                  elegant design. Choose us to elevate your expectations and
                  enjoy unparalleled functionality with a touch of
                  sophistication.
                </p>
                <p className="flex gap-10  items-center text-dark-yellew mt-5 ml-20 w-full">
                  <Link
                    to="/"
                    className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  ></Link>
                  learn more
                  <FaLongArrowAltRight color="#bf8e43" size={25} />
                </p>
              </div>
            </div>
          </div>
          {/* What we offer Section +  */}
          <div className="flex flex-col gap-10 justify-center items-center w-full   mt-16">
            {/*Text Section*/}
            <div
              className="flex flex-col justify-center items-center gap-4"
              style={{ fontFamily: "LibreBodoni" }}
            >
              {" "}
              <h1 className="text-5xl">What we offer</h1>
              <p>what keep millions of people coming back</p>
            </div>
            {/*Container Section*/}
            <div className="flex justify-evenly gap-10 w-full">
              <div className="flex flex-col items-center">
                <FaLeaf size={150} color="#bf8e43" />
                <h1
                  className="text-4xl text-center p-5"
                  style={{ fontFamily: "LibreBodoni" }}
                >
                  Fresh ingredients
                </h1>
                <p className="  text-center SecondPolice">
                  we serve the best quality fresh food{" "}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <TbTruckDelivery size={150} color="#bf8e43" />
                <h1
                  className=" text-4xl text-center p-5"
                  style={{ fontFamily: "LibreBodoni" }}
                >
                  Delivery
                </h1>
                <p className="  text-center SecondPolice">
                  Fastest delivery you can wish for !
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RiDiscountPercentLine size={150} color="#bf8e43" />
                <h1
                  className=" text-4xl text-center p-5 "
                  style={{ fontFamily: "LibreBodoni" }}
                >
                  best offers
                </h1>
                <p className=" w-7/12 text-justify SecondPolice">
                  We offer the best offers for our valuable customers
                </p>
              </div>
            </div>
            {/* Popular Food Section */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-5xl my-8 SecondPolice">Popular Food</h1>
              <div className="grid grid-cols-4 gap-10 mx-16">
                <FoodContainer
                  img={food1}
                  rating={4.5}
                  price={10}
                  name="pizza"
                />
                <FoodContainer
                  img={food2}
                  rating={4.5}
                  price={10}
                  name="pizza"
                />
                <FoodContainer
                  img={food3}
                  rating={4.5}
                  price={10}
                  name="pizza"
                />
                <FoodContainer
                  img={food4}
                  rating={4.5}
                  price={10}
                  name="pizza"
                />
              </div>
            </div>
          </div>
          {/* Image Background Interior Section */}
          <div className="interior-bg h-screen relative">
            <div className="overlay absolute inset-0"></div>
            <h1 className="relative z-10">Discover</h1>
            <p className="relative z-10">the best of food</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
