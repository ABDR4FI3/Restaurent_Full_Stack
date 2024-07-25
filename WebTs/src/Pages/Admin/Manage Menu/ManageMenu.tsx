import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import MenuForm from "./MenuForm/MenuForm";
import Modal from "../../../Components/PopUp/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllFoods } from "../../../services/foodService";
import { formatFoods, FormattedFood } from "../../../utils/foodUtils";
import "./ManageMenu.css";
import truncateText from "../../../utils/truncateText";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { GiMeal } from "react-icons/gi";
import { FaBox } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdOutlinePointOfSale } from "react-icons/md";
import TableActions from "./TableActions/tableActions";

const Managemenu: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );

  // * state management
  const [visible, setVisible] = useState(false);
  const [foods, setFoods] = useState<FormattedFood[]>([]);

  //* use effect to fetch foods
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFoods();
        const formattedFoods = formatFoods(result);
        setFoods(formattedFoods);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  //* handle actions
  const handleEdit = (id: number) => {
    console.log("Edit food with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete food with id:", id);
  };

  //* action body template
  const actionBodyTemplate = (rowData: FormattedFood) => {
    return (
      <TableActions
        handleEdit={() => handleEdit(rowData.id)}
        handleDelete={() => handleDelete(rowData.id)}
      />
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {/* Conditional rendering of the menu form */}
      {visible && (
        <Modal onClose={() => setVisible(false)}>
          <MenuForm />
        </Modal>
      )}
      {/* Manage menu content */}
      <div className="flex lg:flex-row sm:flex-col mt-5 ">
        <div className="basis-4/6 ">
          {" "}
          <div className="flex lg:flex-col p-8 h-1/2 overflow-x-scroll no-scrollbar">
            <div className="flex justify-end py-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                add menu{" "}
              </button>
            </div>
            <DataTable
              value={foods}
              className="custom-table"
              rowClassName={() => "custom-row"}
            >
              <Column
                field="name"
                header="Name"
                sortable
                headerClassName="custom-header topleft"
                className="custom-cell"
              />
              <Column
                field="image"
                header="Image"
                body={(rowData: FormattedFood) => (
                  <img
                    src={rowData.image}
                    alt={rowData.name}
                    className="w-24 h-24 object-cover"
                  />
                )}
                style={{ width: "20%" }}
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="description"
                header="Description"
                sortable
                style={{ textOverflow: "ellipsis" }}
                headerClassName="custom-header"
                bodyClassName="description-cell"
                className="custom-cell"
                body={(rowData: FormattedFood) => (
                  <p className="text-justify">
                    {truncateText(rowData.description, 15)}
                  </p>
                )}
              />
              <Column
                field="price"
                header="Price"
                sortable
                style={{ width: "15%" }}
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="category"
                header="Category"
                sortable
                headerClassName="custom-header "
                className="custom-cell"
              />
              <Column
                body={actionBodyTemplate}
                header="Actions"
                style={{ width: "15%" }}
                headerClassName="custom-header topright"
                className="custom-cell"
              />
            </DataTable>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 h-1/4 ">
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
            title="Total Profit"
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
  );
};

export default Managemenu;
