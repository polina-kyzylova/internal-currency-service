import React, { useState } from 'react'
import './TransactionItemStyles.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import CircularProgress from '@mui/material/CircularProgress'
import { EMPLOYEE_LIST } from '../../../mocks/mockData'

export default function UsersAutoList({ errors, register, title, setValue, getValues }) {
	const [open, setOpen] = useState(false)
	const loading = open && EMPLOYEE_LIST?.length === 0

	return (
		<div className='transaction-form-input-box'>
			<label className='transaction-form-label' htmlFor='recipient'>
				{title}
			</label>

			<Autocomplete
				id='recipient'
				fullWidth
				options={EMPLOYEE_LIST}
				autoHighlight
				getOptionLabel={(option) => `${option?.surname} ${option?.name} ${option?.lastname}`}
				onChange={(event, newValue) => {
					if (newValue) {
						setValue('target_user_username', newValue?.username)
						setValue('target_user_name', newValue?.name)
						setValue('target_user_lastname', newValue?.lastname)
						setValue('target_user_surname', newValue?.surname)
						setValue('target_user_acc', newValue?.account_number)

						setValue('target_user_email', newValue?.email)
						setValue('target_user_position', newValue?.position)
						setValue('target_user_department', newValue?.department)
						setValue('target_user_full_name', newValue?.full_name)
						setValue('target_user_short_name', newValue?.short_name)
					}
				}}
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				isOptionEqualToValue={(option, value) => option?.title === value?.title}
				loading={loading}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props
					return (
						<Box key={key} component='li' {...optionProps}>
							<Avatar sx={{ backgroundColor: 'var(--dark-gray)', marginRight: '1rem' }}>
								<PersonIcon sx={{ color: '#fff', fontSize: 20 }} />
							</Avatar>
							<div className='transaction-target-user-container'>
								<p className='transaction-target-username'>{option?.username}</p>
								<p className='transaction-target-user'>
									{option?.surname} {option?.name} {option?.lastname}
								</p>
							</div>
						</Box>
					)
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						inputProps={{ ...params?.inputProps }}
						variant='standard'
						error={errors.target_user ? true : false}
						{...register('target_user', { required: true })}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? <CircularProgress color='inherit' size={20} /> : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</div>
	)
}
