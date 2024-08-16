import React from 'react';
import styles from './OperationsHistory.module.css';
import GrayButton from '../../atoms/GrayButton';


export default function OperationsHistory() {
  return (
    <div className={styles.container}>
        <h4 className={styles.lbl}>История операций</h4>
        <GrayButton />
    </div>
  )
}
