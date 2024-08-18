import React from 'react';
import styles from './UserAnalyticsUnit.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import coin from '../../../assets/black_coin.svg'


export default function UserAnalyticsUnit({ label, money, data }) {
    const palette = ['#2FB3FF', '#141414', '#C4C4C4', '#91FF59', '#ABE52F', '#F6C033', '#FF5B69', '#006097',];

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <p className={styles.lbl}>{label}</p>
                

                <div className={styles.coin}>
                    <p className={styles.money}>{money}</p>
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

                    margin={{ top: 0, bottom: 100, left: 0, right: 0 }}

                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0,
                            itemGap: 18,
                        }
                    }}
                />
            </div>
        </div>
    )
}

// height={400}