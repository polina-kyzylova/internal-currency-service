import React, { useEffect, useState } from 'react';
import styles from './AdminBudgetLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import MasterAccount from '../../molecules/MasterAccount/MasterAccount';
import CFOAdminTable from '../../molecules/CFOAdminTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useNavigate } from 'react-router-dom';
import DataModal from '../../molecules/DataModal/DataModal';
import { useGetQuery } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';



export default function AdminBudgetLayout() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleOpen = () => setDeleteModalOpen(true);
  const handleClose = () => setDeleteModalOpen(false);
  const [amountEntered, setAmountEntered] = useState('');
  const [amountCFOTransfered, setAmountCFOtransfered] = useState('');


  const navigate = useNavigate();
  const all_cfo = [
    { label: 'A', value: 2400 },
    { label: 'B', value: 4567 },
    { label: 'C', value: 1398 },
    { label: 'D', value: 9800 },
    { label: 'E', value: 3908 },
    { label: 'F', value: 4800 },
    { label: 'G', value: 4800 },
    { label: 'H', value: 4800 },
  ];


  /*----- pooling -----*/
  const master_analytics = useSelector((state) => state.endpoints.master_analytics);
  let { data: adminAnalyst } = useGetQuery(master_analytics, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (!!adminAnalyst) {
      setAmountEntered(adminAnalyst.amount_entered)
      setAmountCFOtransfered(adminAnalyst.amount_transfered_to_fsc)
    }
  }, [adminAnalyst]);



  return (
    <div className={styles.container}>
      <DataModal
        open={deleteModalOpen}
        handleClose={handleClose}
      />

      <div className={styles.content}>
        <div className={styles.oborot}>
          <div className={styles.oborot_item}>
            <p>Курс: 10 &#8381;/коин</p>
          </div>

          <div className={styles.oborot_item}>
            <p>Оборот средств за месяц</p>
            <h2>{parseInt(amountEntered).toLocaleString()} &#8381;</h2>
          </div>

          <div className={styles.oborot_item}>
            <p>Расходы на ЦФО за месяц</p>
            <h2>{parseInt(amountCFOTransfered).toLocaleString()} &#8381;</h2>
          </div>
        </div>

        <div className={styles.operations}>
          <div className={styles.oper_btns}>
            <button className={styles.action_btn} onClick={handleOpen}>Пополнить</button>
            <button className={styles.action_btn} onClick={() => navigate('/admin/transfer-master')}>Перевести</button>
          </div>
          <OperationsAction label='Шаблоны' />
          <OperationsAction label='История операций' />
        </div>

        <MasterAccount />
      </div>

      <div className={styles.analytics}>
        <h3>Аналитика по ЦФО</h3>

        <div className={styles.cfo_table}>
          <CFOAdminTable />
          <AdminAnalyticsUnit income={100000} expenses={21000} data={all_cfo} />
        </div>
      </div>
    </div>
  )
}
