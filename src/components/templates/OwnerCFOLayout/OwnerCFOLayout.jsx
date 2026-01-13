import { useEffect, useMemo, useState } from 'react'
import styles from './OwnerCFOLayout.module.css'
import OperationsAction from '../../molecules/OperationsAction/OperationsAction'
import CFOAccount from '../../molecules/CFOAccount/CFOAccount'
import CFOOwnerTable from '../../molecules/CFOOwnerTable'
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initCFO } from '../../../store/slices/cfoSlice'
import { CFO_TEAM_LIST } from '../../../mocks/mockData'

export default function OwnerCFOLayout() {
	const { cfo_number, cfo_balance, cfo_title, cfo_type } = useSelector((state) => state.cfo)
	const navigate = useNavigate()

	/*----- CFO analytics -----*/
	const teamAnalytics = CFO_TEAM_LIST.reduce((acc, user) => {
		const teamId = user.teamId

		// Ищем команду в массиве
		let team = acc.find((t) => t.teamId === teamId)

		if (!team) {
			team = {
				teamId: teamId,
				teamName: user.team,
				totalExpenses: 0,
				employeeCount: 0,
				employees: [],
			}
			acc.push(team)
		}

		team.totalExpenses += user.expenses // Суммируем расходы
		team.employeeCount += 1
		team.employees.push({
			id: user.id,
			name: user.name,
			position: user.position,
			expenses: user.expenses,
		})

		return acc
	}, [])

	const all_cfo = useMemo(() => {
		return teamAnalytics?.map((team) => ({
			label: team?.teamName,
			value: team?.totalExpenses,
		}))
	}, [teamAnalytics])

	const calcTotalExpenses = (usersList) => {
		let total = 0
		usersList?.forEach((user) => (Number(user?.expenses) ? (total += user?.expenses) : null))
		return total
	}

	const totalExpenses = useMemo(() => calcTotalExpenses(CFO_TEAM_LIST), [])

	const [currentBalance, setCurrentBalance] = useState(cfo_balance)
	const dispatch = useDispatch()

	/*----- update store if balance change -----*/
	function updateStore() {
		dispatch(
			dispatch(
				initCFO({
					cfo_number: '2000000000',
					cfo_balance: 12000,
					cfo_title: 'Стрим 20',
					cfo_id: 222,
					owner_full_name: '>???',
					cfo_type: 'null',
				})
			)
		)
	}

	useEffect(() => {
		updateStore()
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.item}>
					<div className={cfo_type === 'service' ? styles.cfo_serv : styles.serv}>
						<h1 className={cfo_type === 'service' ? styles.cfo_service_title : styles.cfo_titl}>
							{cfo_title}
						</h1>

						<button className={styles.manage_btn} onClick={() => navigate('/owner/transfer-cfo')}>
							Перевести
						</button>
					</div>

					<div className={cfo_type === 'service' ? styles.cfo_serv : styles.serv}>
						<OperationsAction label='История операций' onClick={() => navigate('/history/cfo')} />
						<OperationsAction label='Шаблоны' />
					</div>
				</div>

				<CFOAccount cfo_balance={currentBalance} cfo_number={cfo_number} />
			</div>

			<div className={styles.analytics}>
				<h3>Аналитика по участникам</h3>

				<div className={styles.cfo_table}>
					<CFOOwnerTable teamList={CFO_TEAM_LIST} totalExpenses={totalExpenses} />
					<AdminAnalyticsUnit
						income={cfo_balance + totalExpenses}
						expenses={totalExpenses}
						data={all_cfo}
					/>
				</div>
			</div>
		</div>
	)
}
