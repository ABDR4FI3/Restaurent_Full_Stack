import { ReactNode } from "react";
import "./CartModal.css";
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

// Define the functional component with the FC type and the props interface
const CartModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <dialog open className="modal">
        {children}
      </dialog>
    </>
  );
};

export default CartModal;
