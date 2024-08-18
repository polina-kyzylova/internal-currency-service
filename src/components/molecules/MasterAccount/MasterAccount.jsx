import React, { useEffect, useState } from 'react';
import styles from './MasterAccount.module.css';
import cover from '../../../assets/master-acc.svg';
import coin from '../../../assets/white_coin.svg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function MasterAccount() {
    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState('555555555555');
    const [hideNumber, setHideNumber] = useState('');
    const balance = 79000;

    useEffect(() => {
        let numbers = number.replace(number.slice(0, number.length - 4), '*'.repeat(number.length - 4));
        setHideNumber(numbers);
    }, [number])


    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <p className={styles.balance}>Баланс</p>
                <div className={styles.coin}>
                    <p className={styles.amount}>{balance.toLocaleString()}</p>
                    <img src={coin} alt='coin' />
                </div>

                <div className={styles.acc_number}>
                    <p>Мастер счет</p>

                    <div className={styles.acc_nmbr}>
                        <p>{visible ? parseInt(number).toLocaleString() : hideNumber}</p>
                        {visible ?
                            <VisibilityIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={() => setVisible(false)} /> :
                            <VisibilityOffIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={() => setVisible(true)} />
                        }
                    </div>
                </div>
            </div>

            <img
                src={cover}
                alt='Master money account cover'
                className={styles.card_cover}
            />
        </div >
    )
}
