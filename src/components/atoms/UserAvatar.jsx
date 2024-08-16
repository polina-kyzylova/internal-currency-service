import React from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


export default function UserAvatar() {
    return (
        <div>
            <Avatar sx={{ width: '3.3rem', height: '3.3rem', backgroundColor: 'var(--secondary-blue)', cursor: 'pointer' }}>
                <PersonIcon sx={{ color: 'var(--primary-blue)', fontSize: 35 }} />
            </Avatar>
        </div>
    )
}
