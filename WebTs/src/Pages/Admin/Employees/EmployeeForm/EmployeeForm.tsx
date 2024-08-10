import { Employee } from "../../../../types/Employee";
import { formatDate, parseDateString } from "../../../../utils/DateUtils";

interface EmployeeFormProps {
  user: Employee;
  action: "details" | "edit" | "add";
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ user }) => {
  console.log(user);
  console.log("Date :", user.hiringDate);
  console.log("Formatted Date :", parseDateString(user.hiringDate+""));
  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-3xl">Employee Details :</h2>
      {/* Card + details */}
      <section className="flex gap-10 ">
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
            src={user.image}
            alt={user.name}
            className="rounded-2xl shadow-xl"
          />
          <h2>{user.name}</h2>
          <p>{user.position}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 basis-2/3">
          {/* Input Fields Adress */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Adress</label>
            <input
              type="text"
              name=""
              id=""
              value={user.address}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">email</label>
            <input
              type="text"
              name=""
              id=""
              value={user.email}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Departement</label>
            <input
              type="text"
              name=""
              id=""
              value={user.department}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Phone</label>
            <input
              type="text"
              name=""
              id=""
              value={user.phone}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Salary</label>
            <input
              type="text"
              name=""
              id=""
              value={user.salary}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Shift</label>
            <input
              type="text"
              name=""
              id=""
              value={user.shift}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          {/* Input Fields  */}
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Image</label>
            <input
              type="text"
              name=""
              id=""
              value={user.image}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
          <div className="w-full flex-col flex">
            {" "}
            <label htmlFor="">Hiring Date</label>
            <input
              type="Date"
              name=""
              id=""
              disabled
              value={formatDate(user.hiringDate+"")}
              className="border-2 border-black rounded-xl py-1 px-2 "
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeForm;
