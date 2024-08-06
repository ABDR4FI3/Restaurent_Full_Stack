import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import image from "../../assets/icon/SamLogo.png";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");
  return (
    <nav className="bg-dark text-white shadow-md bg-dark-bg">
      <div className="container mx-auto px-4 py-3 flex items-center font-montserrat justify-between">
        <Link to="#" className="text-2xl font-bold">
          <img src={image} alt="" />
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-dark-bg lg:bg-transparent transition-transform ease-in-out ${
            isOpen ? "transform translate-x-0" : "transform -translate-x-full"
          }`}
        >
          <Link
            to="/home"
            className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
          >
            Menu
          </Link>

          {token != null ? (
            <>
              {" "}
              <Link
                to="/home"
                className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              >
                Login
              </Link>
            </>
          )}
          {/* Dark Light Toggle */}
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
