import React from "react";
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
import Footer from "../../../Components/Footer/footer";

import Loading from "../../../lottie/Loading";
import useFetchCategories from "../../../Hooks/useFetchCategories";
import useFoodHandlers from "../../../Hooks/useFoodHandlers";
import Gallery from "./Gallery/Gallery";

const Managemenu: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const { categories, loading, error } = useFetchCategories();
  const {
    visible,
    fooditem,
    action,
    handleEdit,
    handleDelete,
    handleAddFood,
    setVisible,
    submitFood,
    GalleryVisible,
    handleGallery , 
    setGalleryVisible,
  } = useFoodHandlers();
  
  const [foods, setFoods] = React.useState<FormattedFood[]>([]);
  //* function to fetch the food list
  const fetchData = async () => {
    try {
      const result = await getAllFoods();
      console.log("data fetched from server:");
      const formattedFoods = formatFoods(result);
      setFoods(formattedFoods);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // * Fetch foods data
  React.useEffect(() => {
    fetchData();
  }, []);
  

  // * Handle form submission
  const handleFormSubmit = async (food: FormattedFood) => {
    try {
      await submitFood(food);
      await fetchData(); // Ensure fetchData is awaited
    } catch (error) {
      console.error("Error submitting food data:", error);
    }
  };

  const actionBodyTemplate = (rowData: FormattedFood) => (
    <TableActions
      handleEdit={() => handleEdit(rowData)}
      handleDelete={() => handleDelete(rowData)}
      handleGallery={() => handleGallery(rowData)}
    />
  );

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {/* Form TO manage Food */}
      {visible && fooditem && (
        <Modal onClose={() => setVisible(false)}>
          <MenuForm
            food={fooditem}
            action={action}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
      {/*Form to manage Gallery*/}
      {GalleryVisible && fooditem && (
        <Modal onClose={() => setGalleryVisible(false)}>
          <Gallery fooditem={fooditem} />
        </Modal>
      )}
      {/* Loading Modal*/}
      {loading && (
        <Modal onClose={() => console.log("closed")}>
          <Loading />
        </Modal>
      )}
      {error && <p>Error: {error}</p>}
      <div className="flex lg:flex-row sm:flex-col mt-5 lg:justify-between">
        <div className="basis-4/6 mb-14">
          <div
            className="flex flex-col p-8 overflow-x-scroll no-scrollbar"
            style={{ height: "750px" }}
          >
            <div className="flex justify-end py-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddFood}
              >
                add menu
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
                    src={rowData.link}
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
                headerClassName="custom-header"
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
        <div className="flex justify-center items-center h-2/6 lg:w-2/6 sm:w-full">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full">
            <StatsCard
              icon={<GiMeal size={35} />}
              title="Total Menu"
              value={10}
            />
            <StatsCard
              icon={<FaBox size={35} />}
              title="Categories"
              value={categories.length}
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
      <div className="bg-dark-bg">
        <Footer />
      </div>
    </div>
  );
};

export default Managemenu;
