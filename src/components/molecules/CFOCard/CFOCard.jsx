import React from 'react';
import styles from './CFOCard.module.css';
import GrayButton from '../../atoms/GrayButton/GrayButton';
import coin from '../../../assets/black_coin.svg';
import { useNavigate } from 'react-router-dom';


export default function CFOCard({ cfo_id, balance, title, owner_name, owner_surname, owner_lastname }) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.money}>
                    <h4>{balance}</h4>
                    <img src={coin} alt='coin' />
                </div>

                <div className={styles.info}>
                    <p className={styles.titl}>{title}</p>
                    <p className={styles.identif}>Владелец: {owner_surname} {owner_name[0]}.{owner_lastname[0]}.</p>
                </div>
            </div>

            <GrayButton onClick={() => navigate(`/admin/cfo/${cfo_id}`)}/>
        </div>
    )
}
