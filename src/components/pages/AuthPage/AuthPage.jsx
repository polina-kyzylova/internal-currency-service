import React from 'react';
import styles from './AuthPage.module.css';
import { Outlet } from 'react-router-dom';
import onboard from '../../../assets/onboard.svg';


export default function AuthPage() {
    return (
        <div className={styles.container}>
            <div className={styles.onboard}>
                <img src={onboard} alt='Onboard photo' />
            </div>

            <Outlet />
        </div>
    )
}
