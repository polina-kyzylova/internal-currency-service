import React from 'react';
import styles from './TransactionAccInfo.module.css';
import coin from '../../../assets/black_coin.svg';


export default function TransactionAccInfo({ acc_type, acc_number, acc_balance }) {
    return (
        <div className={styles.inpt_box}>
            <p className={styles.acc_info}>
                {acc_type}: <span className={styles.money}>{parseInt(acc_number).toLocaleString()}</span>
            </p>

            <div className={styles.coin}>
                <p className={styles.acc_info}>
                    Баланс: <span className={styles.money}>{parseInt(acc_balance).toLocaleString()}</span>
                </p>
                <img src={coin} alt='coin' />
            </div>
        </div>
    )
}
