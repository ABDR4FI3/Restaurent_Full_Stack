import { Food } from "../../../types/Food";

interface OrderProps {
  qte: number;
  food: Food;
}

const Order: React.FC<OrderProps> = ({ qte, food }) => {
  return (
    <div className="flex justify-between items-center border border-green-500 p-8 rounded-2xl text-2xl font-montserrat">
      <img src={food.link} alt={food.name} className="w-24 rounded-full" />
      <h2>{food.name}</h2>
      <h2>quantity : {qte}</h2>
      <h2>price : {food.price} $</h2>
      <h2>total : {food.price * qte} $</h2>
    </div>
  );
};
export default Order;
