import Navbar from "../../Components/Nav/Navbar";
import "./style.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaLongArrowAltRight } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import MapComponent from "../../Components/Map/MapComponent";
import Footer from "../../Components/Footer/footer";

import PopularFoodSwiper from "./Popular Food Swiper/PopularFood";
import Testimonial from "./Testimonials/Testimonial";

const HomePage: React.FC = () => {
  const testimonials = [
    "Dining at [Restaurant Name] was a delightful experience! The ambiance was cozy and inviting, perfect for a relaxing evening. I tried their signature seafood platter, and it was absolutely delicious—fresh, flavorful, and beautifully presented. The staff were attentive and friendly, making sure our needs were met throughout the meal. I highly recommend this place for anyone looking to enjoy a top-notch meal in a great atmosphere. I'll definitely be returning soon!",
    "As a food critic, I've visited many restaurants, but [Restaurant Name] truly stands out. The creative menu offers a unique twist on classic dishes, and the quality of the ingredients is evident in every bite. I was particularly impressed with their homemade pasta—it was cooked to perfection and paired with a rich, flavorful sauce. The service was impeccable, with staff who are knowledgeable about the menu and passionate about providing a great dining experience. This restaurant has quickly become one of my favorites, and I recommend it to anyone who appreciates fine dining.",
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-dark-bg text-white">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center  ">
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
                onClick={() => {
                  navigate("/menu");
                }}
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
              <img
                src="https://i.postimg.cc/d040Nscv/no-bg-burger.png"
                className="w-1/2"
                alt=""
              />
              <div className="flex flex-col w-1/2 rounded-2xl bg-lighter-dark p-10 items-center justify-center sm:h-1/4 glass-effect">
                <h1 className="text-4xl font-bold text-dark-yellew custom-font">
                  Why choose us
                </h1>
                <p className="text-white text-justify text-sm mt-5 px-10 LibreBodoni_description sm:text-ellipsis">
                  Experience the perfect fusion of innovation and style. Our
                  platform offers cutting-edge technology wrapped in a sleek,
                  elegant design. Choose us to elevate your expectations and
                  enjoy unparalleled functionality with a touch of
                  sophistication.
                </p>
                <p className="flex gap-10 items-center text-dark-yellew mt-5 ml-20 w-full">
                  <Link
                    to="/"
                    className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  >
                    learn more
                  </Link>
                  <FaLongArrowAltRight color="#bf8e43" size={25} />
                </p>
              </div>
            </div>
          </div>
          {/*  What we offer Section +  */}
          <div className="flex flex-col gap-10 justify-center items-center w-full mb-10 mt-16">
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
                <FaLeaf size={120} color="#bf8e43" />
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
                <TbTruckDelivery size={120} color="#bf8e43" />
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
                <RiDiscountPercentLine size={120} color="#bf8e43" />
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
              <div className="w-full flex justify-center">
                <PopularFoodSwiper />
              </div>
            </div>
          </div>
          {/* Image Background Interior Section */}
          <div className="interior-bg h-80 relative flex flex-col justify-center items-center my-10">
            <div className="overlay absolute inset-0"></div>
            <h1
              className=" text-5xl mb-4"
              style={{ fontFamily: "LibreBodoni" }}
            >
              Discover
            </h1>
            <p className="SecondPolice text-lg w-1/2 text-center">
              Discover new facets of taste together with our talented chefs who
              are ready to delight you with new delicious dishes and drinks
              every day.
            </p>
          </div>
          {/* Testimonial Section */}
          <div className="flex justify-center flex-col gap-4">
            <h2 className="text-5xl text-center SecondPolice ">Testimonials</h2>
            <div className="flex justify-center gap-16">
              {" "}
              <Testimonial
                img="https://i.postimg.cc/rybvTTVB/man.jpg"
                name="John Doe"
                text={testimonials[0]}
                stars={4}
              />
              <Testimonial
                img="https://i.postimg.cc/rybvTTVB/man.jpg"
                name="John Doe"
                text={testimonials[1]}
                stars={4}
              />
            </div>
          </div>
          {/* Our Location Section */}
          <div className="flex mx-16 items-center SecondPolice mb-10">
            <div className="basis-1/3 sm:basis-1/2 flex flex-col">
              <h1 className="text-4xl">Our Locations: </h1>
              <p>Working hours : 10:00 AM - 10:00 PM </p>
              <p>Phone : 0102030405</p>
              <p>Email : 6zQ5U@example.com</p>
            </div>
            <div className="w-full lg:basis-2/3 sm:basis-1/2">
              <MapComponent height="400px" width="100%" />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
