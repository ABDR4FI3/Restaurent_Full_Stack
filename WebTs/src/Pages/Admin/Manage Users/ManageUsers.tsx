import React, { useEffect, useState } from "react";
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
import Footer from "../../../Components/Footer/footer";

const ManageUsers: React.FC = () => {
  const genders = ["male", "female"];
  const roles = ["admin", "user"];
  const [role, setRole] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );

  //* Function to fetch the user list
  const fetchData = async () => {
    try {
      const result = await getAllUsers();
      console.log("Data fetched from server:");
      const formattedUsers = formatUsers(result);
      setUsers(formattedUsers);
      console.log("formattedUsers:", formattedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [users, setUsers] = React.useState<FormattedUser[]>([]);
  const [Filtredusers, setFiltredUsers] = React.useState<FormattedUser[]>([]);

  // Fetch users data on mount
  React.useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!role && !gender) {
      setFiltredUsers(users);
    }
    if (role && !gender) {
      const filteredUsers = users.filter((user) => user.role.toLowerCase() === role);
      setFiltredUsers(filteredUsers);
    }
    if (!role && gender) {
      const filteredUsers = users.filter((user) => user.gender === gender);
      setFiltredUsers(filteredUsers);
    }
    if (role && gender) {
      const filteredUsers = users.filter(
        (user) => user.role.toLocaleLowerCase() === role && user.gender === gender
      );
      setFiltredUsers(filteredUsers);
    }
  }, [role, gender, users]);

  return (
    <div className="flex flex-col h-screen">
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      <div className="flex lg:flex-row sm:flex-col mt-5 lg:justify-between">
        <section className="basis-4/6 mb-14">
          <div
            className="flex flex-col p-8 overflow-x-scroll no-scrollbar"
            style={{ height: "750px" }}
          >
            {/* Users List */}
            <div className="flex  py-5">
              <h1 className="text-3xl font font-josefin underline">
                Users List :
              </h1>
            </div>
            <DataTable
              value={Filtredusers}
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
              <Column
                field="gender"
                header="gender"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                header="Orders Count"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
                body={(rowData) =>
                  rowData.orders && rowData.orders.orders
                    ? rowData.orders.orders.length
                    : 0
                }
              />
            </DataTable>
          </div>
        </section>
        <section className="flex flex-col justify-center items-center h-2/6 lg:w-2/6 sm:w-full gap-10">
          <div className="flex gap-4">
            <button
              className="bg-red-500 border hover:border-red-500 hover:text-red-500 hover:bg-transparent duration-500 text-white font-bold px-4 py-2 rounded"
              onClick={() => {
                setRole(null);
                setGender(null);
              }}
            >
              Reset
            </button>{" "}
            {genders.map((gender) => (
              <button
                className="bg-green-500 border hover:border-green-500 hover:text-green-500 hover:bg-transparent duration-500 text-white font-bold px-4 py-2 rounded"
                onClick={() => {
                  setGender(gender);
                  setRole(null);
                }}
              >
                {gender}
              </button>
            ))}
            {roles.map((role) => (
              <button
                className="bg-blue-500 border hover:border-blue-500 hover:text-blue-500 hover:bg-transparent duration-500 text-white font-bold px-4 py-2 rounded"
                onClick={() => {
                  setRole(role);
                  setGender(null);
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full">
            <StatsCard
              icon={<FaUsers size={35} />}
              title="Total Users"
              value={users.length}
            />
            <StatsCard icon={<FaUser size={35} />} title="Roles" value={2} />
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
        </section>
      </div>
      <div className="bg-dark-bg">
        <Footer />
      </div>
    </div>
  );
};

export default ManageUsers;
