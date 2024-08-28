import React from 'react';
import styles from './ConfirmTransferCFOUnit.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { useCfoTransferQueryMutation } from '../../../store/slices/apiSlice';

import '../GeneralOperations.css';
import WestIcon from '@mui/icons-material/West';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import Loader from '../../atoms/Loader';



export default function ConfirmTransferCFOUnit({ setConfirmTransfer }) {
  const navigate = useNavigate();
  const [data, setData] = useOutletContext();
  const { cfo_id } = useParams()


  /*----- confirm recipient type -----*/
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
          acc_number={parseInt(data.recip_cfo_number).toLocaleString()}
          acc_owner={data.recip_cfo_owner}
          acc_title={data.recip_cfo_title}
        />
      )
    }
  }


  /*----- confirm transaction -----*/
  const [transferCFO, { isLoading: transferLoading }] = useCfoTransferQueryMutation();

  const makeTransaction = async () => {
    const bodyShape = {
      to_account_number: data.recip_type === 'personal' ? data.target_user_acc : data.recip_cfo_number,
      amount: data.amount,
      purpose_id: data.purpose_id,
      payment_comment: data.purpose_message,
    }
    const result = await transferCFO({
      id: cfo_id,
      body: bodyShape
    });
    console.log(bodyShape)

    if (!!result.data) {
      if (data.current_user === 'admin') navigate('../result/ok')
      if (data.current_user === 'owner') navigate('result/ok')
    } else {
      if (data.current_user === 'admin') navigate('../result/error')
      if (data.current_user === 'owner') navigate('result/error')
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

        <CFOInfoTable
          title='Отправитель'
          acc_number={parseInt(data.current_cfo_number).toLocaleString()}
          acc_owner={data.current_cfo_owner}
          acc_title={data.current_cfo_title}
        />

        {chooseRecipient()}

        <OperationTypeTable
          operation_type='Распределение средств ЦФО'
          amount={data.amount}
          message={data.purpose_message}
        />
      </div>

      <button className='operations-next-btn' onClick={() => makeTransaction()}>Перевести</button>
    </div>
  )
}
