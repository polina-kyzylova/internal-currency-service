import React from 'react';
import styles from './SideMenu.module.css';

import { Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculateIcon from '@mui/icons-material/Calculate';
import TerminalIcon from '@mui/icons-material/Terminal';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RadarIcon from '@mui/icons-material/Radar';


export default function SideMenu() {
    const icon_size = 25;

    return (
        <div className={styles.container}>
            <Tooltip title="Главная" placement="right">
                <button className={styles.menu_btn}>
                    <HomeIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Мои финансы" placement="right">
                <button className={styles.menu_btn_active}>
                    <AccountBalanceWalletIcon sx={{ color: '#808080', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Моя команда" placement="right">
                <button className={styles.menu_btn}>
                    <GroupsIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Магазин" placement="right">
                <button className={styles.menu_btn}>
                    <LocalMallIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Активности" placement="right">
                <button className={styles.menu_btn}>
                    <RocketLaunchIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Код-ревью" placement="right">
                <button className={styles.menu_btn}>
                    <TerminalIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Расчет кредита" placement="right">
                <button className={styles.menu_btn}>
                    <CalculateIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Звонки" placement="right">
                <button className={styles.menu_btn}>
                    <HeadphonesIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>

            <Tooltip title="Техрадар" placement="right">
                <button className={styles.menu_btn}>
                    <RadarIcon sx={{ color: '#B5B5B5', fontSize: icon_size }} />
                </button>
            </Tooltip>
        </div>
    )
}
