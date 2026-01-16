import { createSlice } from '@reduxjs/toolkit'
import { CFO_HISTORY, CFO_TEAM_LIST } from '../../mocks/mockData'

const initialState = {
	cfo_number: null,
	cfo_balance: null,
	cfo_title: null,
	cfo_id: null,
	owner_full_name: null,
	cfo_type: null,
	cfo_transactions_history: [],
	cfo_total_expenses: null,
	cfo_analytic_list: [],
}

export const cfoSlice = createSlice({
	name: 'cfo',
	initialState,
	reducers: {
		initCFO: (state, action) => {
			state.owner_full_name = action.payload.owner_full_name

			// demo init data
			state.cfo_number = '2000000000'
			state.cfo_balance = 12000
			state.cfo_title = 'Стрим 20'
			state.cfo_id = '222'
			state.cfo_type = 'null'
			state.cfo_transactions_history = CFO_HISTORY
			state.cfo_total_expenses = 3600
			state.cfo_analytic_list = CFO_TEAM_LIST
		},
		updateCFO: (state, action) => {
			const { item, new_value } = action.payload
			state[item] = new_value
		},
		updateCFOBalance: (state, action) => {
			state.cfo_balance = action.payload.cfo_balance
		},
		addCFOTransaction: (state, action) => {
			const { new_transaction, new_analytic_row, amount } = action.payload

			// Добавляем транзакцию
			state.cfo_transactions_history = [new_transaction, ...state.cfo_transactions_history]

			// Обновляем аналитику
			state.cfo_analytic_list = [new_analytic_row, ...state.cfo_analytic_list]

			// Обновляем общие расходы
			state.cfo_total_expenses += amount

			// Обновляем баланс
			state.cfo_balance -= amount
		},
		removeCFO: (state) => {
			state.cfo_number = null
			state.cfo_balance = null
			state.cfo_title = null
			state.cfo_id = null
			state.owner_full_name = null
			state.cfo_type = null
			state.cfo_transactions_history = null
			state.cfo_total_expenses = null
			state.cfo_analytic_list = null
		},
	},
})

export const { initCFO, updateCFO, updateCFOBalance, addCFOTransaction, removeCFO } =
	cfoSlice.actions
export default cfoSlice.reducer
