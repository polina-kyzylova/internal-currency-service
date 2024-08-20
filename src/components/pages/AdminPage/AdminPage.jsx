import React, { useState } from 'react';
import styles from './AdminPage.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import ControlUnit from '../../molecules/ControlUnit';
import SideMenu from '../../molecules/SideMenu/SideMenu';
import Badge from '../../atoms/Badge';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export default function AdminPage() {
  let item = window.location.href.split("/").pop();
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: { main: '#000' },
    },
  });

  const [value, setValue] = useState(item);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user_info}>
          <h2>Иван Иванов</h2>
          <Badge label='Администратор' />
        </div>

        <ControlUnit />
      </div>

      <div className={styles.side_menu}>
        <SideMenu />
      </div>

      <div className={styles.content}>
        <ThemeProvider theme={theme}>
          <Box className={styles.navigation}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab
                value="budget"
                sx={{ color: 'var(--dark-gray)', textTransform: 'none', fontSize: 'var(--lbl-mini-size)', fontWeight: 'var(--lbl-bold-weight)' }}
                aria-label="Бюджет"
                label="Бюджет"
                onClick={() => navigate('./budget')} />
              <Tab
                value="cfo"
                sx={{ color: 'var(--dark-gray)', textTransform: 'none', fontSize: 'var(--lbl-mini-size)', fontWeight: 'var(--lbl-bold-weight)' }}
                aria-label="ЦФО"
                label="ЦФО"
                onClick={() => navigate('./cfo')}
              />
              <Tab
                value="admin"
                sx={{ color: 'var(--dark-gray)', textTransform: 'none', fontSize: 'var(--lbl-mini-size)', fontWeight: 'var(--lbl-bold-weight)' }}
                aria-label="Мои финансы"
                label="Мои финансы"
                onClick={() => navigate('')}
              />
            </Tabs>
          </Box>
        </ThemeProvider>


        <Outlet />
      </div>
    </div >
  )
}
