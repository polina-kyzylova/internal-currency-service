import React from 'react';
import '../GeneralOperations.css';
import styles from './CreateReplenishCFOUnit.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';



export default function CreateReplenishCFOUnit({ setConfirmReplenish }) {
    const { master_acc_balance, master_acc_number } = useSelector(state => state.admin);
    const [data, setData] = useOutletContext();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            master_acc: master_acc_number,
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
                        acc_number={data.cfo_number}
                        acc_balance={data.cfo_balance}
                    />

                    <div className={styles.inpt_box}>
                        <label htmlFor='amount'>Сумма</label>
                        <TextField
                            id="amount"
                            fullWidth
                            variant="standard"
                            error={errors.amount ? true : false}
                            helperText={errors.amount ? errors.amount.message : null}
                            type='number'
                            onKeyDown={(e) => {
                                if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                    e.preventDefault()
                                }
                                if (e.key === "ArrowDown" && e.target.value <= 0) {
                                    e.preventDefault()
                                }
                            }}
                            {...register("amount", { required: true })}

                        />
                    </div>
                </div>

                <input type="submit" value='Продолжить' className='operations-next-btn' />
            </div>
        </form>
    )
}
