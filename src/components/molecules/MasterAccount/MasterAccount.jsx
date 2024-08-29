import React, { useEffect, useState } from 'react';
import styles from './MasterAccount.module.css';
import cover from '../../../assets/master-acc.svg';
import coin from '../../../assets/white_coin.svg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { hideAccNumber } from '../../../hooks/hideAccNumber';
import { useGetQuery } from '../../../store/slices/apiSlice';
import { updateMasterBalance } from '../../../store/slices/adminSlice';


export default function MasterAccount() {
    const [visible, setVisible] = useState(false);
    const { master_acc_balance, master_acc_number } = useSelector(state => state.admin);
    const hideNumber = master_acc_number ? hideAccNumber(master_acc_number) : '';

    const masterEP = useSelector((state) => state.endpoints.master_data);
    const [currentBalance, setCurrentBalance] = useState();
    const dispatch = useDispatch();


    /*----- pooling -----*/
    let { data: currentData } = useGetQuery(masterEP, {
        pollingInterval: 2000,
        skipPollingIfUnfocused: true,
    });

    /*----- update store if balance change -----*/
    function updateStore() {
        dispatch(updateMasterBalance({
            master_acc_balance: currentData.amount,
        }))
    }

    /*----- check pooling result -----*/
    useEffect(() => {
        if (!!currentData) {
            setCurrentBalance(currentData.amount)
            if (master_acc_balance !== currentData.amount) updateStore()
        }
    }, [currentData]);




    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <p className={styles.balance}>Баланс</p>
                <div className={styles.coin}>
                    {currentBalance ?
                        <p className={styles.amount}>{parseInt(currentBalance).toLocaleString()}</p>
                        : <p className={styles.amount}>{parseInt(master_acc_balance).toLocaleString()}</p>
                    }
                    <img src={coin} alt='coin' />
                </div>

                <div className={styles.acc_number}>
                    <p>Мастер счет</p>

                    <div className={styles.acc_nmbr}>
                        <p>{visible ? parseInt(master_acc_number).toLocaleString() : hideNumber}</p>
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
