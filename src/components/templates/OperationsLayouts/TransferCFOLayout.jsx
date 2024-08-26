import React, { useState } from 'react';
import './GeneralCFO.css';
import CreateTransferCFOUnit from '../../organisms/CreateTransferCFOUnit/CreateTransferCFOUnit';
import ConfirmTransferCFOUnit from '../../organisms/ConfirmTransferCFOUnit/ConfirmTransferCFOUnit';


export default function TransferCFOLayout({ current_user }) {
  const [confirmTransfer, setConfirmTransfer] = useState(false);

  return (
    <div className='cfo-transaction-card'>
      {!confirmTransfer ?
        <CreateTransferCFOUnit setConfirmTransfer={setConfirmTransfer} current_user={current_user} />
        :
        <ConfirmTransferCFOUnit setConfirmTransfer={setConfirmTransfer} />
      }
    </div >
  )
}
