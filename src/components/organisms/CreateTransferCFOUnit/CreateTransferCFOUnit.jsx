import React from 'react';
import '../GeneralOperations.css';
import styles from './CreateTransferCFOUnit.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import CFOAutoList from '../../molecules/TransactionForm/CFOAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';



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
      console.log(data)
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
            acc_number='x'
            acc_balance='x'
          />

          <div className={styles.inpt_box}>
            <label htmlFor='recipient_type'>Тип получателя</label>
            <select
              name="recipient_type"
              id="recipient_type"
              {...register("recipient_type")}
              className={styles.select_type}
            >
              <option value="personal">Пользователь</option>
              <option value="cfo">Другой ЦФО</option>
            </select>
          </div>


          <UsersAutoList
            title='Получатель'
            register={register}
            errors={errors}
          />

          <CFOAutoList
            title='Получатель'
            register={register}
            errors={errors}
          />

          <AmountInput
            register={register}
            errors={errors}
          />





        </div>

        <input type="submit" value='Продолжить' className='operations-next-btn' />
      </div>
    </form>
  )
}
