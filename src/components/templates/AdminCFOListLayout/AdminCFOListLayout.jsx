import { useState } from 'react'
import styles from './AdminCFOListLayout.module.css'
import CFOCard from '../../molecules/CFOCard/CFOCard'
import { useNavigate } from 'react-router-dom'
import { formatSum } from '../../../utils/formatSum'
import { useSelector } from 'react-redux'

export default function AdminCFOListLayout() {
	const navigate = useNavigate()
	const { admin_analytic_list } = useSelector((state) => state.admin)

	const [allTeamCFO, setAllTeamCFO] = useState(admin_analytic_list)
	const [allServiceCFO, setAllServiceCFO] = useState([])

	return (
		<div className={styles.container}>
			<div className={styles.manage}>
				<button className={styles.create_btn}>Создать ЦФО</button>
			</div>

			<div className={styles.content}>
				<div className={styles.cfo}>
					<h3>ЦФО сервисов</h3>

					<div className={styles.cards}>
						{!!allServiceCFO?.length ? (
							allServiceCFO?.map((item) => {
								return (
									<CFOCard
										key={item?.id}
										cfo_id={item?.id}
										balance={formatSum(item?.balance)}
										title={item?.name}
										owner={item?.owner}
									/>
								)
							})
						) : (
							<p className={styles.dis_cfo}>Нет активных ЦФО</p>
						)}
					</div>
				</div>

				<div className={styles.cfo}>
					<h3>ЦФО</h3>

					<div className={styles.cards}>
						{!!allTeamCFO?.length ? (
							allTeamCFO?.map((item) => {
								return (
									<CFOCard
										key={item?.id}
										cfo_id={item?.id}
										balance={formatSum(item?.balance)}
										title={item?.name}
										owner={item?.owner}
									/>
								)
							})
						) : (
							<p className={styles.dis_cfo}>Нет активных ЦФО</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
