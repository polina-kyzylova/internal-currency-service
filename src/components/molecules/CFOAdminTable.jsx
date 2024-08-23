import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(id, title, amount, expenses, remains) {
    return { id, title, amount, expenses, remains };
}

const rows = [
    createData(111, 'Название/Владелец', 15, 11, 4),
    createData(122, 'Название/Владелец', 15, 11, 4),
    createData(133, 'Название/Владелец', 15, 11, 4),
    createData(144, 'Название/Владелец', 15, 11, 4),
    createData(155, 'Название/Владелец', 15, 11, 4),
    createData(166, 'Название/Владелец', 15, 11, 4),
    createData(177, 'Название/Владелец', 15, 11, 4),
    createData(188, 'Название/Владелец', 15, 11, 4),
    createData(199, 'Название/Владелец', 15, 11, 4),
    createData(211, 'Название/Владелец', 15, 11, 4),
    createData(222, 'Название/Владелец', 15, 11, 4),
    createData(233, 'Название/Владелец', 15, 11, 4),
    createData(244, 'Название/Владелец', 15, 11, 4),
];



export default function CFOAdminTable() {
    const container = {
        width: '100%',
        backgroundColor: 'var(--light-gray)',
        borderRadius: 'var(--card-radius)',
    }


    return (
        <TableContainer style={container}>
            <Table aria-label="Таблица показателей всех ЦФО">
                <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { borderColor: '#000' } }}>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>ID</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Название/Владелец</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Выделеная сумма</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Расходы за период</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'var(--lbl-bold-weight)' }}>Остаток</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.id}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.title}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.amount}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.expenses}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>{row.remains}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
