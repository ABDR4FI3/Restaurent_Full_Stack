import { useSelector } from "react-redux";
import Drawer from "../../../Components/Admin/Drawer/Drawer";
import DashboardNav from "../../../Components/Admin/Nav/DashboardNav";
import { RootState, useAppDispatch } from "../../../store";
import { toggleDrawer } from "../../../store/slices/drawerSlice";
import StatsCard from "../../../Components/Admin/StatsCard/StatsCard";
import { DataTable } from "primereact/datatable";
import { useEmployee } from "../../../Hooks/useEmployee";
import { Employee } from "../../../types/Employee";
import { Column } from "primereact/column";
import { FaBoxes, FaSortAmountUp, FaTag, FaUserFriends } from "react-icons/fa";
import "./Employee.css";
import TableActions from "./TableItems/TableItems";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import Modal from "./PopUp/Modal";

const Employees: React.FC = () => {
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<Employee>({} as Employee);
  const [action, setAction] = useState<"details" | "edit" | "add">("details");
  const { Employees, loading, error, stats } = useEmployee();

  const handleAdd = () => {
    setUser({} as Employee);
    setVisible(true);
    setAction("add");
  };
  const handledit = (rowData : Employee) => {
        setUser(rowData);
        setVisible(true);
        setAction("edit");
  };
  const handledetails = (rowData : Employee) => {
        setUser(rowData);
        setVisible(true);
        setAction("details");
  };

  const actionBodyTemplate = (rowData: Employee) => (
    <TableActions
      handleEdit={() => handledit(rowData)}
      handleDetails={() => handledetails(rowData)}
    />
  );
  return (
    <div className="flex flex-col h-screen">
      {loading && <p>loading</p>}
      {error && <p>{error}</p>}
      <DashboardNav />
      <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(toggleDrawer())} />
      {visible && user && (
        <Modal onClose={() => setVisible(false)}>
          <EmployeeForm user={user} action={action}/>
        </Modal>
      )}
      <section className="flex  mt-8 ">
        <section className=" mb-14">
          <div
            className="flex flex-col px-8 overflow-x-scroll no-scrollbar"
            style={{ height: "750px" }}
          >
            {/* Users List */}
            <div className="flex px-5 justify-between my-4">
              <h1 className="text-3xl font font-josefin underline">
                Employee :
              </h1>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleAdd();
                }}
              >
                add Employee
              </button>
            </div>
            <DataTable value={Employees} className="custom-table">
              <Column
                header="image"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
                body={(rowData: Employee) => (
                  <img src={rowData.image} alt={rowData.name} className="" />
                )}
              />
              <Column
                field="name"
                header="name"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                header="position"
                field="position"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="department"
                header="department"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="salary"
                header="salary"
                sortable
                headerClassName="custom-header"
                className="custom-cell"
              />
              <Column
                field="shift"
                header="Shift"
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
        </section>
        <section className="StatsCards flex flex-col ">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4 lg:h-1/4 sm:h-full w-full">
            <StatsCard
              icon={<FaBoxes size={35} />}
              title="Departmen Count"
              value={stats.Departmentcount}
            />
            <StatsCard
              icon={<FaTag size={35} />}
              title="Employees count"
              value={stats.Employeescount}
            />
            <StatsCard
              icon={<FaSortAmountUp size={35} />}
              title="Highest Salary"
              value={stats.Highestsalary}
            />
            <StatsCard
              icon={<FaUserFriends size={35} />}
              title="Position count"
              value={stats.Postioncount}
            />
          </div>
        </section>
      </section>
    </div>
  );
};
export default Employees;
