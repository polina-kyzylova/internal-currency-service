import { useMemo } from 'react'
import styles from './OwnerCFOLayout.module.css'
import OperationsAction from '../../molecules/OperationsAction/OperationsAction'
import CFOAccount from '../../molecules/CFOAccount/CFOAccount'
import CFOOwnerTable from '../../molecules/CFOOwnerTable'
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function OwnerCFOLayout() {
	const navigate = useNavigate()
	const { cfo_number, cfo_balance, cfo_title, cfo_type, cfo_analytic_list, cfo_total_expenses } =
		useSelector((state) => state.cfo)

	/*----- CFO analytics -----*/
	const teamAnalytics = cfo_analytic_list?.reduce((acc, user) => {
		const teamId = user?.teamId

		// Ищем команду в массиве
		let team = acc?.find((t) => t.teamId === teamId)

		if (!team) {
			team = {
				teamId: teamId,
				teamName: user?.team,
				totalExpenses: 0,
				employeeCount: 0,
				employees: [],
			}
			acc.push(team)
		}

		team.totalExpenses += user?.expenses // Суммируем расходы
		team.employeeCount += 1
		team.employees.push({
			id: user?.id,
			name: user?.name,
			position: user?.position,
			expenses: user?.expenses,
		})

		return acc
	}, [])

	const all_cfo = useMemo(() => {
		return teamAnalytics?.map((team) => ({
			label: team?.teamName,
			value: team?.totalExpenses,
		}))
	}, [teamAnalytics])

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
						<OperationsAction label='История операций' onClick={() => navigate('/history/owner')} />
						<OperationsAction label='Шаблоны' />
					</div>
				</div>

				<CFOAccount cfo_balance={cfo_balance} cfo_number={cfo_number} />
			</div>

			<div className={styles.analytics}>
				<h3>Аналитика по участникам</h3>

				<div className={styles.cfo_table}>
					<CFOOwnerTable teamList={cfo_analytic_list} totalExpenses={cfo_total_expenses} />
					<AdminAnalyticsUnit
						income={cfo_balance + cfo_total_expenses}
						expenses={cfo_total_expenses}
						data={all_cfo}
					/>
				</div>
			</div>
		</div>
	)
}
