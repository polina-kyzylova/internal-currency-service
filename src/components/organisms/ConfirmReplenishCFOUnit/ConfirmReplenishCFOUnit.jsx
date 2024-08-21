import React from 'react';
import styles from './ConfirmReplenishCFOUnit.module.css';
import '../GeneralOperations.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import WestIcon from '@mui/icons-material/West';


export default function ConfirmReplenishCFOUnit({ setConfirmReplenish }) {
    const navigate = useNavigate();
    const [data, setData] = useOutletContext();


    return (
        <div className={styles.container}>
            <button className='operations-prev-btn' onClick={() => setConfirmReplenish(false)}>
                <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
            </button>

            <div className={styles.content}>
                <h1>Подтверждение операции</h1>

                <div className={styles.box}>
                    <h3>Счет списания</h3>

                    <div className={styles.information}>
                        <ul className={styles.info}>
                            <li>Мастер-счет:</li>
                            <li>Администратор:</li>
                        </ul>
                        <ul className={styles.info}>
                            <li>{parseInt(data.master_acc).toLocaleString()}</li>
                            <li>ФИО</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.box}>
                    <h3>Счет зачисления</h3>

                    <div className={styles.information}>
                        <ul className={styles.info}>
                            <li>Счет ЦФО:</li>
                            <li>Владелец ЦФО:</li>
                        </ul>
                        <ul className={styles.info}>
                            <li>{parseInt(data.cfo_acc).toLocaleString()}</li>
                            <li>ФИО</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.box}>
                    <h3>Операция</h3>

                    <div className={styles.information}>
                        <ul className={styles.info}>
                            <li>Тип операции:</li>
                            <li>Сумма:</li>
                        </ul>
                        <ul className={styles.info}>
                            <li>Пополнение ЦФО</li>
                            <li>{data.amount} коинов</li>
                        </ul>
                    </div>
                </div>
            </div>

            <button className='operations-next-btn' onClick={() => navigate('../result')}>Перевести</button>
        </div>
    )
}
