import React from 'react';
import styles from './AdminAnalyticsUnit.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import coin from '../../../assets/black_coin.svg';


export default function AdminAnalyticsUnit({ income, expenses, data }) {
    const palette = ['#2FB3FF', '#141414', '#C4C4C4', '#91FF59', '#ABE52F', '#F6C033', '#FF5B69', '#006097',];


    return (
        <div className={styles.container}>
            <div className={styles.period}>
                <p>Выбрать период</p>
            </div>

            <div className={styles.info}>
                <p className={styles.lbl}>Поступления</p>

                <div className={styles.coin}>
                    <p className={styles.money}>+{income.toLocaleString()}</p>
                    <img src={coin} alt='coin' />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.expens_info}>
                    <p className={styles.lbl}>Расходы</p>

                    <div className={styles.coin}>
                        <p className={styles.money}>-{expenses.toLocaleString()}</p>
                        <img src={coin} alt='coin' />
                    </div>
                </div>

                <div className={styles.diagram}>
                    <PieChart
                        series={[
                            {
                                data: data,
                                innerRadius: '75%',
                                outerRadius: '95%',
                                paddingAngle: 2,
                                cornerRadius: 0,
                                startAngle: -180,
                                endAngle: 180,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            }
                        ]}

                        colors={palette}
                        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        slotProps={{
                            legend: { hidden: true },
                          }}
                    />
                </div>
            </div>
        </div>
    )
}
