import React from 'react';
import styles from './AuthPage.module.css';
import { Outlet } from 'react-router-dom';


export default function AuthPage() {
    return (
        <div className={styles.container}>
            <div className={styles.onboard}>
                onboard
            </div>

            <Outlet />
        </div>
    )
}
