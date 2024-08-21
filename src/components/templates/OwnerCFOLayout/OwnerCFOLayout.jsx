import React from 'react';
import styles from './OwnerCFOLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import CFOOwnerTable from '../../molecules/CFOOwnerTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useSelector } from 'react-redux';


export default function OwnerCFOLayout() {
    const { cfo_acc_number, cfo_acc_balance } = useSelector(state => state.owner);
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
            <div className={styles.content}>
                <OperationsAction label='Шаблоны' />

                <div className={styles.item}>
                    <OperationsAction label='История операций' />
                    <button className={styles.manage_btn}>Управлять участниками</button>
                </div>

                <CFOAccount cfo_balance={cfo_acc_balance} cfo_number={cfo_acc_number} />
            </div>


            <div className={styles.analytics}>
                <h3>Аналитика по участникам</h3>

                <div className={styles.cfo_table}>
                    <CFOOwnerTable />
                    <AdminAnalyticsUnit income={10000} expenses={3000} data={all_cfo} />
                </div>
            </div>
        </div>
    )
}
