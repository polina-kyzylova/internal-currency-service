import { createSlice } from '@reduxjs/toolkit';

// initialState = []

const initialState = [
    {
        cfo_acc_number: 222222222221,
        cfo_acc_balance: 1590,
        cfo_id: 221,
        owner_id: 111,
        title: 'Команда 1',
        owner_name: 'Васильев В.П.',
    },
    {
        cfo_acc_number: 222222222222,
        cfo_acc_balance: 3300,
        cfo_id: 222,
        owner_id: 112,
        title: 'Команда 2',
        owner_name: 'Сидоров И.И.',
    },
    {
        cfo_acc_number: 222222222223,
        cfo_acc_balance: 2550,
        cfo_id: 223,
        owner_id: 113,
        title: 'Команда 3',
        owner_name: 'Петров Е.В.',
    },
    {
        cfo_acc_number: 222222222224,
        cfo_acc_balance: 4100,
        cfo_id: 224,
        owner_id: 114,
        title: 'Команда 4',
        owner_name: 'Иванов И.В.',
    }
];

/*
---------- CFO pattern ---------
    cfo_acc_number,
    cfo_acc_balance,
    cfo_id,
    owner_id,
    owner_full_name,
*/



export const counterSlice = createSlice({
    name: 'adminStandartCFO',
    initialState,
    reducers: {
        initALLCFO(state, action) {
            return [...state, ...action.payload];
        },
        addNewCFO(state, action) {
            state.push(action.payload);
        },
        updateOwner(state, action) {
            state.map(item => {
                if (item.Номер_Заявки === action.payload.Номер_Заявки) {
                    item.Статус = action.payload.Статус
                    item.Статус_Код = action.payload.Статус_Код
                }
                return item;
            });
        },
        deleteCFO(state, action) {

        },
        deleteAllCFO() {
            return [];
        }
    },
})


export const { initALLCFO, addNewCFO, updateOwner, deleteCFO, deleteAllCFO } = counterSlice.actions
export default counterSlice.reducer