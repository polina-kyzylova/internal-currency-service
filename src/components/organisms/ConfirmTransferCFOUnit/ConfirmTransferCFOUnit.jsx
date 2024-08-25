import React from 'react';
import styles from './ConfirmTransferCFOUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import '../GeneralOperations.css';
import WestIcon from '@mui/icons-material/West';

import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';



export default function ConfirmTransferCFOUnit({ setConfirmTransfer }) {
  const navigate = useNavigate();
  const [data, setData] = useOutletContext();

  function chooseRecipient() {
    if (data.recip_type === 'personal') {
      return (
        <UserInfoTable
          title='Получатель'
          acc={data.target_user_acc}
          name={data.target_user_surname + ' ' + data.target_user_name + ' ' + data.target_user_lastname}
          username={data.target_user_username}
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

        <CFOInfoTable
          title='Отправитель'
          acc_number={parseInt(data.sender_number).toLocaleString()}
          acc_owner={data.sender_owner}
          acc_title={data.sender_title}
        />

        {chooseRecipient()}

        <OperationTypeTable
          operation_type='Распределение средств ЦФО'
          amount={data.amount}
          message={data.message}
        />
      </div>


      <button className='operations-next-btn' onClick={() => navigate('../result')}>Перевести</button>
    </div>
  )
}
