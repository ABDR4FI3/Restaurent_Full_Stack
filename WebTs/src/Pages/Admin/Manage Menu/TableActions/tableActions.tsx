import { Button } from "primereact/button";
import React from "react";

interface TableActionsProps {
  handleEdit: () => void;
  handleDelete: () => void;
  handleGallery: () => void; // Add handleGallery to props
}

const TableActions: React.FC<TableActionsProps> = ({
  handleDelete,
  handleEdit,
  handleGallery, // Destructure handleGallery
}) => {
  return (
    <React.Fragment>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-mr-2 hover:text-yellow-300 hover:bg-gray-400"
        onClick={handleEdit} // Call the function directly
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-mr-2 hover:text-red-600 hover:bg-slate-400"
        onClick={handleDelete} // Call the function directly
      />
      <Button
        icon="pi pi-images"
        className="p-button-rounded p-button-info hover:text-blue-600 hover:bg-blue-300"
        onClick={handleGallery} // Call the function directly
      />
    </React.Fragment>
  );
};

export default TableActions;
