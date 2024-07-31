import React from "react";
import { FaChartPie, FaTachometerAlt, FaTv, FaUser } from "react-icons/fa";
import { FaClipboardList, FaInbox } from "react-icons/fa6";
import logo from "../../../assets/icon/SamLogo.png";
import "./Drawer.css";
import { Link } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transition-transform duration-1000 transform bg-dark-bg text-white ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 lg:w-1/5`}
    >
      <div className="flex justify-end p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="font-bold h-7 w-7 hover:bg-slate-300 duration-500 hover:text-red-600 rounded_close_btn"
        >
          &times;
        </button>
      </div>
      {/* Logo */}
      <div className="flex justify-center my-4">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="p-4 space-y-10 text-2xl">
        {/* Dashboard */}
        <div className="flex gap-4">
          <Link to={"/admin/dashboard"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaTachometerAlt className="hover:text-dark-yellew duration-150" />
              <span>Dashboard</span>
            </li>
          </Link>
        </div>
        {/* Orders */}
        <div className="flex gap-4">
          <Link to={"/admin/orders"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaClipboardList className="hover:text-dark-yellew duration-150" />
              <span>Orders</span>
            </li>
          </Link>
        </div>
        {/* Manage Menu */}
        <div className="flex gap-4">
          <Link to={"/admin/menu"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <MdMenuBook className="hover:text-dark-yellew duration-150" />
              <span>Manage Menu </span>
            </li>
          </Link>
        </div>
        {/* Charts */}
        <div className="flex gap-4">
          <Link to={"/admin/charts"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaChartPie className="hover:text-dark-yellew duration-150" />
              <span>Charts</span>
            </li>
          </Link>
        </div>
        {/* Manage Users */}
        <div className="flex gap-4">
          <Link to={"/admin/users"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaUser className="hover:text-dark-yellew duration-150" />
              <span>Users</span>
            </li>
          </Link>
        </div>
        {/* Storage */}
        <div className="flex gap-4">
          <Link to={"/admin/Inventory"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaInbox className="hover:text-dark-yellew duration-150" />
              <span>Storage</span>
            </li>
          </Link>
        </div>
        {/* TVA */}
        <div className="flex gap-4">
          <Link to={"/admin/TVA"}>
            {" "}
            <li className="flex items-center space-x-4 hover:text-dark-yellew duration-150">
              <FaTv className="hover:text-dark-yellew duration-150" />
              <span>TVA</span>
            </li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Drawer;
