import React from 'react';
import styles from './CreateCFOPage.module.css';
import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useSelector } from 'react-redux';
import UserAutoList from '../../molecules/TransactionForm/UsersAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';



export default function CreateCFOPage() {
    const { master_acc_balance } = useSelector(state => state.admin);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()


    /* ---------- Check unique name before create new CFO ---------
        DEBOUNCE + QUERY
        if (getValues('title') in titles) {
            setError('title', { type: 'custom', message: 'Название уже используется' });
        }
    */

    const onSubmit = (data) => {
        if (data.budget > parseInt(master_acc_balance)) {
            setError('budget', { type: 'custom', message: 'Недостаточно средств для создания ЦФО' });

        } else {
            console.log('CFO succesfully created: ', data)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <GrayButtonBack />

                    <div className={styles.content}>
                        <h1>Создание ЦФО</h1>

                        <div className={styles.inpt_box}>
                            <label htmlFor='cfo_type'>Тип ЦФО</label>
                            <select
                                name="cfo_type"
                                id="cfo_type"
                                {...register("type")}
                                className={styles.select_type}
                            >
                                <option value="standart">ЦФО</option>
                                <option value="service">ЦФО сервиса</option>
                            </select>
                        </div>

                        <UserAutoList
                            title='Владелец'
                            register={register}
                            errors={errors}
                        />

                        <div className={styles.inpt_box}>
                            <label htmlFor='message'>Название</label>
                            <TextField
                                id="title"
                                fullWidth
                                variant="standard"
                                error={errors.title ? true : false}
                                {...register("title", { required: true })}
                            />
                        </div>

                        <AmountInput
                            register={register}
                            errors={errors}
                        />
                    </div>


                    <input type="submit" value='Создать' className={styles.create_btn} />
                </div>
            </div>
        </form>
    )
}
