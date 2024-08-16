import React from 'react';
import styles from './UserMoneyUnit.module.css';
import UserMoneyAcc from '../../molecules/UserMoneyAcc/UserMoneyAcc';
import OperationsHistory from '../../molecules/OperationsHistory/OperationsHistory';


export default function UserMoneyUnit() {
  return (
    <div className={styles.container}>
        <UserMoneyAcc />
        <button className={styles.transaction}>Перевести</button>
        <OperationsHistory />
    </div>
  )
}
