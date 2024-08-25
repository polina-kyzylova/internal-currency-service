import React from 'react';


export default function Error({ error }) {
    const style = {
        zIndex: '10',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <div style={style}>
            <h2>Ошибка {error.status}</h2>
            <p style={{ color: 'red' }}>Перезагрузите страницу</p>
        </div>
    )
}
