import { Button } from "primereact/button";
import React from "react";

interface TableActionsProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  handleDelete,
  handleEdit,
   
}) => {
  return (
    <div className="flex">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-mr-2 hover:text-black hover:bg-blue-400"
        onClick={handleEdit} // Call the function directly
      />
      <Button
        icon="pi pi-trash"
        disabled
        className="p-button-rounded p-button-danger p-mr-2 hover:text-red-600 hover:bg-slate-400"
        onClick={handleDelete} // Call the function directly
      />
    </div>
  );
};

export default TableActions;
