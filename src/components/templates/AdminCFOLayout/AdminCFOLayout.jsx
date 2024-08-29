import React from 'react';
import styles from './AdminCFOLayout.module.css';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import { useNavigate } from 'react-router-dom';


export default function AdminCFOLayout({ cfo_balance, cfo_number }) {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <CFOAccount
        cfo_balance={cfo_balance}
        cfo_number={cfo_number}
      />

      <div className={styles.buttons_box}>
        <button className={styles.manage_btn} onClick={() => navigate('change-owner')}>Сменить владельца</button>
        <button className={styles.manage_btn} onClick={() => navigate('transfer-cfo')}>Перевести</button>
        <button className={styles.manage_btn} onClick={() => navigate('replenish-cfo')}>Пополнить</button>
      </div>
    </div>
  )
}
