import React from 'react';
import styles from './HomePage.module.css';
import ControlUnit from '../../molecules/ControlUnit';
import UserAccLayout from '../../templates/UserAccLayout/UserAccLayout';
import SideMenu from '../../molecules/SideMenu/SideMenu';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Иван Иванов</h2>
        <ControlUnit />
      </div>

      <div className={styles.side_menu}>
        <SideMenu />
      </div>

      <div className={styles.content}>
        <UserAccLayout />
      </div>
    </div>
  )
}

