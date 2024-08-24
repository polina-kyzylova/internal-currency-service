import React from 'react';
import styles from './OwnerCFOLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import CFOOwnerTable from '../../molecules/CFOOwnerTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ServiceCFOCard from '../../molecules/ServiceCFOCard/ServiceCFOCard';


export default function OwnerCFOLayout() {
    const { cfo_number, cfo_balance, cfo_title } = useSelector(state => state.cfo);
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
            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={styles.serv}>
                        <h1 className={styles.cfo_titl}>{cfo_title}</h1>

                        <button
                            className={styles.manage_btn}
                            onClick={() => navigate('/owner/transfer-cfo')}
                        >Перевести</button>
                    </div>

                    <div className={styles.serv}>
                        <OperationsAction label='Шаблоны' />
                        <OperationsAction label='История операций' />
                        <ServiceCFOCard
                            status='ok'
                            service_title='Lalala'
                            service_id='123'
                        />
                    </div>
                </div>

                <CFOAccount cfo_balance={cfo_balance} cfo_number={cfo_number} />
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



/*
                <div className={styles.item}>
                    <h1>{cfo_title}</h1>

                    <div className={styles.serv}>
                        <OperationsAction label='Шаблоны' />
                        <OperationsAction label='История операций' />
                    </div>
                </div>

                <div className={styles.item}>
                    <button
                        className={styles.manage_btn}
                        onClick={() => navigate('/owner/transfer-cfo')}
                    >Перевести
                    </button>

                    <ServiceCFOCard
                        status='ok'
                        service_title='Lalala'
                        service_id='123'
                    />
                </div>

*/