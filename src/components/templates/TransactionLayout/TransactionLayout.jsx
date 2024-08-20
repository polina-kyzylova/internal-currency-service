import React, { useState } from 'react';
import styles from './TransactionLayout.module.css';
import CreateTransactionUnit from '../../organisms/CreateTransactionUnit/CreateTransactionUnit';
import ConfirmTransactionUnit from '../../organisms/ConfirmTransactionUnit/ConfirmTransactionUnit';


export default function TransactionLayout() {
    const [creating, setCreating] = useState(true);

    return (
        <div className={styles.card}>
            {creating ? <CreateTransactionUnit setCreating={setCreating} /> : <ConfirmTransactionUnit setCreating={setCreating} />}
        </div>
    )
}
