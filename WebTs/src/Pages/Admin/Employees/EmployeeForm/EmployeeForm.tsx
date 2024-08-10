import React, { useState } from "react";
import { Employee } from "../../../../types/Employee";
import { formatDate } from "../../../../utils/DateUtils";

interface EmployeeFormProps {
  user: Employee;
  action: "details" | "edit" | "add";
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ user }) => {
  // Initialize formState with the user prop
  const [formState, setFormState] = useState<Employee>({ ...user });

  // Handler to update formState on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-3xl">Employee Details :</h2>
      {/* Card + details */}
      <section className="flex gap-10">
        {/* Card */}
        <div
          className="flex flex-col border border-black rounded-2xl p-4 gap-4 justify-center items-center"
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
        <div className="grid grid-cols-2 gap-4 basis-2/3">
          {/* Input Fields Address */}
          <div className="w-full flex-col flex">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formState.address}
              onChange={handleChange}
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
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
              className="border-2 border-black rounded-xl py-1 px-2"
            />
          </div>
          {/* Input Fields Hiring Date */}
          <div className="w-full flex-col flex">
            <label htmlFor="hiringDate">Hiring Date</label>
            <input
              type="date"
              name="hiringDate"
              id="hiringDate"
              value={formatDate(formState.hiringDate+"")}
              disabled
              className="border-2 border-black rounded-xl py-1 px-2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeForm;
