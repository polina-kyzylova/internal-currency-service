import React, { useEffect, useState } from 'react';
import styles from './UserMoneyAcc.module.css';
import cover from '../../../assets/user-cover.png';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function UserMoneyAcc() {
    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState('111111111111');
    const [hideNumber, setHideNumber] = useState('');

    useEffect(() => {
        let numbers = number.replace(number.slice(0, number.length - 4), '*'.repeat(number.length - 4));
        setHideNumber(numbers);
    }, [number])


    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <p className={styles.balance}>Баланс</p>
                <p className={styles.amount}>360</p>

                <div className={styles.acc_number}>
                    <p>Счет {visible ? number : hideNumber}</p>
                    {visible ?
                        <VisibilityIcon sx={{fontSize: 30, cursor: 'pointer'}} onClick={() => setVisible(false)} /> :
                        <VisibilityOffIcon sx={{fontSize: 30, cursor: 'pointer'}} onClick={() => setVisible(true)} />
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
