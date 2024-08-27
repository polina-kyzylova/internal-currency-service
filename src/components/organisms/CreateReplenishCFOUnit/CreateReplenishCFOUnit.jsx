import React from 'react';
import '../GeneralOperations.css';
import styles from './CreateReplenishCFOUnit.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import { useSelector } from 'react-redux';
import AmountInput from '../../molecules/TransactionForm/AmountInput';



export default function CreateReplenishCFOUnit({ setConfirmReplenish }) {
    const user = useSelector(state => state.user);
    const admin = useSelector(state => state.admin);
    const [data, setData] = useOutletContext();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            master_acc: admin.master_acc_number,
            cfo_owner: admin.current_owner_surname + ' ' + admin.current_owner_name + ' ' + admin.current_owner_lastname,
            cfo_number: admin.current_cfo_number,
            cfo_title: admin.current_cfo_title,
            cfo_id: admin.current_cfo_id,
            sender_name: `${user.surname} ${user.name} ${user.last_name}`,
        }
    })

    const onSubmit = (d) => {
        if (parseInt(d.amount) > admin.master_acc_balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
        } else if (parseInt(d.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setConfirmReplenish(true);
            setData({...d})
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
                        acc_type='Мастер-счет'
                        acc_number={admin.master_acc_number}
                        acc_balance={admin.master_acc_balance}
                    />
                    <TransactionAccInfo
                        title='Счет зачисления'
                        acc_type='Счет ЦФО'
                        acc_number={admin.current_cfo_number}
                        acc_balance={admin.current_cfo_balance}
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
