import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useState } from "react";

interface IncomeExpenseProps {
  incomeData: Array<number>;
  expenseData: Array<number>;
  color1: string; // Color for income data
  color2: string; // Color for expense data
}

const IncomeExpense: React.FC<IncomeExpenseProps> = ({
  color1,
  color2,
  incomeData,
  expenseData,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const xLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <div className="shadow-2xl flex flex-col w-full p-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-libre">Revenue</h1>
          <p className="font-josefin">description goes here</p>
        </div>
        <div>
          <select
            id="timePeriod"
            value={selectedPeriod}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <LineChart
        width={680}
        height={400}
        series={[
          {
            data: incomeData,
            label: "Income",
            color: color1,
            showMark: true,
            area: true,
          },
          {
            data: expenseData,
            label: "Expense",
            color: color2,
            showMark: true,
            area: true,
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default IncomeExpense;
