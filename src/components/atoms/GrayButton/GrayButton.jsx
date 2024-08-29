import React from 'react';
import styles from './GrayButton.module.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WestIcon from '@mui/icons-material/West';


export default function GrayButton({ onClick, direction }) {
    return (
        <button className={styles.btn} onClick={onClick}>
            {
                direction === 'west' ?
                    <WestIcon sx={{ color: '#fff', fontSize: 35 }} /> :
                    <NorthEastIcon sx={{ color: '#fff', fontSize: 35 }} />
            }
        </button>
    )
}
