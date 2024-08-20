import React, { useState } from 'react';
import styles from './TransactionPage.module.css';
import { Outlet } from 'react-router-dom';


export default function TransactionPage() {
    const [transaction, setTransaction] = useState();
    
    return (
        <div className={styles.container}>
            <Outlet context={[transaction, setTransaction]} />
        </div>
    )
}
