import React from 'react';
import styles from './GrayButton.module.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';


export default function GrayButton({ onClick }) {
    return (
        <button className={styles.btn} onClick={onClick}>
            <NorthEastIcon sx={{ color: '#fff', fontSize: 35 }} />
        </button>
    )
}
