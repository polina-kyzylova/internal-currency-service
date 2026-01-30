import React, { useState } from 'react'
import styles from './ConfirmTransferCFOUnit.module.css'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import '../GeneralOperations.css'
import WestIcon from '@mui/icons-material/West'
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable'
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable'
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable'
import Loader from '../../atoms/Loader'
import { useDispatch } from 'react-redux'
import { addCFOTransaction } from '../../../store/slices/cfoSlice'
import { getUserName } from '../../../utils/getUserName'
import dayjs from 'dayjs'

export default function ConfirmTransferCFOUnit({ setConfirmTransfer }) {
	const [data, setData] = useOutletContext()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)

	/*----- confirm recipient type -----*/
	function chooseRecipient() {
		if (data?.recip_type === 'personal') {
			const targetUser = getUserName(data)

			return (
				<UserInfoTable
					title='Получатель'
					acc={data?.target_user_acc}
					name={targetUser}
					username={data?.target_user_username}
				/>
			)
		} else {
			return (
				<CFOInfoTable
					title='Получатель'
					acc_number={parseInt(data?.recip_cfo_number).toLocaleString()}
					acc_owner={data?.recip_cfo_owner}
					acc_title={data?.recip_cfo_title}
				/>
			)
		}
	}

	/*----- confirm transaction -----*/
	const makeTransaction = async () => {
		setIsLoading(true)

		const targetUser = getUserName(data, 'short')

		let transactionData = {
			operation_type: 'expense',
			purpose_id: 'transactions',
			from_account_number: data?.current_cfo_number,
			to_account_number:
				data?.recip_type === 'personal' ? data?.target_user_acc : data?.recip_cfo_number,
			amount: Number(data?.amount),
			payment_purpose_id: data?.purpose_id,
			payment_comment: data?.purpose_message,
			datetime: dayjs().format(),
		}

		const newTransaction = {
			id: Math.random(1000),
			name: targetUser,
			position: 'QA Engineer',
			teamId: 'team_qa',
			team: 'Команда QA',
			expenses: Number(data?.amount),
		}

		// для отрисовки лоадера
		await new Promise((resolve) => setTimeout(resolve, 500))

		const result = Math.random() > 0.5 ? 'success' : 'error'
		setIsLoading(false)

		if (result === 'success') {
			if (data?.current_user === 'admin') {
				// TO DO + update store
				navigate('../result/ok')
			}

			if (data?.current_user === 'owner') {
				dispatch(
					addCFOTransaction({
						new_transaction: transactionData,
						new_analytic_row: newTransaction,
						amount: Number(data?.amount),
					})
				)

				navigate('result/ok')
			}
		} else {
			if (data?.current_user === 'admin') navigate('../result/error')
			if (data?.current_user === 'owner') navigate('result/error')
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

				<CFOInfoTable
					title='Отправитель'
					acc_number={parseInt(data?.current_cfo_number).toLocaleString()}
					acc_owner={data?.current_cfo_owner}
					acc_title={data?.current_cfo_title}
				/>

				{chooseRecipient()}

				<OperationTypeTable
					operation_type='Распределение средств ЦФО'
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
