import React from 'react';
import styles from './ConfirmTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import '../GeneralOperations.css';
import WestIcon from '@mui/icons-material/West';
import { useSelector } from 'react-redux';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable';



export default function ConfirmTransactionUnit({ setCreating }) {
  const navigate = useNavigate();
  const [data, setData] = useOutletContext();
  const user = useSelector(state => state.user);

  /*----- confirm transaction -----*/
  const transactionEP = useSelector((state) => state.endpoints.transactions_hist);
  const [makeTrans, { isLoading: transLoading }] = usePostQueryMutation();

  const makeTransaction = async () => {
    let transData = {
      "from_account_number": user.personal_acc_number,
      "to_account_number": data.target_user_acc,
      "amount": data.amount,
      "payment_purpose_id": data.purpose_id,
      "payment_comment": data.purpose_message,
    }

    const response = await makeTrans({ endpoint: transactionEP, body: transData })

    if (!!response.data) {
      navigate('result/ok')
    } else {
      navigate('result/error')
    }
  }


  if (transLoading) return <Loader />
  else return (
    <div className={styles.container}>
      <button className='operations-prev-btn' onClick={() => setCreating(true)}>
        <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
      </button>

      <div className={styles.content}>
        <h1>Подтверждение операции</h1>

        <UserInfoTable
          title='Отправитель'
          acc={user.personal_acc_number}
          name={user.surname + ' ' + user.name + ' ' + user.last_name}
          username={user.username}
        />

        <UserInfoTable
          title='Получатель'
          acc={data.target_user_acc}
          name={data.target_user_surname + ' ' + data.target_user_name + ' ' + data.target_user_lastname}
          username={data.target_user_username}
        />

        <OperationTypeTable
          operation_type='Перевод на счет пользователя'
          amount={data.amount}
          message={data.purpose_message}
        />
      </div>

      <button className='operations-next-btn' onClick={() => makeTransaction()}>Перевести</button>
    </div>
  )
}
