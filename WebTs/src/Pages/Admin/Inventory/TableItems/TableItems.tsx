import { Button } from "primereact/button";
import React from "react";

interface TableActionsProps {
  handleEdit: () => void;
  handleDelete: () => void;
  handleIncrement: () => void;
  handleDecrement: () => void;

}

const TableActions: React.FC<TableActionsProps> = ({
  handleDelete,
  handleEdit,
  handleDecrement,
  handleIncrement,

}) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2 hover:text-black hover:bg-blue-400"
          onClick={handleEdit}
        />
        <Button
          icon="pi pi-trash"
          disabled
          className="p-button-rounded p-button-danger p-mr-2 hover:text-red-600 hover:bg-slate-400"
          onClick={handleDelete}
        />
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-info p-mr-2 hover:text-white hover:bg-blue-400"
          onClick={handleIncrement}
        />

        <Button
          icon="pi pi-minus"
          className="p-button-rounded p-button-warning p-mr-2 hover:text-white hover:bg-blue-400"
          onClick={handleDecrement}
        />
      </div>
    </div>
  );
};

export default TableActions;
