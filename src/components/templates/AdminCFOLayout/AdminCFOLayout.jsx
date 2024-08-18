import React from 'react';
import styles from './AdminCFOLayout.module.css';


export default function AdminCFOLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.manage}>Manage</div>

      <div className={styles.content}>CFO</div>
    </div>
  )
}
