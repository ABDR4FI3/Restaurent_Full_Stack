interface OrderButtonProps {
  onClick: () => void;
}
const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
  return (
    <button
      className="border bg-dark-yellew hover:bg-transparent duration-500 hover:text-dark-yellew hover:border-dark-yellew text-white font-bold p-4 rounded hover:scale-125"
      onClick={onClick}
    >
      Order Now
    </button>
  );
};

export default OrderButton;
