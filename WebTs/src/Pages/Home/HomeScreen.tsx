import Navbar from "../../Components/Nav/Navbar";
import "./style.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import plat from "../../assets/Img/Home/fancyBurger.png";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const HomePage: React.FC = () => {
  return (
    <div className="bg-dark-bg">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center w ">
        {/* Hero Section Sying + image */}
        <div className="flex justify-center items-center w-full mx-16 bg-home1 h-screen">
          {/* Text Section */}
          <div className="flex flex-col ">
            <h1 className="text-4xl font-bold text-white custom-font px-28">
              Discover our gourmet recipes.
            </h1>
            <div className="flex justify-evenly items-center mt-10">
              {/* Location Section */}
              <div className="flex gap-5">
                <FaLocationDot color="#FFFFE0" size={30} />
                <p
                  className=" text-white text-2xl"
                  style={{ fontFamily: "LibreBodoni" }}
                >
                  Discover our Locations
                </p>
              </div>
              <div className="flex gap-5">
                <IoMdTime color="#FFFFE0" size={30} />
                <p
                  className=" text-white text-2xl"
                  style={{ fontFamily: "LibreBodoni", fontWeight: "lighter" }}
                >
                  Our Working Hours
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="Font text-white text-2xl mt-10 border p-5 rounded-xl hover:scale-105 duration-1000"
                style={{ fontFamily: "LibreBodoni", fontWeight: "lighter" }}
              >
                Check our Menu
              </button>
            </div>{" "}
          </div>
        </div>
        {/* Second Section Sying +  */}
        <div className="flex justify-center items-center w-full mx-16">
          {/* Container */}
          <div className="flex w-9/12 justify-center items-center p-8 mt-10">
            <img src={plat} className="w-1/2" alt="" />
            <div className="flex flex-col w-1/2 rounded-2xl bg-lighter-dark p-10 items-center justify-center">
              <h1 className="text-4xl   font-bold text-dark-yellew custom-font">
                Why choose us
              </h1>
              <p className="text-white text-justify text-sm mt-5 px-10 LibreBodoni_description ">
                Experience the perfect fusion of innovation and style. Our
                platform offers cutting-edge technology wrapped in a sleek,
                elegant design. Choose us to elevate your expectations and enjoy
                unparalleled functionality with a touch of sophistication.
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
      </div>
    </div>
  );
};

export default HomePage;
