import React from 'react';
import styles from './UserAccLayout.module.css';
import UserMoneyUnit from '../../organisms/UserMoneyUnit/UserMoneyUnit';
import UserAnalyticsUnit from '../../organisms/UserAnalyticsUnit/UserAnalyticsUnit';


export default function UserAccLayout() {
  const data1 = [
    { id: 0, value: 30, label: 'Категория A' },
    { id: 1, value: 15, label: 'Категория B' },
    { id: 2, value: 20, label: 'Категория C' },
    { id: 3, value: 25, label: 'Категория D' },
  ]

  const data2 = [
    { id: 0, value: 8, label: 'Категория A' },
    { id: 1, value: 12, label: 'Категория B' },
    { id: 2, value: 25, label: 'Категория C' },
    { id: 3, value: 80, label: 'Категория D' },
  ]


  return (
    <div className={styles.container}>
      <div className={styles.analys}>
        <div className={styles.period}>
          <p>Выбрать период</p>
        </div>

        <div className={styles.content}>
          <UserAnalyticsUnit label='Поступления' money='+500' data={data1} />
          <UserAnalyticsUnit label='Расходы' money='-140' data={data2} />
        </div>
      </div>

      <UserMoneyUnit />
    </div>
  )
}
