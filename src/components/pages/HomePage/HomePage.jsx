import React from 'react';
import styles from './HomePage.module.css';
import ControlUnit from '../../molecules/ControlUnit';
import UserAccLayout from '../../templates/UserAccLayout/UserAccLayout';
import SideMenu from '../../molecules/SideMenu/SideMenu';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';


export default function HomePage() {
  const { name, surname } = useSelector(state => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.mobile_items}>
          <MenuIcon />
        </div>

        <h2 className={styles.user}>{name} {surname}</h2>
        <ControlUnit />
      </div>

      <div className={styles.mobile_items}>
        <div className={styles.header}>
          <h2>{name} {surname}</h2>
        </div>
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

