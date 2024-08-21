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
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            master_acc: master_acc_number,
            cfo_acc: '222',
        }
    })

    const [data, setData] = useOutletContext();

    const onSubmit = (data) => {
        if (parseInt(data.amount) > master_acc_balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
        } else if (parseInt(data.amount) === 0) {
            setError('amount', { type: 'custom', message: 'Некорректная сумма' });
        } else {
            setConfirmReplenish(true);
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
                        acc_type='Счет списания'
                        acc_number={master_acc_number}
                        acc_balance={master_acc_balance}
                    />
                    <TransactionAccInfo
                        acc_type='Счет зачисления'
                        acc_number='222'
                        acc_balance='222'
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
