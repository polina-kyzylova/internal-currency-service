import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "/users/me/login",
  logout: '/users/me/logout',
  registration: '/users',
  user_data: '/users/me',
  transactions_hist: '/users/me/transactions',
  //make_transaction: '/users/me/transactions',
};

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState,
});

export const { } = endpointsSlice.actions;
export default endpointsSlice.reducer;
