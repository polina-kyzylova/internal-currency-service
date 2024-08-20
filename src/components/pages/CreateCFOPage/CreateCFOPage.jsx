import React from 'react';
import styles from './CreateCFOPage.module.css';
import { useForm } from "react-hook-form";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WestIcon from '@mui/icons-material/West';



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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => { console.log(data) }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <button className={styles.previous_btn} onClick={() => window.history.back()}>
                        <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
                    </button>


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
                                <option value="team">ЦФО команды</option>
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
