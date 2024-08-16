import React from 'react';
import Notifications from '../atoms/Notifications';
import UserAvatar from '../atoms/UserAvatar';


export default function ControlUnit() {
    const styles = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--grid-padding)',
    }

    return (
        <div style={styles}>
            <Notifications />
            <UserAvatar />
        </div>
    )
}
