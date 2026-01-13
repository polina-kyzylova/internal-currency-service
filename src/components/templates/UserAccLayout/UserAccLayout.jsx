import styles from './UserAccLayout.module.css'
import UserMoneyUnit from '../../organisms/UserMoneyUnit/UserMoneyUnit'
import UserAnalyticsUnit from '../../organisms/UserAnalyticsUnit/UserAnalyticsUnit'
import { useSelector } from 'react-redux'

export default function UserAccLayout() {
	const { analytics_income, analytics_expenses, total_income, total_expenses } = useSelector(
		(state) => state.user
	)

	return (
		<div className={styles.container}>
			<div className={styles.analys}>
				<div className={styles.period}>
					<p>Выбрать период</p>
				</div>

				<div className={styles.content}>
					<UserAnalyticsUnit
						label='Поступления'
						money={`+${total_income}`}
						data={analytics_income}
					/>
					<UserAnalyticsUnit
						label='Расходы'
						money={`-${total_expenses}`}
						data={analytics_expenses}
					/>
				</div>
			</div>

			<UserMoneyUnit />
		</div>
	)
}
