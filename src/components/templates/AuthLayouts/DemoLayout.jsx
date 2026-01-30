import { useEffect, useState } from 'react'
import styles from './AuthLayout.module.css'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import { initUser, removeUser } from '../../../store/slices/userSlice'
import AlertTitle from '@mui/material/AlertTitle'
import { Alert } from '@mui/material'
import { Snackbar } from '@mui/material'
import { setUserRole } from '../../../store/slices/userSlice'
import { EMAIL_REGEXP, RoleTypes } from '../../../store/globalVariables'
import { removeCFO, initCFO } from '../../../store/slices/cfoSlice'
import { removeAdmin } from '../../../store/slices/adminSlice'
import { initAdmin } from '../../../store/slices/adminSlice'
import { ADMIN_HISTORY, ADMIN_TEAM_LIST } from '../../../mocks/mockData'
import dayjs from 'dayjs'

export const DemoLayout = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { name } = useSelector((state) => state.user)

	useEffect(() => {
		if (name) {
			dispatch(removeUser())
			dispatch(removeCFO())
			dispatch(removeAdmin())
		}
	}, [name])

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: { userRole: RoleTypes.User },
	})

	const [open, setOpen] = useState('')

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return
		setOpen('')
	}

	const handleChangeUserRole = (event) => {
		setValue('userRole', event.target.value)
	}

	const getRandomDate = () => {
		const startDate = dayjs('2024-09-01')
		const today = dayjs()

		const diffInMs = today.diff(startDate)
		const randomMs = Math.floor(Math.random() * diffInMs)

		return startDate.add(randomMs, 'millisecond')
	}

	const onSubmit = async (userData) => {
		dispatch(
			initUser({
				surname: userData?.surname,
				name: userData?.name,
				last_name: userData?.lastname,
				email: userData?.email,
				username: 'DEMOuser',
			})
		)

		dispatch(
			setUserRole({
				user_type: userData?.userRole,
			})
		)

		if (userData?.userRole === RoleTypes.User) navigate('/user')

		if (userData?.userRole === RoleTypes.Owner) {
			dispatch(
				initCFO({
					owner_full_name: `${userData?.surname} ${userData?.name} ${userData?.lastname}`,
				})
			)
			navigate('/owner')
		}

		if (userData?.userRole === RoleTypes.Admin) {
			const template = {
				operation_type: 'expense',
				purpose_id: 'budget',
				from_account_number: '3000000000',
				payment_comment: '',
			}

			const cfoList = ADMIN_TEAM_LIST?.map((item) => ({
				...template,
				datetime: getRandomDate(),
				to_account_number: item?.account_number,
				cfo_name: item?.name,
				owner_full_name: item?.owner_full_name,
				amount: item?.income,
			}))

			dispatch(
				initAdmin({
					admin_full_name: `${userData?.surname} ${userData?.name} ${userData?.lastname}`,
					admin_transactions_history: [...cfoList, ...ADMIN_HISTORY],
				})
			)
			navigate('/admin')
		}
	}

	return (
		<form className={styles.onboard_form} onSubmit={handleSubmit(onSubmit)}>
			<Snackbar
				open={!!open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: '100%' }}>
					<AlertTitle>Error</AlertTitle>
					{open}
				</Alert>
			</Snackbar>

			<div>
				<h1>Демо-режим</h1>
				<p className={styles.demo_text}>Введите данные и выберите роль тестового пользователя</p>
			</div>

			<div className={styles.content}>
				<div className={styles.inpt_box}>
					<label htmlFor='surname'>Фамилия</label>
					<TextField
						id='surname'
						fullWidth
						variant='standard'
						error={errors.surname ? true : false}
						helperText={errors.surname ? 'Некорректная длина строки' : null}
						{...register('surname', { required: true, minLength: 2 })}
					/>
				</div>

				<div className={styles.inpt_box}>
					<label htmlFor='name'>Имя</label>
					<TextField
						id='name'
						fullWidth
						variant='standard'
						error={errors.name ? true : false}
						helperText={errors.name ? 'Некорректная длина строки' : null}
						{...register('name', { required: true, minLength: 2 })}
					/>
				</div>

				<div className={styles.inpt_box}>
					<label htmlFor='lastname'>Отчество</label>
					<TextField
						id='lastname'
						fullWidth
						variant='standard'
						error={errors.lastname ? true : false}
						helperText={errors.lastname ? 'Некорректная длина строки' : null}
						{...register('lastname', { required: true, minLength: 2 })}
					/>
				</div>

				<div className={styles.inpt_box}>
					<label htmlFor='email'>Email</label>
					<TextField
						id='email'
						fullWidth
						variant='standard'
						error={errors.email ? true : false}
						helperText={errors.email ? 'Некорректный email' : null}
						{...register('email', { required: true, pattern: EMAIL_REGEXP })}
					/>
				</div>

				<div className={styles.inpt_box}>
					<label htmlFor='userRole'>Роль</label>
					<Select
						id='userRole'
						variant='standard'
						defaultValue={RoleTypes.User}
						onChange={handleChangeUserRole}
					>
						<MenuItem value={RoleTypes.User}>Сотрудник</MenuItem>
						<MenuItem value={RoleTypes.Owner}>Владелец ЦФО</MenuItem>
						<MenuItem value={RoleTypes.Admin}>Администратор</MenuItem>
					</Select>
				</div>
			</div>

			<div className={styles.actions}>
				<input type='submit' value='Войти' className={styles.login_btn} />
			</div>
		</form>
	)
}
