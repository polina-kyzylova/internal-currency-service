import React, { useState } from 'react';
import styles from './CreateTransactionUnit.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { globalTags } from '../../../store/globalVariables';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useForm } from "react-hook-form"



export default function CreateTransactionUnit() {
    const users = [
        { label: 'Иванов Иван Иванович', phone: '79999999999' },
        { label: 'Иванов Иван Иванович', phone: '79999999998' },
        { label: 'Иванов Иван Иванович', phone: '79999999997' },
        { label: 'Иванов Иван Иванович', phone: '79999999996' },
        { label: 'Иванов Иван Иванович', phone: '79999999995' },
        { label: 'Иванов Иван Иванович', phone: '79999999994' },
        { label: 'Иванов Иван Иванович', phone: '79999999993' },
        { label: 'Иванов Иван Иванович', phone: '79999999992' },
        { label: 'Иванов Иван Иванович', phone: '79999999991' },
    ]

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Перевод другому пользователю</h1>

                    <div className={styles.inpt_box}>
                        <label htmlFor='recipient'>Получатель</label>
                        <Autocomplete
                            id="recipient"
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
                                    error={errors.recipient ? true : false}
                                    {...register("recipient", { required: true, })}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.inpt_box}>
                        <label htmlFor='amount'>Сумма</label>
                        <TextField
                            id="amount"
                            fullWidth
                            variant="standard"
                            error={errors.amount ? true : false}
                            type='number'
                            onKeyDown={(e) => {
                                if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                    e.preventDefault()
                                }
                            }}
                            {...register("amount", { required: true })}
                        />
                    </div>


                    <div className={styles.mess}>
                        <div className={styles.inpt_box}>
                            <label htmlFor='message'>Сообщение</label>
                            <TextField
                                id="message"
                                fullWidth
                                variant="standard"
                                error={errors.message ? true : false}
                                {...register("message", { required: true })}
                            />
                        </div>

                        <div className={styles.tags}>
                            {globalTags.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={styles.message_tag}
                                        onClick={() => {
                                            setValue('message', `${item.icon}${item.label}`)
                                        }}
                                    >
                                        {item.icon} {item.label}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>


                <input type="submit" value='Продолжить' className={styles.next_btn} />
            </div>
        </form >
    )
}
