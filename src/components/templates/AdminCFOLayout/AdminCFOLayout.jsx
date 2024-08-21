import React from 'react';
import styles from './AdminCFOLayout.module.css';
import CFOCard from '../../molecules/CFOCard/CFOCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function AdminCFOLayout() {
  const cfo = useSelector(state => state.adminCFO);
  const service_cfo = useSelector(state => state.adminServCFO);
  const navigate = useNavigate();


  return (
    <div className={styles.container}>
      <div className={styles.manage}>
        <button
          className={styles.create_btn}
          onClick={() => navigate('/admin/create-cfo')}
        >Создать ЦФО
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.cfo}>
          <h3>ЦФО сервисов</h3>

          <div className={styles.cards}>
            {
              service_cfo.map(item => {
                return <CFOCard
                  key={item.cfo_id}
                  cfo_id={item.cfo_id}
                  balance={item.cfo_acc_balance.toLocaleString()}
                  title={item.title}
                  owner_name={item.owner_name}
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
                  cfo_id={item.cfo_id}
                  balance={item.cfo_acc_balance.toLocaleString()}
                  title={item.title}
                  owner_name={item.owner_name}
                />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
