import React from 'react';
import styles from './CreateTransactionUnit.module.css';
import { useNavigate } from 'react-router-dom';
import coin from '../../../assets/black_coin.svg';
import { globalTags } from '../../../store/globalVariables';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WestIcon from '@mui/icons-material/West';




export default function CreateTransactionUnit({ setCreating }) {
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

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm()

    const balance = 360;
    const navigate = useNavigate();
    const [data, setData] = useOutletContext();

    const onSubmit = (data) => {
        if (parseInt(data.amount) > balance) {
            setError('amount', { type: 'custom', message: 'Недостаточно средств на счете' });
        } else {
            setCreating(false);
            setData(data);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <button className={styles.previous_btn} onClick={() => window.history.back()}>
                    <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
                </button>


                <div className={styles.content}>
                    <h1>Перевод другому пользователю</h1>

                    <div className={styles.inpt_box}>
                        <p className={styles.acc_info}>Счет списания: <span className={styles.money}>№111 111 111 111</span></p>

                        <div className={styles.coin}>
                            <p className={styles.acc_info}>Баланс: <span className={styles.money}>{balance}</span></p>
                            <img src={coin} alt='coin' />
                        </div>
                    </div>


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
                                    error={errors.phone ? true : false}
                                    {...register("phone", { required: true, })}
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
