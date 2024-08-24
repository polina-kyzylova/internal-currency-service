import React from 'react';
import styles from './ServiceCFOCard.module.css';
import ServiceStatus from '../../atoms/ServiceStatus';


export default function ServiceCFOCard({ status, service_title, service_id }) {
    return (
        <div className={styles.cfo_service}>
            <div className={styles.info}>
                <p className={styles.identif}>Подключения:</p>
                <p className={styles.titl}>{service_title}</p>
                <p className={styles.identif}>ID сервиса: {service_id}</p>
            </div>

            <ServiceStatus status={status} />
        </div>
    )
}
