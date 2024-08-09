import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

import Cart from "./Cart/Cart";
import CartModal from "./Modal/CartModal";
import "./Navbar.css";
import { RootState } from "../../store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const token = localStorage.getItem("token");
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {visible && cartItems && (
        <CartModal onClose={() => setVisible(false)}>
          <Cart onClose={() => setVisible(false)} />
        </CartModal>
      )}

      <nav className="bg-dark text-white shadow-md bg-dark-bg">
        <div className="container mx-auto px-4 py-3 flex items-center font-montserrat justify-between">
          <Link to="#" className="text-2xl font-bold">
            <img
              src="https://i.postimg.cc/0yPCLw0j/logo.png"
              width={150}
              alt="Logo"
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
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
              >
                Menu
              </Link>

              {token ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 nav-link hover:text-yellow-200 duration-1000 rounded"
                  >
                    Profile
                  </Link>
                  <div
                    className="relative hover:text-yellow-300 duration-1000"
                    onClick={() => setVisible(true)}
                  >
                    <FaCartShopping size={40} />
                    {cartSize > 0 ? (
                      <span className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {cartSize}
                      </span>
                    ) : (
                      <span className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        0
                      </span>
                    )}
                  </div>
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
