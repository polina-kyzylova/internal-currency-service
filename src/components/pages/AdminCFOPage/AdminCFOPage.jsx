import React, { useEffect, useState } from 'react'
import styles from './AdminCFOPage.module.css'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import CreateIcon from '@mui/icons-material/Create'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GrayButton from '../../atoms/GrayButton/GrayButton'
import { useDispatch, useSelector } from 'react-redux'
import { initCurrentCFO } from '../../../store/slices/adminSlice'
import { updateCurrentCFO, removeCurrentCFO } from '../../../store/slices/adminSlice'
import UniversalModal from '../../molecules/UniversalModal/UniversalModal'
import AdminCFOLayout from '../../templates/AdminCFOLayout/AdminCFOLayout'
import OperationsAction from '../../molecules/OperationsAction/OperationsAction'

export default function AdminCFOPage() {
	const [modifTitle, setModifTitle] = useState(false)
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [data, setData] = useOutletContext()
	const handleOpen = () => setDeleteModalOpen(true)
	const handleClose = () => setDeleteModalOpen(false)

	const admin = useSelector((state) => state.admin)
	const navigate = useNavigate()
	let { cfo_id } = useParams()
	const dispatch = useDispatch()

	const setupCurrentCfo = () => {
		const allCfo = admin?.admin_analytic_list
		const currentCfo = allCfo?.find((cfo) => cfo?.id === cfo_id)

		dispatch(
			initCurrentCFO({
				current_cfo_id: cfo_id,
				current_cfo_type: currentCfo?.fsc_type,
				current_cfo_number: currentCfo?.account_number,
				current_cfo_balance: currentCfo?.balance,
				current_cfo_title: currentCfo?.name,

				current_cfo_owner_position: currentCfo?.owner_position,
				current_cfo_owner_fullname: currentCfo?.owner_full_name,
				current_cfo_owner_department: currentCfo?.owner_department,
				current_cfo_owner_email: currentCfo?.owner_email,
			})
		)
	}

	useEffect(() => {
		setupCurrentCfo()
	}, [])

	/*----- remove current CFO data from store -----*/
	function leaveCFO() {
		dispatch(removeCurrentCFO())
		navigate('/admin/cfo')
	}

	/*----- change CFO title form -----*/
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		setData(data)
		setModifTitle(false)
		dispatch(
			updateCurrentCFO({
				item: 'current_cfo_title',
				new_value: data.title,
			})
		)
	}

	return (
		<div className={styles.container}>
			<UniversalModal
				open={deleteModalOpen}
				handleClose={handleClose}
				targetOption={handleClose}
				title='Вы уверены, что хотите удалить ЦФО?'
				subtitle={`ЦФО: ${admin?.current_cfo_title}`}
			/>

			<div className={styles.header}>
				<GrayButton direction='west' onClick={() => leaveCFO()} />
				<button className={styles.delete_btn}>Удалить ЦФО</button>
			</div>

			<div className={styles.content}>
				<AdminCFOLayout
					cfo_balance={admin?.current_cfo_balance}
					cfo_number={admin?.current_cfo_number}
				/>

				<div className={styles.box}>
					<div className={styles.card}>
						<div className={styles.info}>
							<p className={styles.identif}>Владелец ЦФО</p>
							<p className={styles.titl}>{admin?.current_cfo_owner_fullname}</p>
						</div>

						<div className={styles.info}>
							<p className={styles.identif}>Должность</p>
							<p className={styles.titl}>{admin?.current_cfo_owner_position}</p>
						</div>

						<div className={styles.info}>
							<p className={styles.identif}>Департамент</p>
							<p className={styles.titl}>{admin?.current_cfo_owner_department}</p>
						</div>

						<div className={styles.info}>
							<p className={styles.identif}>Email</p>
							<p className={styles.titl}>{admin?.current_cfo_owner_email}</p>
						</div>
					</div>

					<div className={styles.content}>
						<div className={styles.card}>
							<div className={styles.info}>
								<label htmlFor='title' className={styles.identif}>
									Название ЦФО
								</label>

								<div className={styles.modif_item}>
									<p className={styles.titl}>{admin.current_cfo_title}</p>
									<button>
										<CreateIcon />
									</button>
								</div>
							</div>
						</div>

						<OperationsAction label='История операций' />
					</div>
				</div>
			</div>
		</div>
	)
}
