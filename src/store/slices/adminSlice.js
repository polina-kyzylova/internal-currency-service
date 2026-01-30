import { createSlice } from '@reduxjs/toolkit'
import { ADMIN_TEAM_LIST } from '../../mocks/mockData'

const initialState = {
	master_acc_number: null,
	master_acc_balance: null,
	master_total_expenses: null,

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

	admin_full_name: null,
	admin_analytic_list: [],
	admin_transactions_history: [],
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		initAdmin: (state, action) => {
			state.admin_full_name = action.payload.admin_full_name
			state.admin_transactions_history = action.payload.admin_transactions_history

			// demo init data
			state.master_acc_number = '3000000000'
			state.master_acc_balance = 90700
			state.master_total_expenses = 73000
			state.admin_analytic_list = ADMIN_TEAM_LIST
		},
		addMasterTransaction: (state, action) => {
			const { new_transaction, new_analytic_row, amount } = action.payload

			// Добавляем транзакцию
			state.admin_transactions_history = [new_transaction, ...state.admin_transactions_history]

			// Обновляем аналитику
			const existedRow = state.admin_analytic_list?.find(
				(item) => item?.id === new_analytic_row?.id
			)

			if (existedRow) {
				let updatedRow = {
					...existedRow,
					balance: existedRow?.balance + new_analytic_row?.income,
					income: existedRow?.income + new_analytic_row?.income,
					expenses: existedRow?.expenses,
				}

				const updatedAnalytics = state.admin_analytic_list?.map((item) => {
					if (item?.id === new_analytic_row?.id) return updatedRow
					else return item
				})

				state.admin_analytic_list = updatedAnalytics
			} else {
				state.admin_analytic_list = [new_analytic_row, ...state.admin_analytic_list]
			}

			// Обновляем общие расходы
			state.master_total_expenses += amount

			// Обновляем баланс
			state.master_acc_balance -= amount
		},
		initCurrentCFO: (state, action) => {
			state.current_cfo_number = action.payload.current_cfo_number
			state.current_cfo_balance = action.payload.current_cfo_balance
			state.current_cfo_title = action.payload.current_cfo_title
			state.current_owner_username = action.payload.current_owner_username
			state.current_owner_name = action.payload.current_owner_name
			state.current_owner_surname = action.payload.current_owner_surname
			state.current_owner_lastname = action.payload.current_owner_lastname
			state.current_cfo_id = action.payload.current_cfo_id
			state.current_cfo_type = action.payload.current_cfo_type
			state.service_id = action.payload.service_id
			state.current_owner_fullname = action.payload.current_owner_fullname
		},
		updateCurrentCFO: (state, action) => {
			const { item, new_value } = action.payload
			state[item] = new_value
		},
		updateMasterBalance: (state, action) => {
			state.master_acc_balance = action.payload.master_acc_balance
		},
		removeCurrentCFO: (state) => {
			state.current_cfo_number = null
			state.current_cfo_balance = null
			state.current_cfo_title = null
			state.current_owner_username = null
			state.current_owner_name = null
			state.current_owner_surname = null
			state.current_owner_lastname = null
			state.current_cfo_id = null
			state.current_cfo_type = null
			state.service_id = null
			state.current_owner_fullname = null
		},
		removeAdmin: (state) => {
			state.master_acc_number = null
			state.master_acc_balance = null
			state.master_total_expenses = null
			state.current_cfo_number = null
			state.current_cfo_balance = null
			state.current_cfo_title = null
			state.current_owner_username = null
			state.current_owner_name = null
			state.current_owner_surname = null
			state.current_owner_lastname = null
			state.current_cfo_id = null
			state.current_cfo_type = null
			state.service_id = null
			state.current_owner_fullname = null
			state.admin_full_name = null
			state.admin_analytic_list = []
			state.admin_transactions_history = []
		},
	},
})

export const {
	initAdmin,
	addMasterTransaction,
	initCurrentCFO,
	updateCurrentCFO,
	updateMasterBalance,
	removeCurrentCFO,
	removeAdmin,
} = adminSlice.actions
export default adminSlice.reducer
