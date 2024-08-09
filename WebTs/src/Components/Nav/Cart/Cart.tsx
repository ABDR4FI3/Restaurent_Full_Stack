import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./Cart.css";
import { useCart } from "../../../Hooks/useCart";
import toast from "react-hot-toast";
import { Toast } from "primereact/toast";
import { FaTrash } from "react-icons/fa";
const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const Totale = cartItems.length
    ? cartItems
        .map((item) => item.qte * item.food.price)
        .reduce((a, b) => a + b)
    : 0;
  const { PayCart, deleteOrder } = useCart();
  const HandleCartPayment = () => {
    try {
      PayCart();
      toast.success("Enjoy your Meal !");
    } catch (error) {
      console.log(error);
      toast.error("Failed to pay your meal");
    }
  };
  const HandleCancelOrder = (orderId: number) => {
    try {
      deleteOrder(orderId);
      toast.success("Order Cancelled");
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel that Order");
    }
  };
  return (
    <div className="p-4 flex flex-col gap-2 font-montserrat">
      <Toast />
      <h2 className="text-3xl font-medium ">Cart :</h2>
      <div className="flex flex-col gap-4  OrderContainer">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between my-2 border rounded-2xl border-black p-4 relative  "
          >
            <div className="absolute top-1 right-2 rounded-full hover:bg-slate-800 hover:text-white duration-500 p-1 cursor-pointer" onClick={() => HandleCancelOrder(item.id)}>
              <FaTrash
                size={20}
                onClick={() => console.log("deleted")}
                className=" text-red-600 hover:text-white duration-1000"
              />
            </div>
            <img src={item.food.link} width={80} alt="" />
            <div className="flex flex-col gap-4">
              {" "}
              <p>{item.food.name}</p>
              <p>price :${item.food.price}</p>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              <p>Quantity :${item.qte}</p>
              <p>Totale :${item.qte * item.food.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between my-5 text-lg font-montserrat items-center">
        <h2>Total : {Totale}</h2>
        <button
          onClick={HandleCartPayment}
          className="bg-black text-white px-4 py-2 rounded-2xl font-montserrat hover:bg-white hover:text-black hover:border duration-500 border-black"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
