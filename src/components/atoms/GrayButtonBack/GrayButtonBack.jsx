import React from 'react';
import styles from './GrayButtonBack.module.css';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';


export default function GrayButtonBack() {
    const navigate = useNavigate();

    return (
        <button className={styles.btn} onClick={() => navigate(-1)}>
            <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
        </button>
    )
}
