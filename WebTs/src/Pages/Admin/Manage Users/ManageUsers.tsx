import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FormattedUser, formatUsers } from "../../../utils/userUtils";
import { getAllUsers } from "../../../services/userService";
import useUserHandlers from "../../../Hooks/useUserHandlers";
import Footer from "../../../Components/Footer/footer";

const ManageUsers: React.FC = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const {handleAddUser } = useUserHandlers();

  //* Function to fetch the user list
  const fetchData = async () => {
    try {
      const result = await getAllUsers();
      console.log("Data fetched from server:");
      const formattedUsers = formatUsers(result);
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [users, setUsers] = React.useState<FormattedUser[]>([]);

  // Fetch users data on mount
  React.useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      <div className="flex lg:flex-row sm:flex-col mt-5 lg:justify-between">
        <div className="basis-4/6 mb-14">
          <div
            className="flex flex-col p-8 overflow-x-scroll no-scrollbar"
            style={{ height: "750px" }}
          >
            <div className="flex justify-end py-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
            <DataTable
              value={users}
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
                field="email"
                header="Email"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="phone"
                header="Phone"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="role"
                header="Role"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
            </DataTable>
          </div>
        </div>
        <div className="flex justify-center items-center h-2/6 lg:w-2/6 sm:w-full">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full">
            <StatsCard
              icon={<FaUsers size={35} />}
              title="Total Users"
              value={users.length}
            />
            <StatsCard
              icon={<FaUser size={35} />}
              title="Roles"
              value={2}
            />
            <StatsCard
              icon={<MdOutlineEmail size={35} />}
              title="Total Emails"
              value={users.filter((user) => user.email).length}
            />
            <StatsCard
              icon={<MdOutlinePhone size={35} />}
              title="Total Phones"
              value={users.filter((user) => user.phone).length}
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

export default ManageUsers;
