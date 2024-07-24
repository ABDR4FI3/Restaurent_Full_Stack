import { Gauge } from "@mui/x-charts/Gauge";
interface StatsCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value }) => {
  return (
    <div className="flex justify-between shadow-lg border bg-gray-100 rounded-xl p-8 relative">
      <div className="flex items-center">
        <div className="bg-gray-100 z-10">{icon}</div>
        <div className="absolute left-0 bg-">
          <Gauge width={100} height={100} value={value} className="" />
        </div>
      </div>
      <div className="flex flex-col justify-end items-center">
        <h1 className="text-2xl font-libre">{title}</h1>
        <p className="font-josefin">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
