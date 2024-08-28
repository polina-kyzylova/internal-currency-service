import React, { useEffect, useState } from 'react';
import '../GeneralOperations.css';
import styles from './CreateTransferMasterUnit.module.css';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useGetQueryMutation } from '../../../store/slices/apiSlice';

import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import CFOAutoList from '../../molecules/TransactionForm/CFOAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';
import PurposeTags from '../../molecules/PurposeTags/PurposeTags';



export default function CreateTransferMasterUnit({ setConfirmTransfer }) {
    const [data, setData] = useOutletContext();
    const admin = useSelector(state => state.admin);
    const user = useSelector(state => state.user);


    /*----- get transaction purpose tags -----*/
    const [postReq] = useGetQueryMutation();
    const transCFOTagsEP = useSelector((state) => state.endpoints.cfo_purposes_tags);
    const [purposeTags, setPurposeTags] = useState();

    const getPaymentPurposes = async () => {
        const response = await postReq(transCFOTagsEP)
        if (!!response.data) setPurposeTags([...response.data.data])
    }

    useEffect(() => {
        getPaymentPurposes();
    }, [])


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            sender_number: admin.master_acc_number,
            sender_name: `${user.surname} ${user.name} ${user.last_name}`,
        }
    })

    const onSubmit = (d) => {
        if (parseInt(d.amount) > admin.master_acc_balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
        } else if (parseInt(d.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setConfirmTransfer(true);
            setData({ ...data, ...d });
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <GrayButtonBack />

                <div className={styles.content}>
                    <h1>Распределение средств Мастер-счета</h1>

                    <TransactionAccInfo
                        title='Счет списания'
                        acc_type='Мастер-счет'
                        acc_number={admin.master_acc_number}
                        acc_balance={admin.master_acc_balance}
                    />

                    <CFOAutoList
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
        </form>
    )
}
