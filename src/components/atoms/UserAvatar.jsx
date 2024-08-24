import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import { removeCFO } from '../../store/slices/cfoSlice';
import { removeAdmin } from '../../store/slices/adminSlice';
import { useDispatch } from 'react-redux';

import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';



export default function UserAvatar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutUser = () => {
        handleClose();
        dispatch(removeUser());
        dispatch(removeCFO());
        dispatch(removeAdmin());
        navigate('/')
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Avatar
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ width: '3.3rem', height: '3.3rem', backgroundColor: 'var(--secondary-blue)', cursor: 'pointer' }}
            >
                <PersonIcon sx={{ color: 'var(--primary-blue)', fontSize: 35 }} />
            </Avatar>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonIcon fontSize="medium" />
                    </ListItemIcon>
                    Профиль
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Настройки
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => logOutUser()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выход
                </MenuItem>
            </Menu>
        </Box>

    )
}
