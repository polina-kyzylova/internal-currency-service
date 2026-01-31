import { useState } from 'react'
import styles from './ConfirmReplenishCFOUnit.module.css'
import '../GeneralOperations.css'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import WestIcon from '@mui/icons-material/West'
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable'
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable'
import MasterInfotable from '../../molecules/ConfirmForm/MasterInfoTable'
import Loader from '../../atoms/Loader'
import { formatSum } from '../../../utils/formatSum'
import { addMasterTransaction } from '../../../store/slices/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

export default function ConfirmReplenishCFOUnit({ setConfirmReplenish }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const admin = useSelector((state) => state.admin)
	const [data, setData] = useOutletContext()
	const [isLoading, setIsLoading] = useState(false)

	const makeTransaction = async () => {
		setIsLoading(true)

		let transactionData = {
			operation_type: 'expense',
			purpose_id: 'budget',
			from_account_number: data?.master_acc,
			to_account_number: data?.cfo_number,
			amount: Number(data?.amount),
			cfo_name: data?.cfo_title,
			owner_full_name: data?.current_cfo_owner,
			datetime: dayjs().format(),
		}

		const newTransaction = {
			id: data?.cfo_number,
			name: data?.cfo_title,
			owner: data?.current_cfo_owner,
			income: Number(data?.amount),
		}

		// для отрисовки лоадера
		await new Promise((resolve) => setTimeout(resolve, 500))

		const result = Math.random() > 0.5 ? 'success' : 'error'
		setIsLoading(false)

		if (result === 'success') {
			dispatch(
				addMasterTransaction({
					new_transaction: transactionData,
					new_analytic_row: newTransaction,
					amount: Number(data?.amount),
				})
			)

			navigate('../result/ok')
		} else {
			navigate('../result/error')
		}
	}

	if (isLoading) return <Loader />
	return (
		<div className={styles.container}>
			<button className='operations-prev-btn' onClick={() => setConfirmReplenish(false)}>
				<WestIcon sx={{ color: '#fff', fontSize: 35 }} />
			</button>

			<div className={styles.content}>
				<h1>Подтверждение операции</h1>

				<MasterInfotable
					title='Счет списания'
					acc_number={formatSum(data?.master_acc)}
					admin={data?.sender_name}
				/>

				<CFOInfoTable
					title='Счет зачисления'
					acc_number={formatSum(data?.cfo_number)}
					acc_owner={data?.current_cfo_owner}
					acc_title={data?.cfo_title}
				/>

				<OperationTypeTable operation_type='Пополнение ЦФО' amount={data?.amount} />
			</div>

			<button className='operations-next-btn' onClick={makeTransaction}>
				Перевести
			</button>
		</div>
	)
}
