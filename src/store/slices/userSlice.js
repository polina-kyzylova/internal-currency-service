import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_type: null,
    fam_name: null,
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    personal_acc_number: null,
    personal_acc_balance: null,
}


export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.user_type = action.payload.user_type;
            state.fam_name = action.payload.fam_name;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.personal_acc_number = action.payload.personal_acc_number;
            state.personal_acc_balance = action.payload.personal_acc_balance;
        },
        removeUser: (state) => {
            state.user_type = null;
            state.fam_name = null;
            state.first_name = null;
            state.last_name = null;
            state.phone = null;
            state.email = null;
            state.personal_acc_number = null;
            state.personal_acc_balance = null;
        },
    },
})


export const { initUser, removeUser } = counterSlice.actions
export default counterSlice.reducer