import React from 'react';
import styles from './TranferCFOLayout.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';


export default function TransferCFOLayout() {
  return (
    <div className={styles.container}>
      <GrayButtonBack />
      <h2>Перевод с текущего ЦФО другому ЦФО/юзеру</h2>
    </div>
  )
}
