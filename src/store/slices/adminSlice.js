import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    master_acc_number: '555555555555',
    master_acc_balance: '79000',
}


export const counterSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        initAdmin: (state, action) => {
            state.master_acc_number = action.payload.master_acc_number;
            state.master_acc_balance = action.payload.master_acc_balance;
        },
        removeAdmin: (state) => {
            state.master_acc_number = null;
            state.master_acc_balance = null;
        },
    },
})


export const { initAdmin, removeAdmin } = counterSlice.actions
export default counterSlice.reducer