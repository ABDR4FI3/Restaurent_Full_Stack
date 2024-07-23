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
import "primereact/resources/themes/saga-blue/theme.css"; // Or your preferred theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./RecentOrders.css"; // Import the custom CSS file

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

      <div className="flex flex-col w-full h-screen my-4 p-8 gap-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-libre">Recent Orders:</h1>
        </div>
        <div className="flex justify-center w-8/12">
          <DataTable
            value={orders}
            tableStyle={{ minWidth: "50rem" }}
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
      </div>

      <div className="bg-dark-bg">
        <Footer />
      </div>
    </div>
  );
};

export default RecentOrders;
