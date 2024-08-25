import React from 'react';
import styles from './OperationsAction.module.css';
import GrayButton from '../../atoms/GrayButton/GrayButton';


export default function OperationsAction({ label, onClick }) {
  return (
    <div className={styles.container}>
      <h4 className={styles.lbl}>{label}</h4>
      <GrayButton onClick={onClick} />
    </div>
  )
}
