import React from 'react';
import styles from './HomePage.module.css';

import ControlUnit from '../../molecules/ControlUnit';
import UserAccLayout from '../../templates/UserAccLayout/UserAccLayout';


export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Иван Иванов</h2>
        <ControlUnit />
      </div>

      <div className={styles.side_menu}>
      </div>

      <div className={styles.content}>
        <UserAccLayout />
      </div>
    </div>
  )
}




/*
      <div className={styles.header}>
        <h2>Иван Иванов</h2>
        <ControlUnit />
      </div>


          <div className={styles.container}>
      <div className={styles.side_menu}>
      </div>

      <div className={styles.header}>
      </div>

      <div className={styles.content}>
      </div>
    </div>
*/