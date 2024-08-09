import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import Footer from "../../../Components/Footer/footer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./RecentOrders.css";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { GiMeal } from "react-icons/gi";
import { MdOutlineAttachMoney, MdOutlinePointOfSale } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { fetchOrderStatus } from "../../../store/slices/orderSlice";
import { Orders } from "../../../types/Orders";

const RecentOrders: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const { data, loading, error } = useSelector(
    (state: RootState) => state.orderStatus
  );

  useEffect(() => {
    dispatch(fetchOrderStatus("paid"));
  }, [dispatch]);

  const orders = data || [];

  const rowClassName = (_data: any) => {
    return {
      "custom-row": true,
    };
  };

  // ! Total Col Functions
  const calculateTotal = (rowData :Orders) => rowData.food.price * rowData.qte;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />

      <div className="flex flex-col w-full my-4 p-8 gap-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-libre">Recent Orders:</h1>
        </div>
        <div className="flex justify-between lg:flex-row sm:flex-col gap-8">
          <div className="lg:basis-3/5">
            <DataTable value={orders} rowClassName={rowClassName}>
              <Column
                field="food.name" // Adjust field names as per your actual data structure
                header="Name"
                sortable
                style={{ width: "25%", borderTopLeftRadius: "15px" }}
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="food.price"
                header="Price"
                sortable
                style={{ width: "25%" }}
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="qte"
                header="Quantity"
                sortable
                style={{ width: "25%" }}
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                header="Total"
                style={{ width: "25%", borderTopRightRadius: "15px" }}
                headerClassName="custom-header"
                className="custom-cell"
                body={(rowData: Orders) => calculateTotal(rowData)}
              
              />
            </DataTable>
          </div>
          <div className="basis-2/5 grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
            <StatsCard
              icon={<GiMeal size={35} />}
              title="Total Orders"
              value={orders.length} // Example using real data
            />
            <StatsCard
              icon={<FaBox size={35} />}
              title="Quantity Sold"
              value={orders.reduce((sum, order) => sum + order.qte, 0)} // Example using real data
            />
            <StatsCard
              icon={<MdOutlineAttachMoney size={35} />}
              title="Total Profit"
              value={orders.reduce(
                (sum, order) => sum + order.food.price * order.qte,
                0
              )} // Example using real data
            />
            <StatsCard
              icon={<MdOutlinePointOfSale size={35} />}
              title="Total Sales"
              value={orders.length * 10} // Example; replace with actual calculation
            />
          </div>
        </div>
      </div>

      <div
        className="bg-dark-bg"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default RecentOrders;
