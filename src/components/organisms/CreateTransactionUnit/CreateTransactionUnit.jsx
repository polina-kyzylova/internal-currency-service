import React, { useEffect, useState } from 'react';
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
import { useGetQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';



export default function CreateTransactionUnit({ setCreating }) {
    const user = useSelector(state => state.user);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm()

    const [data, setData] = useOutletContext();

    const onSubmit = (data) => {
        if (parseInt(data.amount) > user.personal_acc_balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств на счете' });
        } else if (parseInt(data.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setCreating(false);
            setData(data);
        }
    }

    const [postReq] = useGetQueryMutation();
    const transTagsEP = useSelector((state) => state.endpoints.purposes_tags);
    const [purposeTags, setPurposeTags] = useState();

    const getPaymentPurposes = async () => {
        const res = await postReq(transTagsEP)
        if (!!res.data) setPurposeTags([...res.data.payment_purposes])
    }

    useEffect(() => {
        getPaymentPurposes();
    }, [])



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <GrayButtonBack />

                <div className={styles.content}>
                    <h1>Перевод другому пользователю</h1>
                    <TransactionAccInfo
                        title='Счет списания'
                        acc_type='Персональный счет'
                        acc_number={user.personal_acc_number}
                        acc_balance={user.personal_acc_balance}
                    />

                    <UsersAutoList
                        title='Получатель'
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
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
                                onKeyDown={(e) => {
                                    setValue('message', `${e.target.value}`)
                                    setValue('id', `${purposeTags.filter((item) => item.name === 'Другое').map(item => item.id)}`)
                                }}
                            />
                        </div>

                        <div className={styles.tags}>
                            {!!purposeTags ?
                                purposeTags.filter((item) => item.name !== 'Другое').map((item) => {
                                    return (
                                        <span
                                            key={item.id}
                                            className={styles.message_tag}
                                            onClick={() => {
                                                setValue('message', `${item.name}`)
                                                setValue('id', `${item.id}`)
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    )
                                }) : null}
                        </div>
                    </div>
                </div>

                <input type="submit" value='Продолжить' className='operations-next-btn' />
            </div>
        </form >
    )
}
