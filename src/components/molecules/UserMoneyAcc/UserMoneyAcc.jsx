import React, { useState } from 'react';
import styles from './UserMoneyAcc.module.css';
import cover from '../../../assets/user-acc.svg';
import coin from '../../../assets/white_coin.svg'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import { hideAccNumber } from '../../../hooks/hideAccNumber';


export default function UserMoneyAcc() {
    const [visible, setVisible] = useState(false);
    const { personal_acc_number, personal_acc_balance } = useSelector(state => state.user);
    const hideNumber = hideAccNumber(personal_acc_number);


    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <p className={styles.balance}>Баланс</p>
                <div className={styles.coin}>
                    <p className={styles.amount}>{parseInt(personal_acc_balance).toLocaleString()}</p>
                    <img src={coin} alt='coin' />
                </div>

                <div className={styles.acc_number}>
                    <p>Счет {visible ? parseInt(personal_acc_number).toLocaleString() : hideNumber}</p>
                    {visible ?
                        <VisibilityIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={() => setVisible(false)} /> :
                        <VisibilityOffIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={() => setVisible(true)} />
                    }
                </div>
            </div>

            <img
                src={cover}
                alt='User money account cover'
                className={styles.card_cover}
            />
        </div>
    )
}
