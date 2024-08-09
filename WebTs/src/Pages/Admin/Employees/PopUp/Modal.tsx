import { FC, ReactNode } from "react";
import "./Modal.css";

// Define the interface for the component props
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

// Define the functional component with the FC type and the props interface
const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <dialog open className="modal">
        {children}
      </dialog>
    </>
  );
};

export default Modal;
