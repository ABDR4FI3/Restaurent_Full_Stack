import React from "react";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import NumberCard from "./NumbersCard/NumberCard";
import { BiFoodMenu } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

import MostOrdered from "./MostOrdered/MostOrdered";
import { PiUserCircleGear } from "react-icons/pi";
import burger from "../../../assets/Images/Burger/burger1.png";
import pizza from "../../../assets/Images/pizza/pizza.jpg";
import pasta from "../../../assets/Images/pasta/pasta.jpg";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaTachometerAlt } from "react-icons/fa";
import Order from "../../../Components/Admin/Order/Order";
import Footer from "../../../Components/Footer/footer";
import IncomeExpense from "../../../Components/Admin/Charts/IncomeExpense";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";

const Dashboard: React.FC = () => {
  const incomeData = [5000, 4000, 3000, 4500, 6000, 5500, 6500];
  const expenseData = [2000, 3000, 2500, 3500, 4000, 4500, 5000];
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {/* Dashboard content */}
      <div className="flex flex-col">
        {/* Cards go here */}
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
            icon={<PiUserCircleGear size={35} />}
            title="Customers"
            diff={11}
            value="0"
            chartData={[10, 5, 7, 5, 8, 10, 14]}
            color="#f97316"
            onClick={() => console.log("Customers clicked")}
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
          <MostOrdered weekly={burger} monthly={pizza} yearly={pasta} />
        </div>
        {/* Recent Orders + Export files goes here */}
        <div className="flex gap-5 justify-between sm:flex-col lg:flex-row">
          {/*Col 1 Recent Orders : */}
          <div className="basis-1/2 shadow-2xl flex flex-col w-full p-8 h-full">
            <div className="flex flex-col">
              <h1 className="text-3xl font-libre">Recent Activity</h1>
              <p className="font-josefin">description goes here</p>
            </div>
            {/* Recent Orders goes here */}
            <div className="flex flex-col gap-4 my-4">
              {" "}
              <Order name="Burger" price={5000} quantity={2} total={10000} />
              <Order name="Burger" price={5000} quantity={2} total={10000} />
              <Order name="Burger" price={5000} quantity={2} total={10000} />
              <Order name="Burger" price={5000} quantity={2} total={10000} />
            </div>
          </div>
          {/*Col 2 Export Files : */}
          <div className="basis-1/2 shadow-2xl flex flex-col w-full p-8 h-full">
            <div>
              {" "}
              <h1 className="text-3xl font-libre">Export Files</h1>
              <p className="font-josefin">description goes here</p>
            </div>
            <div className="flex justify-center items-center my-12 gap-10">
              <div className="basis-1/2 flex justify-center">
                {" "}
                <button className="border p-5 bg-green-500 text-white font-libre text-2xl rounded-3xl w-2/3 hover:text-green-500 hover:border-green-500 hover:bg-transparent duration-500">
                  xls
                </button>
              </div>
              <div className="basis-1/2 flex justify-center">
                {" "}
                <button className="border p-5 bg-gray-400 text-white font-libre text-2xl rounded-3xl w-2/3 hover:text-gray-400 hover:border-gray-400 hover:bg-transparent duration-500">
                  xls
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-bg mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
