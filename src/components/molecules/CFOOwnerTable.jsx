import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useMemo } from 'react'

const container = {
	width: '100%',
	backgroundColor: 'var(--light-gray)',
	borderRadius: 'var(--card-radius)',
	maxHeight: '80vh',
}

const titleStyle = { fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }
const textStyle = { fontSize: '1rem' }

export default function CFOOwnerTable({ teamList, totalExpenses }) {
	const createTableRows = (users, total) => {
		const totalRow = {
			id: 'total',
			name: 'Все участники',
			position: '',
			team: '',
			expenses: `- ${total}`,
		}

		const formattedUsers = users?.map((user) => ({ ...user, expenses: `- ${user?.expenses}` }))
		return [totalRow, ...formattedUsers]
	}

	const tableRows = useMemo(
		() => createTableRows(teamList, totalExpenses),
		[teamList, totalExpenses]
	)

	return (
		<TableContainer style={container}>
			<Table aria-label='Таблица показателей участников ЦФО'>
				<TableHead>
					<TableRow sx={{ '&:last-child td, &:last-child th': { borderColor: '#000' } }}>
						<TableCell sx={titleStyle}>ФИО</TableCell>
						<TableCell sx={titleStyle}>Должность</TableCell>
						<TableCell sx={titleStyle}>Команда</TableCell>
						<TableCell sx={titleStyle}>Расходы</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{tableRows?.map((row) => {
						const isTotal = row?.id === 'total'
						return (
							<TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.name}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.position}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.team}</TableCell>
								<TableCell sx={isTotal ? titleStyle : textStyle}>{row?.expenses}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
