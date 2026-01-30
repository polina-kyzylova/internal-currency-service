import { useState, useMemo } from 'react'
import styles from './AdminBudgetLayout.module.css'
import OperationsAction from '../../molecules/OperationsAction/OperationsAction'
import MasterAccount from '../../molecules/MasterAccount/MasterAccount'
import CFOAdminTable from '../../molecules/CFOAdminTable'
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit'
import { useNavigate } from 'react-router-dom'
import DataModal from '../../molecules/DataModal/DataModal'
import { useSelector } from 'react-redux'
import coin from '../../../assets/black_coin.svg'
import { formatSum } from '../../../utils/formatSum'

export const COIN_RATE = 10

export default function AdminBudgetLayout() {
	const navigate = useNavigate()
	const { admin_analytic_list, master_acc_balance, master_total_expenses } = useSelector(
		(state) => state.admin
	)

	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const handleClose = () => setDeleteModalOpen(false)
	const handleTransfer = () => navigate('/admin/transfer-master')

	const allCfo = useMemo(() => {
		return admin_analytic_list?.map((team) => ({
			label: team?.name,
			value: team?.income,
		}))
	}, [admin_analytic_list])

	const totalData = useMemo(() => {
		const result = admin_analytic_list?.reduce(
			(acc, item) => {
				return {
					totalBalance: (acc.totalBalance += item?.balance),
					totalIcome: (acc.totalIcome += item?.income),
					totalExpenses: (acc.totalExpenses += item?.expenses),
				}
			},
			{ totalBalance: 0, totalIcome: 0, totalExpenses: 0 }
		)

		return result
	}, [admin_analytic_list])

	return (
		<div className={styles.container}>
			<DataModal open={deleteModalOpen} handleClose={handleClose} />

			<div className={styles.content}>
				<div className={styles.oborot}>
					<div className={styles.oborot_item}>
						<p>
							Курс <span className={styles.currency}>коин/рубль</span>
						</p>
						<h2>
							<span className={styles.oborot_amount}>{COIN_RATE}</span>
							<img className={styles.coin} src={coin} alt='coin' />
							<span className={styles.rubl}>/&#8381;</span>
						</h2>
					</div>

					<div className={styles.oborot_item}>
						<p>Оборот средств</p>
						<h2>
							{formatSum(totalData?.totalBalance / COIN_RATE)}
							<span className={styles.rubl}> &#8381;</span>
						</h2>
					</div>

					<div className={styles.oborot_item}>
						<p>Расходы на ЦФО</p>
						<h2>
							{formatSum(master_total_expenses / COIN_RATE)}
							<span className={styles.rubl}> &#8381;</span>
						</h2>
					</div>
				</div>

				<div className={styles.operations}>
					<div className={styles.oper_btns}>
						<button className={styles.action_btn}>Пополнить</button>
						<button className={styles.action_btn} onClick={handleTransfer}>
							Перевести
						</button>
					</div>
					<OperationsAction label='Шаблоны' />
					<OperationsAction label='История операций' onClick={() => navigate('/history/admin')} />
				</div>

				<MasterAccount />
			</div>

			<div className={styles.analytics}>
				<h3>Аналитика по ЦФО</h3>

				<div className={styles.cfo_table}>
					<CFOAdminTable teamList={admin_analytic_list} totalData={totalData} />
					<AdminAnalyticsUnit
						income={master_acc_balance + master_total_expenses}
						expenses={master_total_expenses}
						data={allCfo}
					/>
				</div>
			</div>
		</div>
	)
}
