import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cfo_number: '333333333333',
    cfo_balance: '9000',
    cfo_title: 'Тестовое название',
    cfo_id: '123',
    owner_phone: '79992223344',
    cfo_type: 'service',
}


export const cfoSlice = createSlice({
    name: 'cfo',
    initialState,
    reducers: {
        initCFO: (state, action) => {
            state.cfo_number = action.payload.cfo_number;
            state.cfo_balance = action.payload.cfo_balance;
            state.cfo_title = action.payload.cfo_title;
            state.cfo_id = action.payload.cfo_id;
            state.owner_phone = action.payload.owner_phone;
            state.cfo_type = action.payload.cfo_type;
        },
        updateCFO: (state, action) => {
            const { item, new_value } = action.payload;
            state[item] = new_value;
        },
        removeCFO: (state) => {
            state.cfo_number = null;
            state.cfo_balance = null;
            state.cfo_title = null;
            state.cfo_id = null;
            state.owner_phone = null;
            state.cfo_type = null;
        },
    },
})


export const { initCFO, updateCFO, removeCFO } = cfoSlice.actions
export default cfoSlice.reducer