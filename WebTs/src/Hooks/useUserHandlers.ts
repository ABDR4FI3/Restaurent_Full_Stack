import { useState } from "react";
import { FormattedUser } from "../utils/userUtils";

const useUserHandlers = () => {
  const [user, setUser] = useState<FormattedUser | null>(null);
  const [action, setAction] = useState<string>("Add");

  const handleAddUser = () => {
    setUser(null);
    setAction("Add");
  };

  const handleEdit = (user: FormattedUser) => {
    setUser(user);
    setAction("Edit");
  };

  return {
    user,
    action,
    handleEdit,
    handleAddUser,
  };
};

export default useUserHandlers;
