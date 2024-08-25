import React from 'react';
import styles from './ConfirmTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import '../GeneralOperations.css';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WestIcon from '@mui/icons-material/West';
import { useSelector } from 'react-redux';
import { amountLiter } from '../../../hooks/amountLiter';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';
import OperationTypeTable from '../../molecules/ConfirmForm/OperationTypeTable';
import UserInfoTable from '../../molecules/ConfirmForm/UserInfoTable';



export default function ConfirmTransactionUnit({ setCreating }) {
  const navigate = useNavigate();
  const [data, setData] = useOutletContext();
  const user = useSelector(state => state.user);

  const transactionEP = useSelector((state) => state.endpoints.transactions_hist);
  const [makeTrans, { isLoading: transLoading }] = usePostQueryMutation();


  const makeTransaction = async () => {
    // дернуть апи для снятия денег
    // диспатч снять деьнги со счета + запросить новый баланс?
    // проверить статус операции и перенаправить куда надо

    let transData = {
      "account_number": data.target_user_acc,
      "amount": data.amount,
    }
    const response = await makeTrans({ endpoint: transactionEP, body: transData })
    console.log(response)

    //navigate('result')
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
          message={data.message}
        />
      </div>

      <button className='operations-next-btn' onClick={() => makeTransaction()}>Перевести</button>
    </div>
  )
}
