import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    master_acc_number: '555555555555',
    master_acc_balance: 79000,

    current_cfo_number: null,
    current_cfo_balance: null,
    current_cfo_title: null,
    current_owner_username: null,
    current_owner_name: null,
    current_owner_surname: null,
    current_owner_lastname: null,
    current_cfo_id: null,
    current_cfo_type: null,
    service_id: null,
    current_owner_fullname: null,
}


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        initAdmin: (state, action) => {
            state.master_acc_number = action.payload.master_acc_number;
            state.master_acc_balance = action.payload.master_acc_balance;
        },
        initCurrentCFO: (state, action) => {
            state.current_cfo_number = action.payload.current_cfo_number;
            state.current_cfo_balance = action.payload.current_cfo_balance;
            state.current_cfo_title = action.payload.current_cfo_title;
            state.current_owner_username = action.payload.current_owner_username;
            state.current_owner_name = action.payload.current_owner_name;
            state.current_owner_surname = action.payload.current_owner_surname;
            state.current_owner_lastname = action.payload.current_owner_lastname;
            state.current_cfo_id = action.payload.current_cfo_id;
            state.current_cfo_type = action.payload.current_cfo_type;
            state.service_id = action.payload.service_id;
            state.current_owner_fullname = action.payload.current_owner_fullname;
        },
        updateCurrentCFO: (state, action) => {
            const { item, new_value } = action.payload;
            state[item] = new_value;
        },
        removeCurrentCFO: (state) => {
            state.current_cfo_number = null;
            state.current_cfo_balance = null;
            state.current_cfo_title = null;
            state.current_owner_username = null;
            state.current_owner_name = null;
            state.current_owner_surname = null
            state.current_owner_lastname = null;
            state.current_cfo_id = null;
            state.current_cfo_type = null;
            state.service_id = null;
            state.current_owner_fullname = null;
        },
        removeAdmin: (state) => {
            state.master_acc_number = null;
            state.master_acc_balance = null;
            state.current_cfo_number = null;
            state.current_cfo_balance = null;
            state.current_cfo_title = null;
            state.current_owner_username = null;
            state.current_owner_name = null;
            state.current_owner_surname = null
            state.current_owner_lastname = null;
            state.current_cfo_id = null;
            state.current_cfo_type = null;
            state.service_id = null;
            state.current_owner_fullname = null;
        },
    },
})


export const { initAdmin, initCurrentCFO, updateCurrentCFO, removeCurrentCFO, removeAdmin } = adminSlice.actions
export default adminSlice.reducer