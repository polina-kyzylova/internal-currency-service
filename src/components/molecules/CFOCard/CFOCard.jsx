import React from 'react';
import styles from './CFOCard.module.css';
import GrayButton from '../../atoms/GrayButton/GrayButton';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import coin from '../../../assets/black_coin.svg';
import { useNavigate } from 'react-router-dom';


export default function CFOCard({ cfo_id, balance, title, owner_name }) {
    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
            primary: { main: '#91FF59' },
        },
    });


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.money}>
                    <h4>{balance}</h4>
                    <img src={coin} alt='coin' />
                </div>

                <div className={styles.progress}>
                    <ThemeProvider theme={theme}>
                        <LinearProgress
                            variant="determinate"
                            value={50}
                            color='primary'
                            sx={{
                                width: '10rem',
                                height: '0.4rem',
                                backgroundColor: 'var(--dark-gray)',
                                borderRadius: 'var(--card-radius)',
                            }}
                        />
                    </ThemeProvider>
                </div>

                <div className={styles.info}>
                    <p className={styles.titl}>{title}</p>
                    <p className={styles.identif}>Владелец: {owner_name}</p>
                </div>
            </div>

            <GrayButton onClick={() => navigate(`/admin/cfo/${cfo_id}`)}/>
        </div>
    )
}
