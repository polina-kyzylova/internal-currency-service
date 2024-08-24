import React from 'react';
import styles from './UserAnalyticsUnit.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import coin from '../../../assets/black_coin.svg';
import { globalPalette } from '../../../store/globalVariables';


export default function UserAnalyticsUnit({ label, money, data }) {
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
                    colors={globalPalette}
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
