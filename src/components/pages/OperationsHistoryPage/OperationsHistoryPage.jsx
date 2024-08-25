import React from 'react';
import styles from './OperationsHistoryPage.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';


export default function OperationsHistoryPage() {
    const mock = [
        {
            operation: 'sent',
            date: 'date',
            amount: 'a',
            recipient: 'rec'
        },
        {
            operation: 'sent',
            date: 'date',
            amount: 'a',
            recipient: 'rec'
        },
        {
            operation: 'sent',
            date: 'date',
            amount: 'a',
            recipient: 'rec'
        },
        {
            operation: 'sent',
            date: 'date',
            amount: 'a',
            recipient: 'rec'
        },
        {
            operation: 'sent',
            date: 'date',
            amount: 'a',
            recipient: 'rec'
        },
    ]


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <GrayButtonBack />
                <h2>История операций</h2>
            </div>

            <div className={styles.content}>
                {mock.map((item, index) => {
                    return (
                        <div key={index} className={styles.oper_card}>
                            <p><span>Операция:</span> {item.operation}</p>
                            <p><span>Дата:</span> {item.date}</p>
                            <p><span>Получатель:</span> {item.recipient}</p>
                            <p><span>Сумма:</span> {item.amount} коинов</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
