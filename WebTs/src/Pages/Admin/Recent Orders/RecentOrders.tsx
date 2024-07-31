import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import Footer from "../../../Components/Footer/footer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OrderService } from "../../../services/OrderService";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./RecentOrders.css";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { GiMeal } from "react-icons/gi";
import { MdOutlineAttachMoney, MdOutlinePointOfSale } from "react-icons/md";
import { FaBox } from "react-icons/fa";

const RecentOrders: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    OrderService.getOrders().then((data) => setOrders(data));
  }, []);

  const rowClassName = (_data: any) => {
    return {
      "custom-row": true,
    };
  };

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />

      <div className="flex flex-col w-full  my-4 p-8 gap-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-libre">Recent Orders:</h1>
        </div>
        <div className="flex justify-between lg:flex-row sm:flex-col gap-8 ">
          <div className="lg:basis-3/5">
            {" "}
            <DataTable
              value={orders}
              tableStyle={
                {
                  /*minWidth: "50rem"*/
                }
              }
              rowClassName={rowClassName}
            >
              <Column
                field="name"
                header="Name"
                sortable
                style={{
                  width: "25%",
                  borderTopLeftRadius: "15px",
                }}
                headerClassName="custom-header"
                className="custom-cell"
              ></Column>
              <Column
                field="price"
                header="Price"
                sortable
                style={{ width: "25%" }}
                headerClassName="custom-header"
                className="custom-cell"
              ></Column>
              <Column
                field="quantity"
                header="Quantity"
                sortable
                style={{ width: "25%" }}
                headerClassName="custom-header"
                className="custom-cell"
              ></Column>
              <Column
                field="total"
                header="Total"
                sortable
                style={{ width: "25%", borderTopRightRadius: "15px" }}
                headerClassName="custom-header"
                className="custom-cell"
              ></Column>
            </DataTable>
          </div>
          <div className="basis-2/5 grid lg:grid-cols-2 sm:grid-cols-1 gap-4  ">
            <StatsCard
              icon={<GiMeal size={35} />}
              title="Total Orders"
              value={10}
            />
            <StatsCard
              icon={<FaBox size={35} />}
              title="Quantity Sold"
              value={15}
            />
            <StatsCard
              icon={<MdOutlineAttachMoney size={35} />}
              title="Totale Profit"
              value={60}
            />
            <StatsCard
              icon={<MdOutlinePointOfSale size={35} />}
              title="Total Sales"
              value={46}
            />
          </div>
        </div>
      </div>

      <div className="bg-dark-bg" style={{display: 'flex', justifyContent: 'end'}}>
        <Footer />
      </div>
    </div>
  );
};

export default RecentOrders;
