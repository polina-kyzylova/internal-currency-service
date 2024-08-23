import React from 'react';
import styles from './ConfirmTransferMasterUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import '../GeneralOperations.css';
import WestIcon from '@mui/icons-material/West';

import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import MasterInfoTable from '../../molecules/ConfirmForm/MasterInfoTable';


export default function ConfirmTransferMasterUnit({ setConfirmTransfer }) {
    const navigate = useNavigate();
    const [data, setData] = useOutletContext();

    function chooseRecipient() {
        if (data.recip_type === 'personal') {
            return (
                <UserInfoTable
                    title='Получатель'
                    user_acc='321'
                    user_name={data.user_name}
                    user_phone={data.user_phone}
                />)
        } else {
            return (
                <CFOInfoTable
                    title='Получатель'
                    acc_number='123'
                    acc_owner={data.recip_cfo_owner}
                    acc_title={data.recip_cfo_title}
                />
            )
        }
    }


    return (
        <div className={styles.container}>
            <button className='operations-prev-btn' onClick={() => setConfirmTransfer(false)}>
                <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
            </button>


            <div className={styles.content}>
                <h1>Подтверждение операции</h1>

                <MasterInfoTable
                    title='Отправитель'
                    acc_number={parseInt(data.sender_number).toLocaleString()}
                    admin={data.sender_name}
                />

                {chooseRecipient()}

                <OperationTypeTable
                    operation_type='Распределение средств Мастер-счета'
                    amount={data.amount}
                    message={data.message}
                />
            </div>


            <button className='operations-next-btn' onClick={() => navigate('../result')}>Перевести</button>
        </div>
    )
}
