import React, { useState } from 'react'
import styles from './ConfirmTransferMasterUnit.module.css'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import '../GeneralOperations.css'
import WestIcon from '@mui/icons-material/West'
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable'
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable'
import MasterInfoTable from '../../molecules/ConfirmForm/MasterInfoTable'
import Loader from '../../atoms/Loader'
import { useDispatch } from 'react-redux'
import { addMasterTransaction } from '../../../store/slices/adminSlice'
import { formatSum } from '../../../utils/formatSum'
import dayjs from 'dayjs'

export default function ConfirmTransferMasterUnit({ setConfirmTransfer }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [data, setData] = useOutletContext()
	const [isLoading, setIsLoading] = useState(false)

	const makeTransaction = async () => {
		setIsLoading(true)

		let transactionData = {
			operation_type: 'expense',
			purpose_id: 'budget',
			from_account_number: data?.sender_number,
			to_account_number: data?.recip_cfo_number,
			amount: Number(data?.amount),
			cfo_name: data?.recip_cfo_title,
			owner_full_name: data?.recip_cfo_owner_full_name,
			payment_purpose_id: data?.purpose_id,
			payment_comment: data?.purpose_message,
			datetime: dayjs().format(),
		}

		const cfoBalance = Math.floor(Math.random() * (1000 - 500 + 1)) + 1000

		const newTransaction = {
			id: data?.recip_cfo_number,
			name: data?.recip_cfo_title,
			owner: data?.recip_cfo_owner,
			balance: cfoBalance,
			income: Number(data?.amount),
			expenses: Number(data?.amount) - cfoBalance,
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

			navigate('result/ok')
		} else {
			navigate('result/error')
		}
	}

	if (isLoading) return <Loader />
	return (
		<div className={styles.container}>
			<button className='operations-prev-btn' onClick={() => setConfirmTransfer(false)}>
				<WestIcon sx={{ color: '#fff', fontSize: 35 }} />
			</button>

			<div className={styles.content}>
				<h1>Подтверждение операции</h1>

				<MasterInfoTable
					title='Отправитель'
					acc_number={formatSum(data?.sender_number)}
					admin={data?.sender_name}
				/>

				<CFOInfoTable
					title='Получатель'
					acc_number={formatSum(data?.recip_cfo_number)}
					acc_owner={data?.recip_cfo_owner_full_name}
					acc_title={data?.recip_cfo_title}
				/>

				<OperationTypeTable
					operation_type='Распределение средств Мастер-счета'
					amount={data?.amount}
					message={data?.purpose_message}
				/>
			</div>

			<button className='operations-next-btn' onClick={() => makeTransaction()}>
				Перевести
			</button>
		</div>
	)
}
