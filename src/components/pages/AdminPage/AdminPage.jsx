import React, { useState } from 'react';
import styles from './AdminPage.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ControlUnit from '../../molecules/ControlUnit';
import SideMenu from '../../molecules/SideMenu/SideMenu';


export default function AdminPage() {
  let number = window.location.href.split("/").pop();
  const [active, setActive] = useState(number);
  const navigate = useNavigate();


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user_info}>
          <h2>Иван Иванов</h2>
          <span className={styles.badge}>
            <p>Администратор</p>
          </span>
        </div>

        <ControlUnit />
      </div>

      <div className={styles.side_menu}>
        <SideMenu />
      </div>

      <div className={styles.content}>
        <div className={styles.nav_container}>
          <div className={styles.navigation}>
            <button
              className={active === 'budget' ? styles.nav_btn_active : styles.nav_btn}
              onClick={() => {
                setActive('budget')
                navigate('./budget')
              }}>
              Бюджет
            </button>

            <button
              className={active === 'cfo' ? styles.nav_btn_active : styles.nav_btn}
              onClick={() => {
                setActive('cfo')
                navigate('./cfo')
              }}>
              ЦФО
            </button>

            <button
              className={active === 'personal' ? styles.nav_btn_active : styles.nav_btn}
              onClick={() => {
                setActive('personal')
                navigate('./personal')
              }}>
              Мои финансы
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
