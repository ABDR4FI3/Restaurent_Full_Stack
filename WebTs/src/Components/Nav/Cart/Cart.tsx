import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  console.log("these are cart items", cartItems);
  return (
    <div className="p-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between my-2 border-b-2 border-black"
        >
          <p>{item.food.name}</p>
          <p>price :${item.food.price}</p>
          <p>Quantity :${item.qte}</p>
          <p>Totale :${item.qte * item.food.price}</p>
        </div>
      ))}
    </div>
  );
};
export default Cart;
