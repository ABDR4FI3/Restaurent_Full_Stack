import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
