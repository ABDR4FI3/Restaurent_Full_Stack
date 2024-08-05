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

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
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
  } = useInventory();

  const actionBodyTemplate = (rowData: InventoryType) => (
    <TableActions
      handleEdit={() => handleEdit(rowData)}
      handleDelete={() => handleDelete(rowData)}
    />
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {visible && item && (
        <Modal onClose={() => setVisible(false)}>
          <InventoryForm action={action} item={item} onSubmit={submit} />
        </Modal>
      )}
      <div className="flex lg:flex-row sm:flex-col mt-8 lg:justify-between ">
        <div className="basis-4/6 mb-14">
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
              value={inventories}
              className="custom-table"
              rowClassName={() => "custom-row"}
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
                field="category"
                header="category"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
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
        </div>
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
      </div>
    </div>
  );
};
export default Inventory;
