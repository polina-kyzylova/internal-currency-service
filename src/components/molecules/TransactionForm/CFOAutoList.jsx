import React, { useState } from 'react'
import './TransactionItemStyles.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { ADMIN_TEAM_LIST } from '../../../mocks/mockData'

export default function CFOAutoList({
	errors,
	register,
	title,
	setValue,
	getValues,
	current_cfo_number,
}) {
	const [open, setOpen] = useState(false)
	const loading = open && ADMIN_TEAM_LIST.length === 0

	return (
		<div className='transaction-form-input-box'>
			<label className='transaction-form-label' htmlFor='recipient'>
				{title}
			</label>

			<Autocomplete
				id='recipient'
				fullWidth
				options={ADMIN_TEAM_LIST}
				autoHighlight
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				getOptionLabel={(option) => option?.name}
				onChange={(event, newValue) => {
					if (newValue) {
						setValue('recip_cfo_owner_full_name', newValue?.owner_full_name)
						setValue('recip_cfo_owner', newValue?.owner)
						setValue('recip_cfo_number', newValue?.account_number)
						setValue('cfo_id', newValue?.id)
					}
				}}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props
					return (
						<Box key={key} component='li' {...optionProps}>
							<div className='transaction-target-user-container'>
								<p className='transaction-target-user'>{option?.name}</p>
								<p className='transaction-target-username'>Владелец: {option?.owner_full_name}</p>
							</div>
						</Box>
					)
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						inputProps={{ ...params.inputProps }}
						variant='standard'
						error={errors.recip_cfo_title ? true : false}
						{...register('recip_cfo_title', { required: true })}
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
