import React from 'react';


export default function Badge({ label }) {
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--secondary-blue)',
        color: 'var(--primary-blue)',
        width: 'fit-content',
        padding: '0.3rem 1.7rem',
        borderRadius: 'var(--card-radius)'
    }

    return (
        <span style={style}>
            <p>{label}</p>
        </span>
    )
}
