import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(id, name, title, position, amount) {
    return { id, name, title, position, amount };
}

const rows = [
    createData(111, 'Иванов И.И.', 'Команда 20', 'Frontend', 40),
    createData(122, 'Петров П.П.', 'Команда 5', 'Backend', 50),
    createData(133, 'Васильев В.В.', 'Команда 10', 'Analyst', 60),
    createData(144, 'Сидоров В.В.', 'Команда 15', 'Q&A', 70),
    createData(155, 'Захаров З.Д.', 'Команда 25', 'Backend', 80),
    createData(166, 'ФИО', 'Название', 'Должность', 90),
    createData(177, 'ФИО', 'Название', 'Должность', 40),
    createData(188, 'ФИО', 'Название', 'Должность', 40),
    createData(199, 'ФИО', 'Название', 'Должность', 40),
    createData(211, 'ФИО', 'Название', 'Должность', 40),
    createData(222, 'ФИО', 'Название', 'Должность', 40),
];


export default function CFOOwnerTable() {
    const container = {
        width: '100%',
        backgroundColor: 'var(--light-gray)',
        borderRadius: 'var(--card-radius)',
        maxHeight: '80vh'
    }

    return (
        <TableContainer style={container}>
            <Table aria-label="Таблица показателей всех ЦФО">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { borderColor: '#000' } }}>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>ID</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>ФИО участника</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Команда</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Должность</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Выделеная сумма</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.id}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.name}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.title}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.position}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
