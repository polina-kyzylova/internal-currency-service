import React from 'react';


export default function ServiceStatus({ status }) {
    if (status == 'ok') {
        return (
            <span
                style={{
                    width: 'min-content',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#ABE52F',
                    borderRadius: '32px',
                    fontWeight: '600',
                    fontSize: '1.2rem',
                    color: '#fff'
                }}
            >
                Ok
            </span>
        )
    }
    if (status === 'warning') {
        return (
            <span
                style={{
                    width: 'min-content',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#F6C033',
                    borderRadius: '32px',
                    fontWeight: '600',
                    fontSize: '1.2rem',
                    color: '#fff'
                }}
            >
                Warning
            </span>
        )
    }
    if (status === 'error') {
        return (<span
            style={{
                width: 'min-content',
                padding: '0.5rem 1.5rem',
                backgroundColor: '#FF5B69',
                borderRadius: '32px',
                fontWeight: '600',
                fontSize: '1.2rem',
                color: '#fff'
            }}
        >
            Error
        </span>
        )
    }
}
