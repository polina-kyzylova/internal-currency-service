import React from 'react';
import { useState } from 'react';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(0);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingRight: '10px', cursor: 'pointer'}}>
            <Badge badgeContent={notifications}
                color="error"
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <NotificationsIcon sx={{ color: 'var(--primary-blue)', fontSize: 40 }} />
            </Badge>

            {notifications ? <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem>Уведомления</MenuItem>
                <Divider />

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <img src='' alt='' />
                    </ListItemIcon>
                    <p>Текст уведомления</p>
                </MenuItem>
            </Menu> : null}
        </Box>
    )
}
