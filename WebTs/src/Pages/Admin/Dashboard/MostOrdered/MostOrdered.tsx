import { useState } from "react";

interface MostOrderedProps {
  weekly: string;
  monthly: string;
  yearly: string;
}

const MostOrdered: React.FC<MostOrderedProps> = ({
  weekly,
  monthly,
  yearly,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const getImageSrc = () => {
    switch (selectedPeriod) {
      case "Weekly":
        return weekly;
      case "Monthly":
        return monthly;
      case "Yearly":
        return yearly;
      default:
        return weekly;
    }
  };

  return (
    <div className="basis-1/2 shadow-2xl flex flex-col w-full p-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-libre">Most Ordered Items</h1>
          <p className="font-josefin">description goes here</p>
        </div>
        <div>
          <select
            id="timePeriod"
            value={selectedPeriod}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:bg-black duration-700 hover:text-white font-josefin"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      {/* Item goes here */}
      <div className="flex justify-between mt-4">
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1>Menu Title :</h1>
            <h1>Menu Title :</h1>
            <h1>Menu Title :</h1>
        </div>
        <img
          className="rounded-lg w-3/4"
          src={getImageSrc()}
          alt="Most ordered item"
        />
      </div>
    </div>
  );
};

export default MostOrdered;
