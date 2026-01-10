import React from 'react'
import styles from './UserAccLayout.module.css'
import UserMoneyUnit from '../../organisms/UserMoneyUnit/UserMoneyUnit'
import UserAnalyticsUnit from '../../organisms/UserAnalyticsUnit/UserAnalyticsUnit'

export default function UserAccLayout() {
	// TO DO
	const data1 = [
		{ id: 0, value: 30, label: 'Переводы' },
		{ id: 1, value: 15, label: 'Регулярная выплата' },
		{ id: 2, value: 20, label: 'Подарки' },
		{ id: 3, value: 25, label: 'Активности' },
	]

	const data2 = [
		{ id: 0, value: 8, label: 'Магазин' },
		{ id: 1, value: 12, label: 'Переводы' },
		{ id: 2, value: 25, label: 'Активности' },
		{ id: 3, value: 80, label: 'Подарки' },
	]

	return (
		<div className={styles.container}>
			<div className={styles.analys}>
				<div className={styles.period}>
					<p>Выбрать период</p>
				</div>

				<div className={styles.content}>
					<UserAnalyticsUnit label='Поступления' money='+500' data={data1} />
					<UserAnalyticsUnit label='Расходы' money='-140' data={data2} />
				</div>
			</div>

			<UserMoneyUnit />
		</div>
	)
}
