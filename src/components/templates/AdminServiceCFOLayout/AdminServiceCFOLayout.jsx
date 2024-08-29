import React from 'react';
import styles from './AdminServiceCFOLayout.module.css';
import { useNavigate } from 'react-router-dom';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';


export default function AdminServiceCFOLayout({ cfo_balance, cfo_number }) {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <div className={styles.connections}>Нет подключений</div>

      <div className={styles.box}>
        <CFOAccount
          cfo_balance={cfo_balance}
          cfo_number={cfo_number}
        />

        <div className={styles.buttons_box}>
          <button className={styles.manage_btn}>Подключить сервис</button>
          <button className={styles.manage_btn} onClick={() => navigate('change-owner')}>Сменить владельца</button>
        </div>
      </div>
    </div>
  )
}
