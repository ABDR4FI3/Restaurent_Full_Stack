import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { fetchOrderStatus } from "../store/slices/orderSlice";

const useOrderStatus = (status: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.orderStatus
  );

  useEffect(() => {
    dispatch(fetchOrderStatus(status));
  }, [status, dispatch]);

  return { data, loading, error };
};

export default useOrderStatus;
