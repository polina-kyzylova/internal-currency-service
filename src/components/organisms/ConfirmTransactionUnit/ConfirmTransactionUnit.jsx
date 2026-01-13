import React, { useState } from 'react'
import styles from './ConfirmTransactionUnit.module.css'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import '../GeneralOperations.css'
import WestIcon from '@mui/icons-material/West'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../atoms/Loader'
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable'
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable'
import { addUserTransaction } from '../../../store/slices/userSlice'
import dayjs from 'dayjs'

export default function ConfirmTransactionUnit({ setCreating }) {
	const navigate = useNavigate()
	const [data] = useOutletContext()

	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const [isLoading, setIsLoading] = useState(false)

	const makeTransaction = async () => {
		setIsLoading(true)

		let transactionData = {
			operation_type: 'expense',
			purpose_id: 'transactions',
			from_account_number: user?.personal_acc_number,
			to_account_number: data?.target_user_acc,
			amount: Number(data?.amount),
			payment_purpose_id: data?.purpose_id,
			payment_comment: data?.purpose_message,
			datetime: dayjs().format(),
		}

		// для отрисовки лоадера
		await new Promise((resolve) => setTimeout(resolve, 500))

		const result = Math.random() > 0.5 ? 'success' : 'error'
		setIsLoading(false)

		if (result === 'success') {
			dispatch(
				addUserTransaction({
					new_transaction: transactionData,
					amount: Number(data?.amount),
				})
			)

			navigate('result/ok')
		} else {
			navigate('result/error')
		}
	}

	const senderName = `${user?.surname} ${user?.name} ${user?.last_name}`
	const recipientName = `${data?.target_user_surname} ${data?.target_user_name} ${data?.target_user_lastname}`

	if (isLoading) return <Loader />
	else
		return (
			<div className={styles.container}>
				<button className='operations-prev-btn' onClick={() => setCreating(true)}>
					<WestIcon sx={{ color: '#fff', fontSize: 35 }} />
				</button>

				<div className={styles.content}>
					<h1>Подтверждение операции</h1>

					<UserInfoTable
						title='Отправитель'
						acc={user?.personal_acc_number}
						name={senderName}
						username={user?.username}
					/>

					<UserInfoTable
						title='Получатель'
						acc={data?.target_user_acc}
						name={recipientName}
						username={data?.target_user_username}
					/>

					<OperationTypeTable
						operation_type='Перевод на счет пользователя'
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
