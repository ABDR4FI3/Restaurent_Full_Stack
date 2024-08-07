import { Orders } from "../../../types/Orders";

interface CartProps {
    cartItems: Orders[];
}
const Cart: React.FC<CartProps> = ({ cartItems }) => {
    return (
        <div className="p-4">
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between my-2 border-b-2 border-black">
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