import styles from './OperationsHistoryPage.module.css'
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack'
import { useSelector } from 'react-redux'
import { EMPLOYEE_LIST, HISTORY_PURPOSES } from '../../../mocks/mockData'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import expensesActivity from '../../../assets/expenses-activity.png'
import expensesTransaction from '../../../assets/expenses-transaction.png'
import expensesMarket from '../../../assets/expenses-market.png'
import expensesGift from '../../../assets/expenses-gift.png'
import expensesBudget from '../../../assets/expenses-budget.png'

import incomeEncouragement from '../../../assets/income-encouragement.png'
import incomeTransaction from '../../../assets/income-transaction.png'
import incomeActivity from '../../../assets/income-transaction.png'
import incomeGift from '../../../assets/income-gift.png'
import { useEffect, useState } from 'react'
import { formatSum } from '../../../utils/formatSum'

const INCOME_IMG = {
	transactions: incomeTransaction,
	encouragement: incomeEncouragement,
	gifts: incomeGift,
	activity: incomeActivity,
}

const EXPENSES_IMG = {
	market: expensesMarket,
	activity: expensesActivity,
	gifts: expensesGift,
	transactions: expensesTransaction,
	budget: expensesBudget,
}

export default function OperationsHistoryPage() {
	const { target } = useParams()
	const [targetHistory, setTargetHistory] = useState([])

	const { transactions_history } = useSelector((state) => state.user)
	const { cfo_transactions_history } = useSelector((state) => state.cfo)
	const { admin_transactions_history } = useSelector((state) => state.admin)

	const getUserName = (targetAccNumber) => {
		const user = EMPLOYEE_LIST?.find((employee) => employee?.account_number === targetAccNumber)
		return user?.surname ? `${user?.surname} ${user?.name} ${user?.lastname}` : null
	}

	const getDatetime = (rawDate, target) => {
		const dateObj = dayjs(rawDate)

		if (target === 'date') return dateObj?.format('DD.MM.YYYY') || ''
		if (target === 'time') return dateObj?.format('HH:mm') || ''
	}

	const getTargetImg = (operationType, purposeId) => {
		if (operationType === 'expense') return EXPENSES_IMG[purposeId]
		else return INCOME_IMG[purposeId]
	}

	useEffect(() => {
		if (target === 'user') setTargetHistory(transactions_history)
		if (target === 'owner') setTargetHistory(cfo_transactions_history)
		if (target === 'admin') setTargetHistory(admin_transactions_history)
	}, [target, transactions_history, cfo_transactions_history, admin_transactions_history])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<GrayButtonBack />
				<h2>История операций</h2>
			</div>

			<div className={styles.content}>
				{Boolean(targetHistory?.length) ? (
					targetHistory?.map((item, index) => {
						const digit = item?.operation_type === 'expense' ? '-' : '+'

						const userName = getUserName(item?.to_account_number)
						const userType = item?.operation_type === 'expense' ? 'Получатель' : 'Отправитель'

						const targetImg = getTargetImg(item?.operation_type, item?.purpose_id)

						return (
							<div key={index} className={styles.oper_card}>
								<img src={targetImg} alt='purpose_img' className={styles.purpose_cover} />

								<div className={styles.oper_layout}>
									<div>
										<span>{HISTORY_PURPOSES[item?.purpose_id]}</span>
										<p className={styles.amount}>
											{digit} {formatSum(item?.amount)} коинов
										</p>
									</div>

									<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
										{userName && (
											<p>
												{userType}: {userName}
											</p>
										)}

										{item?.cfo_name && <p>ЦФО: {item?.cfo_name}</p>}
										{item?.owner_full_name && <p>Владелец: {item?.owner_full_name}</p>}
										{item?.payment_comment && <p>Комментарий: {item?.payment_comment}</p>}
									</div>

									<span style={{ alignSelf: 'flex-end' }}>
										{getDatetime(item?.datetime, 'date')} | {getDatetime(item?.datetime, 'time')}
									</span>
								</div>
							</div>
						)
					})
				) : (
					<p className={styles.empty_history}>Нет операций</p>
				)}
			</div>
		</div>
	)
}
