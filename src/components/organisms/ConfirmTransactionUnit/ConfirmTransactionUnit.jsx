import React from 'react';
import styles from './ConfirmTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WestIcon from '@mui/icons-material/West';



export default function ConfirmTransactionUnit({ setCreating }) {
  const navigate = useNavigate();
  const [data, setData] = useOutletContext();


  return (
    <div className={styles.container}>
      <button className={styles.previous_btn} onClick={() => setCreating(true)}>
        <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
      </button>


      <div className={styles.content}>
        <h1>Подтверждение операции</h1>

        <div className={styles.box}>
          <div className={styles.ava}>
            <Avatar sx={{ backgroundColor: 'var(--dark-gray)', marginRight: '1rem' }}>
              <PersonIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Avatar>
            <h3>Отправитель</h3>
          </div>

          <div className={styles.information}>
            <ul className={styles.info}>
              <li>ФИО:</li>
              <li>Счет:</li>
              <li>Телефон:</li>
            </ul>

            <ul className={styles.info}>
              <li>Иванов Иван Иванович</li>
              <li>111 111 111 111</li>
              <li>+71111111111</li>
            </ul>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.ava}>
            <Avatar sx={{ backgroundColor: 'var(--dark-gray)', marginRight: '1rem' }}>
              <PersonIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Avatar>
            <h3>Получатель</h3>
          </div>

          <div className={styles.information}>
            <ul className={styles.info}>
              <li>ФИО:</li>
              <li>Счет:</li>
              <li>Телефон:</li>
            </ul>

            <ul className={styles.info}>
              <li>Петров Петр Петрович</li>
              <li>222 222 222 222</li>
              <li>+{data.phone}</li>
            </ul>
          </div>
        </div>

        <div className={styles.box}>
          <h3>Операция</h3>

          <div className={styles.information}>
            <ul className={styles.info}>
              <li>Тип операции:</li>
              <li>Сумма:</li>
              <li>Сообщение:</li>
            </ul>

            <ul className={styles.info}>
              <li>Перевод на счет пользователя</li>
              <li>{data.amount} коинов</li>
              <li>{data.message}</li>
            </ul>
          </div>
        </div>
      </div>


      <button className={styles.next_btn} onClick={() => navigate('result')}>Перевести</button>
    </div>
  )
}
