import React, { useState } from 'react';
import styles from './CreateCFOPage.module.css';
import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useSelector } from 'react-redux';
import CFOownersAutoList from '../../molecules/TransactionForm/CFOownersAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';



export default function CreateCFOPage() {
    const { master_acc_balance } = useSelector(state => state.admin);
    const createCFOEP = useSelector((state) => state.endpoints.create_cfo);
    const [createCFO, { isLoading: cfoLoading }] = usePostQueryMutation();
    const [currentCFO, setCurrentCFO] = useState('TEAM');
    const navigate = useNavigate();

    function setTransData(data) {
        if (!!data.amount) {
            let transData1 = {
                "name": data.title,
                "fsc_type": data.type,
                "init_balance": data.amount,
                "owner_id": data.id,
            }
            return transData1
        } else {
            let transData2 = {
                "name": data.title,
                "fsc_type": data.type,
                "init_balance": 0,
                "owner_id": data.id,
            }
            return transData2
        }
    }

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        if (data.amount > parseInt(master_acc_balance)) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств для создания ЦФО' });

        } else {
            let x = setTransData(data);
            const result = await createCFO({ endpoint: createCFOEP, body: x });

            if (!!result.data) {
                navigate('./result/ok')
            } else {
                navigate('./result/error')
            }
        }
    }


    if (cfoLoading) return <Loader />
    else return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
                <div className={styles.container}>
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
                                onChange={(e) => setCurrentCFO(e.target.value)}
                            >
                                <option value="TEAM">ЦФО</option>
                                <option value="STORE">ЦФО сервиса</option>
                            </select>
                        </div>

                        <CFOownersAutoList
                            title='Владелец'
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
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

                        {currentCFO === 'TEAM' ?
                            <AmountInput
                                register={register}
                                errors={errors}
                            /> : null
                        }
                    </div>


                    <input type="submit" value='Создать' className={styles.create_btn} />
                </div>
            </div>
        </form>
    )
}
