import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "/users/me/login",
  logout: '/users/me/logout',
  registration: '/users',
  user_data: '/users/me',
  transactions_hist: '/users/me/transactions',
  create_cfo: '/fsc',
  purposes_tags: '/users/payments-purposes',
  get_cfo_info: '/getFscInfo',
  replenish_cfo: '/fsc/top-up',
  cfo_purposes_tags: '/fsc/payments-purposes?reciever=user',
  master_data: '/budget',
  setup_cfo: '/fsc/me',
  master_analytics: '/budget/short-analytics',
};

const endpointsSlice = createSlice({
  name: "endpoints",
  initialState,
});

export const { } = endpointsSlice.actions;
export default endpointsSlice.reducer;
