import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Orders } from "../../types/Orders";
import getOrderStatusData from "../../services/OrderService";
import { RootState } from "..";

export interface OrderStatusState {
  data: Orders[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderStatusState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchOrderStatus = createAsyncThunk<
  Orders[],
  string,
  { rejectValue: string }
>("orderStatus/fetchOrderStatus", async (status, { rejectWithValue }) => {
  try {
    const response = await getOrderStatusData(status);
    return response; // Directly returning the Orders array
  } catch (error: any) {
    return rejectWithValue(error.response?.data ?? "An error occurred");
  }
});

const orderStatusSlice = createSlice({
  name: "orderStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderStatus.fulfilled,
        (state, action: PayloadAction<Orders[]>) => {
          // Updated type to Orders[]
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchOrderStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "An error occurred";
        }
      );
  },
});
export const selectOrders = (state: RootState) => state.orderStatus.data;

export default orderStatusSlice.reducer;
