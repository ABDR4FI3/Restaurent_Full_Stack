import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { RootState } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import useInventory from "../../../Hooks/useInventory";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Supplier } from "../../../types/Supplier";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { FaBoxes, FaSortAmountUp, FaTag, FaUserFriends } from "react-icons/fa";
import TableActions from "./TableItems/TableItems";
import { InventoryType } from "../../../types/Inventory";
import Modal from "../../../Components/PopUp/Modal";
import InventoryForm from "./InventoryForm/InventoryForm";
import { useEffect, useState } from "react";
import "./Inventory.css";
import { Toast } from "primereact/toast";
import toast from "react-hot-toast";

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const [category, setCategory] = useState<string>("all");
  const [filtredInventories, setFiltredInventories] = useState<InventoryType[]>(
    []
  );

  const {
    inventories,
    loading,
    error,
    stats,
    handleEdit,
    handleDelete,
    action,
    handleAdd,
    submit,
    visible,
    setVisible,
    item,
    categories,
    handleQuantity,
    message,
  } = useInventory();

  const actionBodyTemplate = (rowData: InventoryType) => (
    <TableActions
      handleEdit={() => handleEdit(rowData)}
      handleDelete={() => handleDelete(rowData)}
      handleDecrement={() => {
        handleQuantity(rowData.id, 10, "delete");
        toast.success(message);
      }}
      handleIncrement={() => {
        handleQuantity(rowData.id, 10, "add");
        toast.success(message);
      }}
    />
  );
  useEffect(() => {
    if (category?.toLocaleLowerCase() == "all") {
      setFiltredInventories(inventories);
    } else if (category.toLocaleLowerCase() == "warning") {
      const filtered = inventories.filter(
        (inv) => inv.quantity <= inv.minQuantity
      );
      setFiltredInventories(filtered);
    } else {
      const filtered = inventories.filter(
        (inv) => inv.category.name == category
      );
      setFiltredInventories(filtered);
    }
  }, [inventories, category, categories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col h-screen">
      <Toast />
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {visible && item && (
        <Modal onClose={() => setVisible(false)}>
          <InventoryForm action={action} item={item} onSubmit={submit} />
        </Modal>
      )}
      <section className="flex lg:flex-row sm:flex-col mt-8 lg:justify-between ">
        <section className="basis-4/6 mb-14">
          <div
            className="flex flex-col px-8 overflow-x-scroll no-scrollbar"
            style={{ height: "750px" }}
          >
            {/* Users List */}
            <div className="flex px-5 justify-between my-4">
              <h1 className="text-3xl font font-josefin underline">
                Inventory :
              </h1>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAdd}
              >
                add Item
              </button>
            </div>
            <DataTable
              value={filtredInventories}
              className="custom-table"
              rowClassName={(rowData: InventoryType) =>
                rowData.quantity <= rowData.minQuantity ? "Warning" : "Normal"
              }
            >
              <Column
                field="id"
                header="id"
                sortable
                headerClassName="custom-header topleft"
                className="custom-cell"
              />
              <Column
                field="itemName"
                header="itemName"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                header="category"
                headerClassName="custom-header"
                className="custom-cell"
                body={(rowData) => rowData.category.name}
              />
              <Column
                field="quantity"
                header="quantity"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="price"
                header="price"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="minQuantity"
                header="min Quantity"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                header="supplier"
                headerClassName="custom-header"
                className="custom-cell"
                body={(rowData) => (
                  <ul>
                    {rowData.suppliers.map((supplier: Supplier) => (
                      <li key={supplier.id}>{supplier.name}</li>
                    ))}
                  </ul>
                )}
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
        </section>
        <section className="StatsCards flex flex-col items-center">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full p-4">
            {categories.map((category) => (
              <button
                className={`bg-green-500 border hover:border-green-500 hover:text-green-500 hover:bg-transparent duration-500 text-white font-bold px-4 py-2 rounded ${
                  category.toLowerCase() == "all" ? "col-span-2" : ""
                }
                ${
                  category.toLowerCase() == "warning"
                    ? "bg-red-500 hover:text-red-500 hover:border-red-500"
                    : ""
                }`}
                onClick={() => setCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>{" "}
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full">
            <StatsCard
              icon={<FaBoxes size={35} />}
              title="Inventory Items"
              value={stats.totalItems}
            />
            <StatsCard
              icon={<FaTag size={35} />}
              title="Categories count"
              value={stats.categoriesCount}
            />
            <StatsCard
              icon={<FaSortAmountUp size={35} />}
              title="Total Quantity"
              value={stats.totalQuantity}
            />
            <StatsCard
              icon={<FaUserFriends size={35} />}
              title="Suppliers count"
              value={stats.suppliersCount}
            />
          </div>
        </section>
      </section>
    </div>
  );
};
export default Inventory;
