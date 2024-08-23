import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: "/api/profile",
  //getCode:"/auth/request-code?phoneNumber="
};

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState,
});

export const {} = endpointsSlice.actions;
export default endpointsSlice.reducer;
