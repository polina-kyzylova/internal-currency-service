import React from 'react';
import styles from './ConfirmReplenishCFOUnit.module.css';
import '../GeneralOperations.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import WestIcon from '@mui/icons-material/West';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import MasterInfotable from '../../molecules/ConfirmForm/MasterInfoTable';

import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';
import Loader from '../../atoms/Loader';


export default function ConfirmReplenishCFOUnit({ setConfirmReplenish }) {
    const navigate = useNavigate();
    const [data, setData] = useOutletContext();

    const transactionEP = useSelector((state) => state.endpoints.replenish_cfo);
    const [replenishCFO, { isLoading: transLoading }] = usePostQueryMutation();

    const replenish = async () => {
        let repBody = {
            "id": data.cfo_id,
            "amount": data.amount
        }
        const result = await replenishCFO({ endpoint: transactionEP, body: repBody })

        if (!!result.data) navigate('../result/ok')
        else navigate('../result/error')
    }


    if (transLoading) return <Loader />
    return (
        <div className={styles.container}>
            <button className='operations-prev-btn' onClick={() => setConfirmReplenish(false)}>
                <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
            </button>

            <div className={styles.content}>
                <h1>Подтверждение операции</h1>

                <MasterInfotable
                    title='Счет списания'
                    acc_number={parseInt(data.master_acc).toLocaleString()}
                    admin={data.sender_name}
                />

                <CFOInfoTable
                    title='Счет зачисления'
                    acc_number={parseInt(data.cfo_number).toLocaleString()}
                    acc_owner={data.cfo_owner}
                    acc_title={data.cfo_title}
                />

                <OperationTypeTable
                    operation_type='Пополнение ЦФО'
                    amount={data.amount}
                />
            </div>

            <button className='operations-next-btn' onClick={() => replenish()}>Перевести</button>
        </div>
    )
}
