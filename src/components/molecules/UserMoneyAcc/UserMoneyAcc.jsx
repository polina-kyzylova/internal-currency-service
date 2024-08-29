import React, { useEffect, useState } from 'react';
import styles from './UserMoneyAcc.module.css';
import cover from '../../../assets/user-acc.svg';
import coin from '../../../assets/white_coin.svg'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { hideAccNumber } from '../../../hooks/hideAccNumber';

import { updateUserBalance } from '../../../store/slices/userSlice';
import { useGetQuery } from '../../../store/slices/apiSlice';



export default function UserMoneyAcc() {
    const [visible, setVisible] = useState(false);
    const { personal_acc_number, personal_acc_balance } = useSelector(state => state.user);
    const hideNumber = personal_acc_number ? hideAccNumber(personal_acc_number) : '';

    const userDataEP = useSelector((state) => state.endpoints.user_data);
    const [currentBalance, setCurrentBalance] = useState();
    const dispatch = useDispatch();

    /*----- pooling -----*/
    let { data: currentData } = useGetQuery(userDataEP, {
        pollingInterval: 2000,
        skipPollingIfUnfocused: true,
    });

    /*----- update store if balance change -----*/
    function updateStore() {
        dispatch(updateUserBalance({
            personal_acc_balance: currentData.account_balance,
        }))
    }

    /*----- check pooling result -----*/
    useEffect(() => {
        if (!!currentData) {
            setCurrentBalance(currentData.account_balance)
            if (personal_acc_balance !== currentData.account_balance) updateStore()
        }
    }, [currentData]);




    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <p className={styles.balance}>Баланс</p>
                <div className={styles.coin}>
                    {currentBalance ?
                        <p className={styles.amount}>{parseInt(currentBalance).toLocaleString()}</p>
                        : <p className={styles.amount}>{parseInt(personal_acc_balance).toLocaleString()}</p>
                    }
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
