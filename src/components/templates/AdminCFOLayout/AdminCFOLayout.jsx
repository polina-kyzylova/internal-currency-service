import React from 'react';
import styles from './AdminCFOLayout.module.css';
import CFOCard from '../../molecules/CFOCard/CFOCard';


export default function AdminCFOLayout() {
  const cfo = [
    {
      balance: 1590,
      title: 'Петров П.П.',
      cfo_id: '11111',
    },
    {
      balance: 1590,
      title: 'Петров П.П.',
      cfo_id: '22222',
    },
    {
      balance: 3300,
      title: 'Сидоров Е.Е.',
      cfo_id: '33333',
    },
    {
      balance: 1750,
      title: 'Васильев В.В.',
      cfo_id: '44444',
    },
    {
      balance: 1590,
      title: 'Петров П.П.',
      cfo_id: '55555',
    },
  ]

  const service_cfo = [
    {
      balance: 17500,
      title: 'Активности',
      cfo_id: '44',
    },
    {
      balance: 12300,
      title: 'Магазин товаров',
      cfo_id: '55',
    },
    {
      balance: 17500,
      title: 'Поощрения',
      cfo_id: '66',
    },
    {
      balance: 11000,
      title: 'Дни рождения',
      cfo_id: '77',
    },
  ]


  return (
    <div className={styles.container}>
      <div className={styles.manage}>
        <button className={styles.create_btn}>Создать ЦФО</button>
      </div>

      <div className={styles.content}>
        <div className={styles.cfo}>
          <h3>ЦФО сервисов</h3>

          <div className={styles.cards}>
            {
              service_cfo.map(item => {
                return <CFOCard
                  key={item.cfo_id}
                  balance={item.balance.toLocaleString()}
                  title={item.title}
                  cfo_id={item.cfo_id}
                />
              })
            }
          </div>
        </div>

        <div className={styles.cfo}>
          <h3>ЦФО</h3>

          <div className={styles.cards}>
            {
              cfo.map(item => {
                return <CFOCard
                  key={item.cfo_id}
                  balance={item.balance.toLocaleString()}
                  title={item.title}
                  cfo_id={item.cfo_id}
                />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
