import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_type: 'ROLE_OWNER',
    user_id: '123',
    username: 'pasha',
    surname: 'Техник',
    name: 'Паша',
    last_name: 'Иванович',
    email: 'email',
    personal_acc_number: '12345',
    personal_acc_balance: 200,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, action) => {
            //state.user_type = action.payload.user_type;
            state.user_id = action.payload.user_id;
            state.username = action.payload.username;
            state.surname = action.payload.surname;
            state.name = action.payload.name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.personal_acc_number = action.payload.personal_acc_number;
            //state.personal_acc_balance = action.payload.personal_acc_balance;
            state.personal_acc_balance = 200;
        },
        removeUser: (state) => {
            state.user_type = null;
            state.user_id = null;
            state.username = null;
            state.surname = null;
            state.name = null;
            state.last_name = null;
            state.email = null;
            state.personal_acc_number = null;
            state.personal_acc_balance = null;
        },
    },
})


export const { initUser, removeUser } = userSlice.actions
export default userSlice.reducer