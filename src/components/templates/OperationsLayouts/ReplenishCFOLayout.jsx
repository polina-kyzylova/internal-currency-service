import React, { useState } from 'react';
import './GeneralCFO.css';
import CreateReplenishCFOUnit from '../../organisms/CreateReplenishCFOUnit/CreateReplenishCFOUnit';
import ConfirmReplenishCFOUnit from '../../organisms/ConfirmReplenishCFOUnit/ConfirmReplenishCFOUnit';


export default function ReplenishCFOLayout() {
  const [confirmReplenish, setConfirmReplenish] = useState(false);

  return (
    <div className='cfo-transaction-card'>
      {!confirmReplenish ?
        <CreateReplenishCFOUnit setConfirmReplenish={setConfirmReplenish} />
        :
        <ConfirmReplenishCFOUnit setConfirmReplenish={setConfirmReplenish} />
      }
    </div >
  )
}
