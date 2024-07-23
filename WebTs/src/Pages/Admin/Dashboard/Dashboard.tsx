import React, { useState } from "react";
import { FaBars, FaBell, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import Drawer from "../Drawer/Drawer";
import logo from "../../../assets/icon/SamLogo.png";
import NumberCard from "./NumbersCard/NumberCard";
import { BiFoodMenu } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
const Dashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center bg-dark-bg text-white p-4 h-20">
        <div className="flex gap-10 items-center">
          <FaBars
            className="text-2xl cursor-pointer mr-4"
            onClick={toggleDrawer}
          />
          <img src={logo} alt="" srcSet="" />
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <FaBell
              size={28}
              className="text-2xl cursor-pointer mr-4"
              onClick={() => console.log("Notifications clicked")}
            />{" "}
            <div className="absolute bottom-5 left-5 rounded_close_btn bg-red-600 text-white w-6 h-6 flex justify-center items-center">
              1
            </div>
          </div>

          <div className="flex items-center">
            <span className="mr-2">John Doe</span>
            <FaUserCircle size={28} className="text-2xl" />
          </div>
        </div>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      {/* Dashboard content */}
      <div>
        {/* Cards goes here */}
        <div className="grid grid-cols-4 gap-4">
          <NumberCard
            icon={<BiFoodMenu size={35} />}
            title="Menus"
            value="8"
            color="bg-sky-500"
            onClick={() => console.log("Menus clicked")}
          />
          <NumberCard
            icon={<FiShoppingCart size={35} />}
            title="Orders"
            value="0"
            color="bg-sky-500"
            onClick={() => console.log("Orders clicked")}
          />
          <NumberCard
            icon={<FaTachometerAlt size={35} />}
            title="Custumers"
            value="0"
            color="bg-sky-500"
            onClick={() => console.log("Custumers clicked")}
          />
          <NumberCard
            icon={<FaTachometerAlt size={35} />}
            title="Income"
            value="0"
            color="bg-sky-500"
            onClick={() => console.log("Income clicked")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
