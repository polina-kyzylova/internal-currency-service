import React from 'react';
import styles from './TransactionPage.module.css';
import { Outlet } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';


export default function TransactionPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button className={styles.btn} onClick={() => window.history.back()}>
                    <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
                </button>

                <Outlet />
            </div>
        </div>
    )
}
