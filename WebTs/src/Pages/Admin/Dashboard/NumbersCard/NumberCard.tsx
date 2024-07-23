interface NumberCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  color: string;
  onClick: () => void;
}

const NumberCard: React.FC<NumberCardProps> = ( { icon, title, value, color, onClick} ) => {
  return (
    <div className="p-8" onClick={onClick}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm">{title}</span>
        </div>
        <div className="flex items-center color">{icon}</div>
      </div>
    </div>
  );
};

export default NumberCard;
