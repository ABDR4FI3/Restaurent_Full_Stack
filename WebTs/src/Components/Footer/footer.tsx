import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css"
const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-bold mb-4 text-dark-yellew nav-link">
              About Us
            </h5>
            <p className="text-sm text-justify w-3/4">
              We are a restaurant committed to providing the best dining
              experience with high-quality food and excellent service.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0 flex flex-col gap-1">
            <h5 className="text-2xl font-bold mb-4 text-dark-yellew nav-link">
              Contact Us
            </h5>
            <p className="text-sm">
              Adress :123 Main Street Anytown, USA 12345
            </p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@restaurant.com</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-bold mb-4 text-dark-yellew nav-link">
              Quick Links
            </h5>
            <ul className="text-sm">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-2xl font-bold mb-4 text-dark-yellew nav-link">
              Follow Us
            </h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2024 Restaurant Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
