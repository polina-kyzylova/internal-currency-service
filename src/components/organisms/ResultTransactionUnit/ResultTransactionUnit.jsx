import React from 'react';
import styles from './ResultTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import happy from '../../../assets/happy.svg';


export default function ResultTransactionUnit() {
    let { user } = useParams();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <img src={happy} alt='Success transaction' />
            <h2>Операция успешно выполнена!</h2>

            <button className={styles.return_btn} onClick={() => navigate(`/${user}`)}>На главную</button>
        </div>
    )
}
