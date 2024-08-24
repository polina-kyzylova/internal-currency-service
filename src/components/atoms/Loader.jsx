import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function Loader() {
    const style = {
        zIndex: '10',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <div style={style}>
            <CircularProgress size='6vw' />
        </div>
    )
}
