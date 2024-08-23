import React from 'react';
import styles from './AdminBudgetLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import MasterAccount from '../../molecules/MasterAccount/MasterAccount';

import CFOAdminTable from '../../molecules/CFOAdminTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useNavigate } from 'react-router-dom';


export default function AdminBudgetLayout() {
  const navigate = useNavigate();
  const all_cfo = [
    { label: 'A', value: 2400 },
    { label: 'B', value: 4567 },
    { label: 'C', value: 1398 },
    { label: 'D', value: 9800 },
    { label: 'E', value: 3908 },
    { label: 'F', value: 4800 },
    { label: 'G', value: 4800 },
    { label: 'H', value: 4800 },
  ];


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.oborot}>
          <h4>Оборот всех средств (Сумма балансов ЦФО + ЦФО сервисов - коины и рубли)</h4>
          <p>Оборот ЦФО (Сумма балансов ЦФО - коины и рубли)</p>
          <p>Оборот ЦФО сервисов (Сумма балансов ЦФО сервисов - коины и рубли)</p>
        </div>

        <div className={styles.operations}>
          <button className={styles.action_btn}>Пополнить</button>
          <button className={styles.action_btn} onClick={() => navigate('/admin/transfer-master')}>Перевести</button>
          <OperationsAction label='Шаблоны' />
          <OperationsAction label='История операций' />
        </div>

        <MasterAccount />
      </div>

      <div className={styles.analytics}>
        <h3>Аналитика по ЦФО</h3>

        <div className={styles.cfo_table}>
          <CFOAdminTable />
          <AdminAnalyticsUnit income={100000} expenses={21000} data={all_cfo} />
        </div>
      </div>
    </div>
  )
}
