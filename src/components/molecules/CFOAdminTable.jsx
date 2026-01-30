import React, { useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { formatSum } from '../../utils/formatSum'

const container = {
	width: '100%',
	backgroundColor: 'var(--light-gray)',
	borderRadius: 'var(--card-radius)',
	maxHeight: '80vh',
}

const titleStyle = { fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }
const textStyle = { fontSize: '1rem' }

export default function CFOAdminTable({ teamList, totalData }) {
	const createTableRows = (users) => {
		const totalRow = {
			id: 'total',
			name: 'Все ЦФО',
			owner: '',
			balance: formatSum(totalData?.totalBalance),
			income: `+ ${formatSum(totalData?.totalIcome)}`,
			expenses: `- ${formatSum(totalData?.totalExpenses)}`,
		}

		const formattedUsers = users?.map((user) => ({
			...user,
			balance: formatSum(user?.balance),
			income: `+ ${formatSum(user?.income)}`,
			expenses: `- ${formatSum(user?.expenses)}`,
		}))

		return [totalRow, ...formattedUsers]
	}

	const tableRows = useMemo(() => createTableRows(teamList), [teamList])

	return (
		<TableContainer style={container}>
			<Table aria-label='Таблица показателей всех ЦФО'>
				<TableHead>
					<TableRow sx={{ '&:last-child td, &:last-child th': { borderColor: '#000' } }}>
						<TableCell sx={titleStyle}>Название</TableCell>
						<TableCell sx={titleStyle}>Владелец</TableCell>
						<TableCell sx={titleStyle}>Баланс</TableCell>
						<TableCell sx={titleStyle}>Поступления</TableCell>
						<TableCell sx={titleStyle}>Расходы</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{tableRows?.map((row) => {
						const isTotal = row?.id === 'total'
						return (
							<TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.name}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.owner}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.balance}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.income}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.expenses}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
