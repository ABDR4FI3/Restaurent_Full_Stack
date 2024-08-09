import { useEffect, useState } from "react";

import { GetUserData } from "../services/userService";
import { UserFavoriteFood } from "../types/UserFavoriteFood";

export const useProfile = () => {
  const [userData, setUserData] = useState<UserFavoriteFood>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const user = await GetUserData();
      setUserData(user);
      console.log("user data", user);
    } catch (error) {
      console.error("Error fetching User Data:", error);
      setError("Failed to fetch User Data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    loading,
    error,
    userData,
    getUserData: fetchUserData,
  };
};
