import { useState } from 'react'
import styles from './AuthLayout.module.css'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import { initUser } from '../../../store/slices/userSlice'
import AlertTitle from '@mui/material/AlertTitle'
import { Alert } from '@mui/material'
import { Snackbar } from '@mui/material'
import { setUserRole } from '../../../store/slices/userSlice'
import { EMAIL_REGEXP, RoleTypes } from '../../../shared/consts'

export const DemoLayout = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

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

	const onSubmit = async (userData) => {
		// TO DO - mock data
		dispatch(
			initUser({
				user_id: '111',
				surname: userData?.surname,
				name: userData?.name,
				last_name: userData?.lastname,
				email: userData?.email,
				personal_acc_number: '1000000001',
				personal_acc_balance: '333',
			})
		)

		dispatch(
			setUserRole({
				user_type: userData?.userRole,
			})
		)

		if (userData?.userRole === RoleTypes.User) navigate('/user')
		if (userData?.userRole === RoleTypes.Owner) navigate('/owner')
		if (userData?.userRole === RoleTypes.Admin) navigate('/admin')
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
						<MenuItem value={RoleTypes.User}>Пользователь</MenuItem>
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
