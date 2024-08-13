import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { RootState } from "../../../store";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
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
import toast, { Toaster } from "react-hot-toast";
import "./Inventory.css";

const Inventory: React.FC = () => {
  const [pagintaedInventories, setPagintedInventories] = useState<
    InventoryType[]
  >([]);
  //* states for managining pagination :
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);

  const RowsOptions = [5, 10, 15];
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

  useEffect(() => {
    setPagintedInventories(
      filtredInventories.slice((page - 1) * rows, page * rows)
    );
  }, [page, rows]);
  useEffect(() => {
    setPagintedInventories(filtredInventories.slice(0, 5));
  }, filtredInventories);
  useEffect(() => {
    setPage(1);
  }, [rows, filtredInventories]);
  useEffect(() => {
    setPage(1);
    setRows(5);

  },[filtredInventories, category]);

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
  console.log("page and rows state: "+ page , rows);
  console.log("filtredInventories:", filtredInventories);
  console.log("paginated inventories:", pagintaedInventories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col h-screen">
      <Toaster position="bottom-left" reverseOrder={false} />
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {visible && item && (
        <Modal onClose={() => setVisible(false)}>
          <InventoryForm action={action} item={item} onSubmit={submit} />
        </Modal>
      )}
      <section className="flex lg:flex-row sm:flex-col mt-8  ">
        <section className="basis-4/6 mb-14 p-8">
          {/* Users List */}
          {/* Title */}
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
            value={pagintaedInventories}
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
          {/* Options and Pagination*/}
          <div className="flex items-center justify-center gap-4 p-2">
            <div className="flex items-center">
              {" "}
              <select
                name="rows"
                id=""
                value={rows}
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
                  if (page + 1 <= Math.ceil(filtredInventories.length / rows)) {
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
        </section>
        <section className="StatsCards flex flex-col items-center ">
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
