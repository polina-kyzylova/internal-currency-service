import React from 'react';
import '../GeneralOperations.css';
import styles from './CreateTransferCFOUnit.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';


export default function CreateTransferCFOUnit({ setConfirmTransfer }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [data, setData] = useOutletContext();

  const onSubmit = (data) => {
    if (parseInt(data.amount) > 222) {
      setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
    } else if (parseInt(data.amount) === 0) {
      setError('amount', { type: 'custom', message: 'Некорректная сумма' });
    } else {
      setConfirmTransfer(true);
      setData(data);
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <GrayButtonBack />

        <div className={styles.content}>
          <h1>Пополнение ЦФО</h1>
          <TransactionAccInfo
            title='Счет списания'
            acc_type='Счет ЦФО'
            acc_number={data.cfo_number}
            acc_balance={data.cfo_balance}
          />
        </div>
      </div>
    </form>
  )
}
