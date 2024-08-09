import { Button } from "primereact/button";
import React from "react";

interface TableActionsProps {
  handleEdit: () => void;
  handleDetails: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  handleEdit,
  handleDetails,
}) => {
  return (
    <div className="flex gap-4">
      <Button
        icon="pi pi-user-edit"
        className="p-button-rounded p-button-success p-mr-2 hover:text-black hover:bg-blue-400"
        onClick={handleEdit}
      />

      <Button
        icon="pi pi-info-circle"
        className="p-button-rounded p-button-warning p-mr-2 hover:text-white hover:bg-blue-400"
        onClick={handleDetails}
      />
    </div>
  );
};

export default TableActions;
