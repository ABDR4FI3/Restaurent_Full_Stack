import React, { useState } from "react";
import { Employee } from "../../../../types/Employee";
import { formatDate } from "../../../../utils/DateUtils";
import { useEmployee } from "../../../../Hooks/useEmployee";

interface EmployeeFormProps {
  user: Employee;
  action: "details" | "edit" | "add";
  onSubmit: (employee: Employee) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ user, action , onSubmit }) => {
  const initialFormState: Employee =
    action === "add"
      ? {
          id: 0,
          name: "",
          position: {
            id: 1,
            name: "Human Resources Manager",
            level: "Senior",
            responsibilities:
              "Manages HR department and employee relations develops HR policies handles employee grievances oversees performance management",
            qualifications: "Bachelor's in Human Resources or related field",
          },
          salary: 0,
          department: {
            id: 4,
            name: "Service",
            description:
              "Handles all aspects of customer service operations including addressing customer inquiries resolving complaints and managing service quality; ensures customer satisfaction and implements service improvement strategies",
          },
          address: "",
          phone: "",
          email: "",
          gender: "",
          image: "",
          shift: "",
          hiringDate: new Date(),
        }
      : { ...user };

  const [formState, setFormState] = useState<Employee>(initialFormState);
  const { departments, positions, shifts , error } = useEmployee();

  // Handler to update formState on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "department" || name === "position" ) {
      const selectedId = Number(value);
      const selectedObject =
        name === "department"
          ? departments.find((dept) => dept?.id === selectedId)
          : name === "position"
          ? positions.find((pos) => pos?.id === selectedId)
          : null;

      if (selectedObject) {
        setFormState((prevState) => ({
          ...prevState,
          [name]: selectedObject,
        }));
      }
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const isDisabled = action === "details";

  // Handle form actions
  const handleAction = () => {
    console.log("Action handled: " + action);
    console.log("Form state:", formState);
    // submitEmployee(formState, action);
    onSubmit(formState);
  };

  return (
    <div className="flex flex-col p-10 gap-4 font-montserrat">
      {error && <p className="text-red-500 text-2xl font-montserrat">{error}</p>}
      <h2 className="text-3xl">Employee Card :</h2>
      {/* Card + details */}
      <section className="flex gap-10">
        {/* Card */}
        <div
          className="flex flex-col border border-black rounded-2xl h-3/4 p-4 gap-4 justify-center items-center basis-1/3"
          style={{
            background: "rgba(173, 216, 230, 0.3)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <img
            src={formState.image}
            alt={formState.name}
            className="rounded-2xl shadow-xl"
          />
          <h2>{formState.name}</h2>
          <p>{formState.position.name}</p>
        </div>
        <div className="flex flex-col basis-2/3">
          <div className="grid grid-cols-2 gap-4">
            {/* Input Fields Name */}
            <div
              className={`w-full flex-col flex ${
                action !== "add" ? "hidden" : ""
              }`}
            >
              <label htmlFor="name">name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Address */}
            <div className="w-full flex-col flex">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formState.address}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Email */}
            <div className="w-full flex-col flex">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Select Field Department */}
            <div className="w-full flex-col flex">
              <label htmlFor="department">Department</label>
              <select
                name="department"
                id="department"
                value={formState.department.id}
                onChange={handleChange}
                disabled={isDisabled}
                required
                className="border-2 border-black rounded-lg py-1 px-2"
              >
                <option value="" disabled>
                  Select a department
                </option>
                {departments.map((dept) => (
                  <option key={dept?.id} value={dept?.id}>
                    {dept?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Select Field Position */}
            <div className="w-full flex-col flex">
              <label htmlFor="position">Position</label>
              <select
                name="position"
                id="position"
                required
                value={formState.position.id}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              >
                <option value="" disabled>
                  Select a position
                </option>
                {positions.map((pos) => (
                  <option key={pos?.id} value={pos?.id}>
                    {pos?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Input Fields Phone */}
            <div className="w-full flex-col flex">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={formState.phone}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Salary */}
            <div className="w-full flex-col flex">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                name="salary"
                id="salary"
                required
                value={formState.salary}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Select Field Shift */}
            <div className="w-full flex-col flex">
              <label htmlFor="shift">Shift</label>
              <select
                name="shift"
                id="shift"
                required
                value={formState.shift}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              >
                <option value="" disabled>
                  Select a shift
                </option>
                {shifts.map((shift) => (
                  <option key={shift} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </div>
            {/* Input Fields Image */}
            <div className="w-full flex-col flex">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                id="image"
                required
                value={formState.image}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Hiring Date */}
            <div className="w-full flex-col flex">
              <label htmlFor="hiringDate">Hiring Date</label>
              <input
                type="date"
                name="hiringDate"
                id="hiringDate"
                required
                value={formatDate(formState.hiringDate + "")}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
          </div>
          <div
            className={`flex my-4 justify-end ${
              action === "details" && "hidden"
            }`}
          >
            <button
              className="bg-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 border duration-700 text-white font-bold py-3 px-5 rounded-lg w-1/4"
              onClick={handleAction}
            >
              {action}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeForm;
