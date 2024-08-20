import { createSlice } from '@reduxjs/toolkit';

//const initialState = [];

const initialState = [
    {
        cfo_acc_number: 333333333331,
        cfo_acc_balance: 6700,
        cfo_id: 331,
        owner_id: 441,
        title: 'Активности',
        owner_name: 'Петренко И.И.',
    },
    {
        cfo_acc_number: 333333333332,
        cfo_acc_balance: 9900,
        cfo_id: 332,
        owner_id: 442,
        title: 'Магазин товаров',
        owner_name: 'Никитенко И.И.',
    },
    {
        cfo_acc_number: 333333333333,
        cfo_acc_balance: 5300,
        cfo_id: 333,
        owner_id: 443,
        title: 'Дни рождения',
        owner_name: 'Сидоренко И.И.',
    },
    {
        cfo_acc_number: 333333333334,
        cfo_acc_balance: 8100,
        cfo_id: 334,
        owner_id: 444,
        title: 'Праздники',
        owner_name: 'Иваненко И.И.',
    }
];



export const counterSlice = createSlice({
    name: 'adminServiceCFO',
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