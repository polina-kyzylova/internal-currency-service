import React, { useEffect } from 'react';
import styles from './CreateCFOPage.module.css';
import { useForm } from "react-hook-form";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';



export default function CreateCFOPage() {
    const users = [
        { label: 'Петров Петр Петрович', phone: '79999999999' },
        { label: 'Петров Петр Петрович', phone: '79999999998' },
        { label: 'Петров Петр Петрович', phone: '79999999997' },
        { label: 'Петров Петр Петрович', phone: '79999999996' },
        { label: 'Петров Петр Петрович', phone: '79999999995' },
        { label: 'Петров Петр Петрович', phone: '79999999994' },
        { label: 'Петров Петр Петрович', phone: '79999999993' },
        { label: 'Петров Петр Петрович', phone: '79999999992' },
        { label: 'Петров Петр Петрович', phone: '79999999991' },
    ]

    const titles = [
        'Название 1', 'Название 2', 'Название 3', 'Название 4',
    ]

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm()


    /* ---------- Check unique name before create new CFO ---------
        DEBOUNCE + QUERY
        if (getValues('title') in titles) {
            setError('title', { type: 'custom', message: 'Название уже используется' });
        }
    */

    /* ---------- Check macter acc balance before create new CFO ---------
        if (getValues('budget') in titles) {
            setError('budget', { type: 'custom', message: 'Недостаточно средств на мастер-счете' });
        }
    */

        

    const onSubmit = (data) => { console.log(data) }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <GrayButtonBack />

                    <div className={styles.content}>
                        <h1>Создание ЦФО</h1>

                        <div className={styles.inpt_box}>
                            <label htmlFor='cfo_type'>Тип ЦФО <span>*</span></label>
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

                        <div className={styles.inpt_box}>
                            <label htmlFor='owner'>Владелец <span>*</span></label>
                            <Autocomplete
                                id="owner"
                                fullWidth
                                options={users}
                                autoHighlight
                                getOptionLabel={(option) => option.phone}
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <Box key={key} component="li" {...optionProps}>
                                            <Avatar sx={{ backgroundColor: 'var(--dark-gray)', marginRight: '1rem' }}>
                                                <PersonIcon sx={{ color: '#fff', fontSize: 20 }} />
                                            </Avatar>
                                            {option.label} +{option.phone}
                                        </Box>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputProps={{ ...params.inputProps }}
                                        variant="standard"
                                        error={errors.owner ? true : false}
                                        {...register("owner", { required: true, })}
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.inpt_box}>
                            <label htmlFor='message'>Название <span>*</span></label>
                            <TextField
                                id="title"
                                fullWidth
                                variant="standard"
                                error={errors.title ? true : false}
                                {...register("title", { required: true })}
                            />
                        </div>

                        <div className={styles.inpt_box}>
                            <label htmlFor='budget'>Бюджет</label>
                            <TextField
                                id="budget"
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
                                {...register("budget")}
                            />
                        </div>
                    </div>


                    <input type="submit" value='Создать' className={styles.create_btn} />
                </div>
            </div>
        </form>
    )
}
