import React from 'react';
import styles from './ConfirmTransferMasterUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { usePostQueryMutation } from '../../../store/slices/apiSlice';

import '../GeneralOperations.css';
import WestIcon from '@mui/icons-material/West';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import MasterInfoTable from '../../molecules/ConfirmForm/MasterInfoTable';
import Loader from '../../atoms/Loader';
import { useSelector } from 'react-redux';


export default function ConfirmTransferMasterUnit({ setConfirmTransfer }) {
    const navigate = useNavigate();
    const [data, setData] = useOutletContext();


    /*----- confirm transaction -----*/
    const transactionEP = useSelector((state) => state.endpoints.replenish_cfo);
    const [replenishCFO, { isLoading: transferLoading }] = usePostQueryMutation();

    const makeTransaction = async () => {
        let repBody = {
            "id": data.cfo_id,
            "amount": data.amount
        }
        const result = await replenishCFO({ endpoint: transactionEP, body: repBody })

        if (!!result.data) {
            navigate('result/ok')
        } else {
            navigate('result/error')
        }
    }


    if (transferLoading) return <Loader />
    else return (
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

                <CFOInfoTable
                    title='Получатель'
                    acc_number={parseInt(data.recip_cfo_number).toLocaleString()}
                    acc_owner={data.recip_cfo_owner}
                    acc_title={data.recip_cfo_title}
                />

                <OperationTypeTable
                    operation_type='Распределение средств Мастер-счета'
                    amount={data.amount}
                    message={data.purpose_message}
                />
            </div>

            <button className='operations-next-btn' onClick={() => makeTransaction()}>Перевести</button>
        </div>
    )
}
