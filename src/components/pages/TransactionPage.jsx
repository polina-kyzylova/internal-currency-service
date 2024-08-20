import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';


export default function TransactionPage() {
    const [transaction, setTransaction] = useState();
    const styles = {
        minHeight: '96vh',
        margin: '2vh 16vw',
        display: 'grid',
    }

    return (
        <div style={styles}>
            <Outlet context={[transaction, setTransaction]} />
        </div>
    )
}
