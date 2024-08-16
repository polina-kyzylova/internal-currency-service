import React from 'react';
import NorthEastIcon from '@mui/icons-material/NorthEast';


export default function GrayButton({onClick}) {
    const styles = {
        height: '3rem',
        width: '3rem',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        backgroundColor: 'var(--dark-gray)',
        cursor: 'pointer',
    }

    return (
        <button style={styles} onClick={onClick}>
            <NorthEastIcon sx={{color: '#fff'}} />
        </button>
    )
}
