import React from 'react';
import styles from './CreateTransactionUnit.module.css';
import '../GeneralOperations.css';
import { globalTags } from '../../../store/globalVariables';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import TextField from '@mui/material/TextField';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';



export default function CreateTransactionUnit({ setCreating }) {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm()

    const balance = 360;
    const [data, setData] = useOutletContext();

    const onSubmit = (data) => {
        if (parseInt(data.amount) > balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств на счете' });
        } else if (parseInt(data.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setCreating(false);
            setData(data);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <GrayButtonBack />

                <div className={styles.content}>
                    <h1>Перевод другому пользователю</h1>
                    <TransactionAccInfo
                        title='Счет списания'
                        acc_type='Персональный счет'
                        acc_number='111111111111'
                        acc_balance={balance}
                    />

                    <UsersAutoList
                        title='Получатель'
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />

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
                            {globalTags.map((item, index) => {
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
        </form >
    )
}
