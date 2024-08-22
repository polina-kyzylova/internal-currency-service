import React from 'react';
import styles from './ConfirmReplenishCFOUnit.module.css';
import '../GeneralOperations.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import WestIcon from '@mui/icons-material/West';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import MasterInfotable from '../../molecules/ConfirmForm/MasterInfoTable';


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

                <MasterInfotable
                    title='Счет списания'
                    acc_number={parseInt(data.master_acc).toLocaleString()}
                    admin='fio'
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

            <button className='operations-next-btn' onClick={() => navigate('../result')}>Перевести</button>
        </div>
    )
}
