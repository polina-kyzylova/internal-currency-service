import React from 'react';
import styles from './AuthLayout.module.css';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetQueryMutation } from "../../../store/slices/apiSlice";


export default function LoginLayout() {
    const profileEP = useSelector((state) => state.endpoints.profile);
    const [trigger, { isLoading: loadData, error: errorData }] = useGetQueryMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const response = await trigger(`${profileEP}/personal-data`);
        console.log('form data:', data)
        console.log('response:', response)
    }



    return (
        <form className={styles.onboard_form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Вход в Личный кабинет</h1>

            <div className={styles.content}>
                <div className={styles.inpt_box}>
                    <label htmlFor='login'>Логин</label>
                    <TextField
                        id="login"
                        fullWidth
                        variant="standard"
                        error={errors.login ? true : false}
                        {...register("login", { required: true })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='password'>Пароль</label>
                    <TextField
                        id="password"
                        fullWidth
                        variant="standard"
                        error={errors.password ? true : false}
                        {...register("password", { required: true })}
                    />
                </div>
            </div>


            <div className={styles.actions}>
                <input type="submit" value='Войти' className={styles.login_btn} />
                <p>
                    Нет аккаунта?&nbsp;
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </p>
            </div>
        </form>
    )
}
