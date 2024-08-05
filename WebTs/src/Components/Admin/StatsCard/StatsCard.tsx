import { Gauge } from "@mui/x-charts/Gauge";
interface StatsCardProps {
  icon: JSX.Element;
  title: string;
  value: number;

}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value }) => {
  return (
    <div className="flex  shadow-lg border bg-gray-100 rounded-xl py-8 relative">
      <div className="flex items-center">
        <div className="z-10 absolute left-8">{icon}</div>
        <div className="">
          <Gauge width={100} height={100} value={value} text={""} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className=" font-josefin text-2xl">{title}</h1>
        <p className="font-libre text-lg">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
