import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "/users/me/login",
  logout: '/users/me/logout',
  registration: '/users',
};

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState,
});

export const { } = endpointsSlice.actions;
export default endpointsSlice.reducer;
