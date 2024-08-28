import React, { useEffect, useState } from 'react';
import styles from './CreateTransactionUnit.module.css';
import '../GeneralOperations.css';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useGetQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';

import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';
import PurposeTags from '../../molecules/PurposeTags/PurposeTags';



export default function CreateTransactionUnit({ setCreating }) {
    const [data, setData] = useOutletContext();
    const user = useSelector(state => state.user);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm()

    /*----- create user-to-user transaction -----*/
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

    /*----- get transaction purpose tags -----*/
    const [getPurposeTags] = useGetQueryMutation();
    const tagsEP = useSelector((state) => state.endpoints.purposes_tags);
    const [purposeTags, setPurposeTags] = useState();

    const getPaymentPurposes = async () => {
        const response = await getPurposeTags(tagsEP);
        if (!!response.data) setPurposeTags([...response.data.data])
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

                    <PurposeTags
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        purposeTags={purposeTags}
                    />
                </div>

                <input type="submit" value='Продолжить' className='operations-next-btn' />
            </div>
        </form >
    )
}
