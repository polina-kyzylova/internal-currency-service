import React, { useState } from 'react';
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
import { globalCFOTags } from '../../../store/globalVariables';



export default function CreateTransferCFOUnit({ setConfirmTransfer }) {
  const [data, setData] = useOutletContext();
  console.log(data)


  const cfo = useSelector(state => state.cfo);
  const [recipType, setRecipType] = useState('personal');

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender_cfo_title: cfo.cfo_title,
      sender_cfo_number: cfo.cfo_number,
      sender_cfo_owner: cfo.cfo_owner,
    }
  })


  const onSubmit = (d) => {
    if (parseInt(d.amount) > cfo.cfo_balance) {
      setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
    } else if (parseInt(d.amount) === 0) {
      setError('amount', { type: 'custom', message: 'Некорректная сумма' });
    } else {
      setConfirmTransfer(true);
      setData({ ...data, ...d });
    }
  }

  function chooseRecipient() {
    if (recipType === 'personal') {
      return (
        <UsersAutoList
          title='Получатель'
          register={register}
          errors={errors}
        />)
    } else {
      return (
        <CFOAutoList
          title='Получатель'
          register={register}
          errors={errors}
        />
      )
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <GrayButtonBack />

        <div className={styles.content}>
          <h1>Распределение средств ЦФО</h1>

          <TransactionAccInfo
            title='Счет списания'
            acc_type='Счет ЦФО'
            acc_number={cfo.cfo_number}
            acc_balance={cfo.cfo_balance}
          />

          <div className={styles.inpt_box}>
            <label htmlFor='recipient_type'>Тип получателя</label>

            <select
              name="recipient_type"
              id="recipient_type"
              className={styles.select_type}
              {...register("recip_type", { required: true })}
              onChange={(e) => setRecipType(e.target.value)}
            >
              <option value="personal">Пользователь</option>
              <option value="cfo">Другой ЦФО</option>
            </select>
          </div>

          {chooseRecipient()}

          <AmountInput
            register={register}
            errors={errors}
          />

          <div className={styles.mess}>
            <div className={styles.inpt_box}>
              <label htmlFor='message'>Сообщение</label>

              <TextField
                id="message"
                fullWidth
                variant="standard"
                error={errors.message ? true : false}
                {...register("message", { required: true })}
              />
            </div>

            <div className={styles.tags}>
              {globalCFOTags.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={styles.message_tag}
                    onClick={() => {
                      setValue('message', `${item.icon}${item.label}`)
                    }}
                  >
                    {item.icon} {item.label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <input type="submit" value='Продолжить' className='operations-next-btn' />
      </div>
    </form>
  )
}
