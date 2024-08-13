import React, { useEffect, useState } from "react";
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
import {
  MdNavigateNext,
  MdOutlineAttachMoney,
  MdOutlinePointOfSale,
} from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { fetchOrderStatus } from "../../../store/slices/orderSlice";
import { Orders } from "../../../types/Orders";
import toast, { Toaster } from "react-hot-toast";

const RecentOrders: React.FC = () => {
  //* states for managining pagination :
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const [pagintedOrders, setPagintedOrders] = useState<Orders[]>([]);

  const RowsOptions = [5, 10, 15];
  const dispatch: AppDispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const { data, loading, error } = useSelector(
    (state: RootState) => state.orderStatus
  );
  const orders = data || [];
  useEffect(() => {
    dispatch(fetchOrderStatus("paid"));
  }, [dispatch]);
  useEffect(() => {
    setPagintedOrders(orders.slice((page - 1) * rows, page * rows));
  }, [page, rows]);

  useEffect(() => {
    setPage(1);
  }, [rows]);
  useEffect(() => {
    setPagintedOrders(orders.slice(0, 5));
  }, [orders]);

  const rowClassName = (_data: any) => {
    return {
      "custom-row": true,
    };
  };

  // ! Total Col Functions
  const calculateTotal = (rowData: Orders) => rowData.food.price * rowData.qte;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Toaster position="bottom-left" reverseOrder={false} />
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />

      <div className="flex flex-col w-full my-4 p-8 gap-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-libre">Recent Orders:</h1>
        </div>
        <div className="flex justify-between lg:flex-row sm:flex-col gap-8">
          <div className="lg:basis-3/5">
            <DataTable value={pagintedOrders} rowClassName={rowClassName}>
              <Column
                field="food.name"
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
            <div className="flex justify-center mt-4">
              <div>
                {" "}
                <select
                  name="rows"
                  id=""
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="mx-2 border border-black p-2"
                >
                  {RowsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end items-center gap-8">
                {" "}
                <span
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    } else {
                      toast.error("you can't go back any further.");
                    }
                  }}
                >
                  <GrFormPrevious size={35} />
                </span>
                <div className="text-3xl flex ">{page}</div>
                <span
                  onClick={() => {
                    if (page + 1 <= Math.ceil(orders.length / rows)) {
                      setPage(page + 1);
                    } else {
                      toast.error("you have reached the last page.");
                    }
                  }}
                >
                  <MdNavigateNext size={35} />
                </span>
              </div>
            </div>
          </div>
          <div className="basis-2/5 grid h-1/2 lg:grid-cols-2 sm:grid-cols-1 gap-4">
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
