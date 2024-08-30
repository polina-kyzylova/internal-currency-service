import React, { useState } from 'react';
import styles from './AdminBudgetLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import MasterAccount from '../../molecules/MasterAccount/MasterAccount';
import CFOAdminTable from '../../molecules/CFOAdminTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useNavigate } from 'react-router-dom';
import DataModal from '../../molecules/DataModal/DataModal';



export default function AdminBudgetLayout() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleOpen = () => setDeleteModalOpen(true);
  const handleClose = () => setDeleteModalOpen(false);

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


  return (
    <div className={styles.container}>
      <DataModal
        open={deleteModalOpen}
        handleClose={handleClose}
      />


      <div className={styles.content}>
        <div className={styles.oborot}>
          <h4>Оборот средств</h4>
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
