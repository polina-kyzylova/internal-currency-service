import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cfo_acc_number: '333333333333',
    cfo_acc_balance: '9000',
}


export const counterSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        initOwner: (state, action) => {
            state.cfo_acc_number = action.payload.cfo_acc_number;
            state.cfo_acc_balance = action.payload.cfo_acc_balance;
        },
        removeOwner: (state) => {
            state.cfo_acc_number = null;
            state.cfo_acc_balance = null;
        },
    },
})


export const { initOwner, removeOwner } = counterSlice.actions
export default counterSlice.reducer