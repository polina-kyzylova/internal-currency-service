import React, { useEffect, useState } from 'react';
import styles from './OwnerCFOLayout.module.css';
import OperationsAction from '../../molecules/OperationsAction/OperationsAction';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import CFOOwnerTable from '../../molecules/CFOOwnerTable';
import AdminAnalyticsUnit from '../../organisms/AdminAnalyticsUnit/AdminAnalyticsUnit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ServiceCFOCard from '../../molecules/ServiceCFOCard/ServiceCFOCard';
import { useGetQuery } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';
import { initCFO } from '../../../store/slices/cfoSlice';



export default function OwnerCFOLayout() {
    const { cfo_number, cfo_balance, cfo_title, cfo_type } = useSelector(state => state.cfo);
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

    function cfoRender() {
        if (cfo_type === 'service') {
            return (
                <ServiceCFOCard
                    status='ok'
                    service_title='Lalala'
                    service_id='123'
                />
            )
        } else return null
    }


    const setup_cfo = useSelector((state) => state.endpoints.setup_cfo);
    const [currentBalance, setCurrentBalance] = useState();
    const dispatch = useDispatch();

    /*----- pooling -----*/
    let { data: currentData, isLoading: cfoLoading } = useGetQuery(setup_cfo, {
        pollingInterval: 2000,
        skipPollingIfUnfocused: true,
    });

    /*----- update store if balance change -----*/
    function updateStore() {
        dispatch(dispatch(initCFO({
            cfo_number: currentData.account_number,
            cfo_balance: currentData.balance,
            cfo_title: currentData.name,
            cfo_id: currentData.id,
            owner_full_name: currentData.owner_full_name,
            cfo_type: currentData.fsc_type,
        })))
    }

    /*----- check pooling result -----*/
    useEffect(() => {
        if (!!currentData) {
            setCurrentBalance(currentData.balance)
            if (cfo_balance !== currentData.balance) updateStore()
        }
    }, [currentData]);


    

    if (cfoLoading) return <Loader />
    else return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={(cfo_type === 'service') ? styles.cfo_serv : styles.serv}>
                        <h1 className={(cfo_type === 'service') ? styles.cfo_service_title : styles.cfo_titl}>{cfo_title}</h1>

                        <button
                            className={styles.manage_btn}
                            onClick={() => navigate('/owner/transfer-cfo')}
                        >Перевести</button>
                    </div>

                    <div className={(cfo_type === 'service') ? styles.cfo_serv : styles.serv}>
                        <OperationsAction label='История операций' />
                        <OperationsAction label='Шаблоны' />
                        {cfoRender()}
                    </div>
                </div>

                <CFOAccount cfo_balance={currentBalance} cfo_number={cfo_number} />
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
