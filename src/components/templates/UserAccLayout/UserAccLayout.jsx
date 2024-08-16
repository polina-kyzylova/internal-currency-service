import React from 'react';
import styles from './UserAccLayout.module.css';
import UserMoneyUnit from '../../organisms/UserMoneyUnit/UserMoneyUnit';
import UserAnalyticsUnit from '../../organisms/UserAnalyticsUnit/UserAnalyticsUnit';


export default function UserAccLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.analys}>
        <div className={styles.period}>
          <p>Период</p>
        </div>

        <div className={styles.content}>
          <UserAnalyticsUnit />
          <UserAnalyticsUnit />
        </div>
      </div>

      <UserMoneyUnit />
    </div>
  )
}
