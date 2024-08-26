import React, { useEffect, useState } from 'react';
import styles from './AdminCFOLayout.module.css';
import CFOCard from '../../molecules/CFOCard/CFOCard';
import { useNavigate } from 'react-router-dom';
import { useGetQuery } from '../../../store/slices/apiSlice';



export default function AdminCFOLayout() {
  const navigate = useNavigate();

  const [cfoListSize, setCFOListSize] = useState(10);
  const [allTeamCFO, setAllTeamCFO] = useState([]);
  const [allServiceCFO, setAllServiceCFO] = useState([]);

  /*----- pooling -----*/
  let { data: allTeamCFOList, isSuccess: teamSuccess } = useGetQuery(`/fsc?fscType=TEAM&page=1&size=${cfoListSize}`, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });

  let { data: allServiceCFOList, isSuccess: serviceSuccess } = useGetQuery(`/fsc?fscType=STORE&page=1&size=${cfoListSize}`, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });


  /*----- check pooling result -----*/
  useEffect(() => {
    if (teamSuccess) setAllTeamCFO(allTeamCFOList.data)
    if (serviceSuccess) setAllServiceCFO(allServiceCFOList.data)
    console.log(allTeamCFOList.data)
  }, [allTeamCFOList, allServiceCFOList]);


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
            {!!allServiceCFOList ?
              allServiceCFO.map(item => {
                return <CFOCard
                  key={item.id}
                  cfo_id={item.id}
                  balance={item.account_balance.toLocaleString()}
                  title={item.name}
                  owner_name={item.owner_name}
                  owner_lastname={item.owner_lastname}
                  owner_surname={item.owner_surname}
                />
              }) :
              <p className={styles.dis_cfo}>Нет активных ЦФО</p>
            }
          </div>
        </div>

        <div className={styles.cfo}>
          <h3>ЦФО</h3>

          <div className={styles.cards}>
            {!!allTeamCFOList ?
              allTeamCFO.map(item => {
                return <CFOCard
                  key={item.id}
                  cfo_id={item.id}
                  balance={item.account_balance.toLocaleString()}
                  title={item.name}
                  owner_name={item.owner_name}
                  owner_lastname={item.owner_lastname}
                  owner_surname={item.owner_surname}
                />
              }) :
              <p className={styles.dis_cfo}>Нет активных ЦФО</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
