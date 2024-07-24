import { LineChart } from "@mui/x-charts/LineChart";

interface NumberCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  color: string;
  diff: number;
  chartData: Array<number>;
  onClick: () => void;
}

const NumberCard: React.FC<NumberCardProps> = ({
  icon,
  diff,
  title,
  value,
  chartData,
  color,
  onClick,
}) => {
  const diffStyle = {
    color: diff < 0 ? "red" : "green",
  };
  return (
    <div
      className="px-8 py-5 shadow-xl my-5 bg-gray-200 rounded-3xl w-full "
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          {" "}
          <div className="flex items-center flex-col">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-sm">{title}</span>
          </div>
          <span className="font-bold" style={diffStyle}>
            {diff > 0 && "+"}
            {diff}
          </span>
        </div>
        <div className="flex items-center color">{icon}</div>
      </div>
      <div className="">
        <LineChart
          className="absolute right-12"
          xAxis={[{ data: [0, 1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: chartData,
            },
          ]}
          colors={[color]}
          width={384}
          height={200}
        />
      </div>
    </div>
  );
};

export default NumberCard;
