import React from 'react';
import styles from './UserMoneyUnit.module.css';
import UserMoneyAcc from '../../molecules/UserMoneyAcc/UserMoneyAcc';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import { useNavigate } from 'react-router-dom';


export default function UserMoneyUnit() {
  let user = window.location.href.split("/").pop();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <UserMoneyAcc />
      <button
        className={styles.transaction_btn}
        onClick={() => navigate(`/transaction/${user}`)}
      >
        Перевести
      </button>
      <OperationsAction label='История операций' />
    </div>
  )
}
