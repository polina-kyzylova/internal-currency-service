import React from 'react';
import styles from './ResultTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import happy from '../../../assets/happy.svg';
import sad from '../../../assets/sad.svg';


export default function ResultTransactionUnit() {
    let { user, status } = useParams();
    const navigate = useNavigate();

    if (status === 'ok') {
        return (
            <div className={styles.container}>
                <img src={happy} alt='Success transaction' />
                <h2>Операция успешно выполнена!</h2>

                <button className={styles.return_btn} onClick={() => navigate(`/${user}`)}>На главную</button>
            </div>
        )
    } else {
        return (
            <div className={styles.sad_container}>
                <img src={sad} alt='Error transaction' />
                <h2>Ошибка! Повторите операцию позже</h2>

                <button className={styles.return_btn} onClick={() => navigate(`/${user}`)}>На главную</button>
            </div>
        )
    }
}
