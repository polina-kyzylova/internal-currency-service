import React from 'react';
import styles from './ResultTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function ResultTransactionUnit() {
    let { user } = useParams();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <button onClick={() => navigate(`/${user}`)}>На главную</button>
        </div>
    )
}
