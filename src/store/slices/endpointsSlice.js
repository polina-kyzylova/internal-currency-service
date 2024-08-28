import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "/users/me/login",
  logout: '/users/me/logout',
  registration: '/users',
  user_data: '/users/me',
  transactions_hist: '/users/me/transactions',
  create_cfo: '/fsc',
  purposes_tags: '/users/me/transactions/payments-purposes',
  get_cfo_info: '/getFscInfo',
  replenish_cfo: '/fsc/top-up',
  cfo_purposes_tags: '/fsc/payments-purposes?reciever=user'
};

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState,
});

export const { } = endpointsSlice.actions;
export default endpointsSlice.reducer;
