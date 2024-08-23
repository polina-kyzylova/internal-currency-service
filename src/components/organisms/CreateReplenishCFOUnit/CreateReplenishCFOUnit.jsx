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
    const { master_acc_balance, master_acc_number } = useSelector(state => state.admin);
    const {cfo_title, cfo_owner, cfo_balance, cfo_number} = useSelector(state => state.cfo);
    const [data, setData] = useOutletContext();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            master_acc: master_acc_number,
            cfo_owner: cfo_owner,
            cfo_number: cfo_number,
            cfo_title: cfo_title,
            sender_name: `${user.fam_name} ${user.first_name} ${user.last_name[0]}.`,
        }
    })

    const onSubmit = (d) => {
        if (parseInt(d.amount) > master_acc_balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
        } else if (parseInt(d.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setConfirmReplenish(true);
            setData({ ...data, ...d });
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
                        acc_number={master_acc_number}
                        acc_balance={master_acc_balance}
                    />
                    <TransactionAccInfo
                        title='Счет зачисления'
                        acc_type='Счет ЦФО'
                        acc_number={cfo_number}
                        acc_balance={cfo_balance}
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
