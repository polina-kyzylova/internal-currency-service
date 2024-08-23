import React from 'react';
import styles from './AuthLayout.module.css';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';


export default function RegistrationLayout() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
    }


    return (
        <form className={styles.onboard_form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Регистрация</h1>

            <div className={styles.content}>
                <div className={styles.inpt_box}>
                    <label htmlFor='fam_name'>Фамилия</label>
                    <TextField
                        id="fam_name"
                        fullWidth
                        variant="standard"
                        error={errors.fam_name ? true : false}
                        {...register("fam_name", { required: true })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='first_name'>Имя</label>
                    <TextField
                        id="login"
                        fullWidth
                        variant="standard"
                        error={errors.first_name ? true : false}
                        {...register("first_name", { required: true })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='last_name'>Отчество</label>
                    <TextField
                        id="last_name"
                        fullWidth
                        variant="standard"
                        error={errors.last_name ? true : false}
                        {...register("last_name", { required: true })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='email'>Email</label>
                    <TextField
                        id="email"
                        fullWidth
                        variant="standard"
                        error={errors.email ? true : false}
                        {...register("email", { required: true })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='password'>Придумайте пароль</label>
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
                <input type="submit" value='Зарегистрироваться' className={styles.login_btn} />
                <p>
                    Уже есть аккаунт?&nbsp;
                    <Link to={'/'}>Войти</Link>
                </p>
            </div>
        </form>
    )
}
