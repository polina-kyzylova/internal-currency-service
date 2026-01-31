import React from 'react'
import './ConfirmItemStyles.css'
import { formatSum } from '../../../utils/formatSum'

export default function UserInfoTable({ title, acc, name, username }) {
	return (
		<div className='confirm-form-box'>
			<h3 className='confirm-form-label'>{title}</h3>

			<table className='confirm-form-table'>
				<tbody>
					<tr>
						<td className='confirm-form-table-mark'>ФИО:</td>
						<td className='confirm-form-space'></td>
						<th className='confirm-form-table-description'>{name}</th>
					</tr>
					<tr>
						<td className='confirm-form-table-mark'>Счет:</td>
						<td className='confirm-form-space'></td>
						<th className='confirm-form-table-description'>{formatSum(acc)}</th>
					</tr>
					<tr>
						<td className='confirm-form-table-mark'>Username:</td>
						<td className='confirm-form-space'></td>
						<th className='confirm-form-table-description'>{username}</th>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
