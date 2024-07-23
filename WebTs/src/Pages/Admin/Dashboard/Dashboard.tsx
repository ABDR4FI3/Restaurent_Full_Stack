import React, { useState } from "react";
import { FaBars, FaBell, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import Drawer from "../Drawer/Drawer";
import logo from "../../../assets/icon/SamLogo.png";
import NumberCard from "./NumbersCard/NumberCard";
import { BiFoodMenu } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import IncomeExpense from "../Charts/IncomeExpense";
const Dashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const incomeData = [5000, 4000, 3000, 4500, 6000, 5500, 6500];
  const expenseData = [2000, 3000, 2500, 3500, 4000, 4500, 5000];

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
      <div className="flex flex-col">
        {/* Cards goes here */}
        <div className="grid lg:grid-cols-4 gap-4 sm:grid-cols-2">
          <NumberCard
            icon={<BiFoodMenu size={35} />}
            title="Menus"
            diff={+10}
            value="8"
            chartData={[2, 8, 3, 7, 5, 8, 10]}
            color="#f11D08"
            onClick={() => console.log("Menus clicked")}
          />
          <NumberCard
            icon={<FiShoppingCart size={35} />}
            title="Orders"
            diff={-5}
            value="0"
            chartData={[8, 2, 3, 10, 8, 10.12, 5]}
            color="#1f2937"
            onClick={() => console.log("Orders clicked")}
          />
          <NumberCard
            icon={<FaTachometerAlt size={35} />}
            title="Custumers"
            diff={11}
            value="0"
            chartData={[10, 5, 7, 5, 8, 10, 14]}
            color="#f97316"
            onClick={() => console.log("Custumers clicked")}
          />
          <NumberCard
            icon={<FaTachometerAlt size={35} />}
            title="Income"
            diff={-8}
            value="0"
            chartData={[1, 8, 5, 5, 4, 9, 5]}
            color="#ab8cf8"
            onClick={() => console.log("Income clicked")}
          />
        </div>
        {/* Revenue + Chart goes here */}
        <div className="flex gap-5 justify-between sm:flex-col lg:flex-row">
          <IncomeExpense
            color1="#ab8cf8"
            color2="#bf8e43"
            incomeData={incomeData}
            expenseData={expenseData}
          />
          <IncomeExpense
            color1="#f11D08"
            color2="#3A3FE9"
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
