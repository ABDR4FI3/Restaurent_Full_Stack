interface OrderProps {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const Order: React.FC<OrderProps> = ({ name, price, quantity, total }) => {
  return (
    <>
      <div className="p-4 border flex justify-between rounded-xl shadow-lg">
        <p className="font-josefin">{name}</p>
        <p className="font-josefin">price : ${price}</p>
        <p className="font-josefin">Quantity: {quantity}</p>
        <p className="font-josefin">totale : ${total}</p>
      </div>
    </>
  );
};
export default Order;
