import React, { useState } from 'react'
import styles from './ChangeOwnerUnit.module.css'
import '../GeneralOperations.css'
import { useForm } from 'react-hook-form'
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack'
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable'
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList'
import { useDispatch, useSelector } from 'react-redux'
import UniversalModal from '../../molecules/UniversalModal/UniversalModal'
import { formatSum } from '../../../utils/formatSum'
import { updateCurrentCFOOwner } from '../../../store/slices/adminSlice'
import { useNavigate } from 'react-router-dom'

export default function ChangeOwnerUnit() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cfo = useSelector((state) => state?.admin)
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const handleOpen = () => setDeleteModalOpen(true)
	const handleClose = () => setDeleteModalOpen(false)

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm()

	const onSubmit = () => {
		handleOpen()
	}

	const [isLoading, setIsLoading] = useState(false)

	const handleChangeOwner = async () => {
		setIsLoading(true)
		const newOwner = getValues()

		dispatch(
			updateCurrentCFOOwner({
				cfo_id: cfo?.current_cfo_id,
				new_short_name: newOwner?.target_user_short_name,
				new_fullname: newOwner?.target_user_full_name,
				new_email: newOwner?.target_user_email,
				new_position: newOwner?.target_user_position,
				new_department: newOwner?.target_user_department,
			})
		)

		// для отрисовки лоадера
		await new Promise((resolve) => setTimeout(resolve, 500))

		setIsLoading(false)
		handleClose()
		navigate(`/admin/cfo/${cfo?.current_cfo_id}`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<UniversalModal
				handleClose={handleClose}
				targetOption={handleChangeOwner}
				open={deleteModalOpen}
				title='Вы уверены, что хотите сменить владельца ЦФО?'
				subtitle={`ЦФО: ${cfo?.current_cfo_title}`}
				isLoading={isLoading}
			/>

			<div className={styles.container}>
				<div className={styles.card}>
					<GrayButtonBack />

					<div className={styles.content}>
						<h1>Смена владельца ЦФО</h1>

						<CFOInfoTable
							title='Информация о ЦФО'
							acc_number={formatSum(cfo?.current_cfo_number)}
							acc_owner={cfo?.current_cfo_owner_fullname}
							acc_title={cfo?.current_cfo_title}
						/>

						<UsersAutoList
							register={register}
							setValue={setValue}
							errors={errors}
							title='Новый владелец:'
							getValues={getValues}
						/>
					</div>

					<input type='submit' value='Сменить' className='operations-next-btn' />
				</div>
			</div>
		</form>
	)
}
