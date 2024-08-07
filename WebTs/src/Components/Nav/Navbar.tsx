import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { FaCartShopping } from "react-icons/fa6";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-dark text-white shadow-md bg-dark-bg">
      <div className="container mx-auto px-4 py-3 flex items-center font-montserrat justify-between">
        <Link to="#" className="text-2xl font-bold">
          <img
            src="https://i.postimg.cc/0yPCLw0j/logo.png"
            width={150}
            alt=""
          />
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 fixed lg:static top-0 left-0 w-full h-full lg:w-auto lg:h-auto bg-dark-bg lg:bg-transparent transition-transform ease-in-out ${
            isOpen ? "transform translate-x-0" : "transform -translate-x-full"
          } ${isOpen ? "z-50" : ""}`}
        >
          <div className="flex lg:flex-row sm:flex-col items-center justify-center h-full">
            <Link
              to="/home"
              className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              onClick={toggleMenu}
            >
              Menu
            </Link>

            {token != null ? (
              <>
                <Link
                  to="/home"
                  className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  onClick={toggleMenu}
                >
                  <FaCartShopping size={28} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </>
            )}
            {/* Dark Light Toggle */}
            <div></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
