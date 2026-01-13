import { createSlice } from '@reduxjs/toolkit'
import { USER_HISTORY, USER_INCOME, USER_EXPENSES } from '../../mocks/mockData'

const initialState = {
	user_type: null,
	user_id: null,
	username: null,
	surname: null,
	name: null,
	last_name: null,
	email: null,
	personal_acc_number: null,
	personal_acc_balance: null,
	transactions_history: [],
	analytics_income: [],
	analytics_expenses: [],
	total_income: null,
	total_expenses: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initUser: (state, action) => {
			state.username = action.payload.username
			state.surname = action.payload.surname
			state.name = action.payload.name
			state.last_name = action.payload.last_name
			state.email = action.payload.email

			// demo init data
			state.user_id = '111'
			state.personal_acc_number = '1000000000'
			state.personal_acc_balance = 500
			state.transactions_history = USER_HISTORY
			state.analytics_income = USER_INCOME
			state.analytics_expenses = USER_EXPENSES
			state.total_income = 600
			state.total_expenses = 100
		},
		setUserRole: (state, action) => {
			state.user_type = action.payload.user_type
		},
		updateUserBalance: (state, action) => {
			state.personal_acc_balance = action.payload.personal_acc_balance
		},
		addUserTransaction: (state, action) => {
			const { new_transaction, amount } = action.payload

			// Добавляем транзакцию
			state.transactions_history = [new_transaction, ...state.transactions_history]

			// Обновляем общие расходы
			state.total_expenses += amount

			// Находим и обновляем категорию "transactions" в аналитике
			const transactionsCategoryIndex = state.analytics_expenses.findIndex(
				(item) => item.id === 'transactions'
			)

			if (transactionsCategoryIndex !== -1) {
				// Обновляем существующую категорию
				state.analytics_expenses[transactionsCategoryIndex].value += amount
			} else {
				// Если категории нет - передаем amount
				state.analytics_expenses.push({
					id: 'transactions',
					value: amount,
					label: 'Переводы',
				})
			}

			// Обновляем баланс
			state.personal_acc_balance -= amount
		},
		removeUser: (state) => {
			state.user_type = null
			state.user_id = null
			state.username = null
			state.surname = null
			state.name = null
			state.last_name = null
			state.email = null
			state.personal_acc_number = null
			state.personal_acc_balance = null
			state.transactions_history = []
			state.analytics_income = []
			state.analytics_expenses = []
			state.total_income = null
			state.total_expenses = null
		},
	},
})

export const { initUser, setUserRole, updateUserBalance, addUserTransaction, removeUser } =
	userSlice.actions
export default userSlice.reducer
