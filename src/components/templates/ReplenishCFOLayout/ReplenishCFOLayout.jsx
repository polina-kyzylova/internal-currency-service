import React, { useState } from 'react';
import styles from './ReplenishCFOLayout.module.css';
import CreateReplenishCFOUnit from '../../organisms/CreateReplenishCFOUnit/CreateReplenishCFOUnit';
import ConfirmReplenishCFOUnit from '../../organisms/ConfirmReplenishCFOUnit/ConfirmReplenishCFOUnit';


export default function ReplenishCFOLayout() {
  const [confirmReplenish, setConfirmReplenish] = useState(false);

  return (
    <div className={styles.card}>
      {!confirmReplenish ?
        <CreateReplenishCFOUnit setConfirmReplenish={setConfirmReplenish} />
        :
        <ConfirmReplenishCFOUnit setConfirmReplenish={setConfirmReplenish} />
      }
    </div >
  )
}
