import { createSlice } from '@reduxjs/toolkit'
import { ADMIN_TEAM_LIST } from '../../mocks/mockData'

const initialState = {
	master_acc_number: null,
	master_acc_balance: null,
	master_total_expenses: null,

	admin_full_name: null,
	admin_analytic_list: [],
	admin_transactions_history: [],

	// cfo data
	current_cfo_id: null,
	current_cfo_type: null,
	current_cfo_number: null,
	current_cfo_balance: null,
	current_cfo_title: null,
	current_cfo_owner_position: null,
	current_cfo_owner_fullname: null,
	current_cfo_owner_department: null,
	current_cfo_owner_email: null,
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
			state.current_cfo_id = action.payload.current_cfo_id
			state.current_cfo_type = action.payload.current_cfo_type
			state.current_cfo_number = action.payload.current_cfo_number
			state.current_cfo_balance = action.payload.current_cfo_balance
			state.current_cfo_title = action.payload.current_cfo_title
			state.current_cfo_owner_position = action.payload.current_cfo_owner_position
			state.current_cfo_owner_fullname = action.payload.current_cfo_owner_fullname
			state.current_cfo_owner_department = action.payload.current_cfo_owner_department
			state.current_cfo_owner_email = action.payload.current_cfo_owner_email
		},
		updateCurrentCFO: (state, action) => {
			const { item, new_value } = action.payload
			state[item] = new_value
		},
		transferCFObyAdmin: (state, action) => {
			// обновляем текущее ЦФО
			state.current_cfo_balance = state.current_cfo_balance - action.payload.amount

			// обновляем ЦФО в списке ЦФО
			const targetCfo = state.admin_analytic_list?.find(
				(item) => item?.id === action.payload.cfo_id
			)

			let updatedCfo = {
				...targetCfo,
				balance: targetCfo?.balance - action.payload.amount,
				expenses: targetCfo?.expenses + action.payload.amount,
			}

			const updatedAnalytics = state.admin_analytic_list?.map((item) => {
				if (item?.id === action.payload.cfo_id) return updatedCfo
				else return item
			})

			state.admin_analytic_list = updatedAnalytics
		},
		updateMasterBalance: (state, action) => {
			state.master_acc_balance = action.payload.master_acc_balance
		},
		updateCurrentCFOOwner: (state, action) => {
			// обновляем текущее ЦФО
			state.current_cfo_owner_position = action.payload.new_position
			state.current_cfo_owner_fullname = action.payload.new_fullname
			state.current_cfo_owner_department = action.payload.new_department
			state.current_cfo_owner_email = action.payload.new_email

			// обновляем ЦФО в списке ЦФО
			const targetCfo = state.admin_analytic_list?.find(
				(item) => item?.id === action.payload.cfo_id
			)

			let updatedCfo = {
				...targetCfo,
				owner: action.payload.new_short_name,
				owner_full_name: action.payload.new_fullname,
				owner_position: action.payload.new_position,
				owner_department: action.payload.new_department,
				owner_email: action.payload.new_email,
			}

			const updatedAnalytics = state.admin_analytic_list?.map((item) => {
				if (item?.id === action.payload.cfo_id) return updatedCfo
				else return item
			})

			state.admin_analytic_list = updatedAnalytics
		},
		removeCurrentCFO: (state) => {
			state.current_cfo_id = null
			state.current_cfo_type = null
			state.current_cfo_number = null
			state.current_cfo_balance = null
			state.current_cfo_title = null
			state.current_cfo_owner_position = null
			state.current_cfo_owner_fullname = null
			state.current_cfo_owner_department = null
			state.current_cfo_owner_email = null
		},
		removeAdmin: (state) => {
			state.master_acc_number = null
			state.master_acc_balance = null
			state.master_total_expenses = null
			state.admin_full_name = null
			state.admin_analytic_list = []
			state.admin_transactions_history = []

			state.current_cfo_id = null
			state.current_cfo_type = null
			state.current_cfo_number = null
			state.current_cfo_balance = null
			state.current_cfo_title = null
			state.current_cfo_owner_position = null
			state.current_cfo_owner_fullname = null
			state.current_cfo_owner_department = null
			state.current_cfo_owner_email = null
		},
	},
})

export const {
	initAdmin,
	addMasterTransaction,
	initCurrentCFO,
	updateCurrentCFO,
	updateMasterBalance,
	transferCFObyAdmin,
	removeCurrentCFO,
	updateCurrentCFOOwner,
	removeAdmin,
} = adminSlice.actions
export default adminSlice.reducer
