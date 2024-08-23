import React, { useState } from 'react';
import './GeneralCFO.css';
import CreateTransferMasterUnit from '../../organisms/CreateTransferMasterUnit/CreateTransferMasterUnit';
import ConfirmTransferMasterUnit from '../../organisms/ConfirmTransferMasterUnit/ConfirmTransferMasterUnit';


export default function TransferMasterLayout() {
    const [confirmTransfer, setConfirmTransfer] = useState(false);

    return (
        <div className='cfo-transaction-card'>
            {!confirmTransfer ?
                <CreateTransferMasterUnit setConfirmTransfer={setConfirmTransfer} />
                :
                <ConfirmTransferMasterUnit setConfirmTransfer={setConfirmTransfer} />
            }
        </div >
    )
}
