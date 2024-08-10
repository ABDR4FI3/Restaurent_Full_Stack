import React, { useState } from "react";
import { Employee } from "../../../../types/Employee";
import { formatDate } from "../../../../utils/DateUtils";

interface EmployeeFormProps {
  user: Employee;
  action: "details" | "edit" | "add";
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ user, action }) => {
  const [formState, setFormState] = useState<Employee>({ ...user });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const isDisabled = action === "details";
  const handleAction = () => {
    console.log("Action handled" + action);
    console.log("Form state:", formState);
  }

  return (
    <div className="flex flex-col p-10 gap-4 font-montserrat">
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
          <p>{formState.position}</p>
        </div>
        <div className="flex flex-col basis-2/3">
          <div className="grid grid-cols-2 gap-4 ">
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
            {/* Input Fields Department */}
            <div className="w-full flex-col flex">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                name="department"
                id="department"
                value={formState.department}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Phone */}
            <div className="w-full flex-col flex">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
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
                value={formState.salary}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Shift */}
            <div className="w-full flex-col flex">
              <label htmlFor="shift">Shift</label>
              <input
                type="text"
                name="shift"
                id="shift"
                value={formState.shift}
                onChange={handleChange}
                disabled={isDisabled}
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
            {/* Input Fields Image */}
            <div className="w-full flex-col flex">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                id="image"
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
                value={formatDate(formState.hiringDate + "")}
                disabled
                className="border-2 border-black rounded-lg py-1 px-2"
              />
            </div>
          </div>
          <div
            className={`flex my-4 justify-end ${
              action === "details" ? "hidden" : ""
            }`}
          >
            <button className="bg-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 border duration-700 text-white font-bold py-3 px-5 rounded-lg"
            onClick={handleAction}>
              {action}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeForm;
