import React from 'react';
import styles from './AuthLayout.module.css';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetQueryMutation } from "../../../store/slices/apiSlice";
import { usePostQueryMutation } from '../../../store/slices/apiSlice';


export default function LoginLayout() {
    const login = useSelector((state) => state.endpoints.login);
    const api = useSelector((state) => state.endpoints.api);

    const [trigger, { isLoading: loadData, error: errorData }] = useGetQueryMutation();
    const [trig, { isLoading: trigLoad, error: errorTrig }] = usePostQueryMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        //const response = await trigger(login);

        const res = await trig({ endpoint: api, body: data });
        console.log('POST response:', res)
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




/*------------------  РАБОТАЕТ  ------------------------------*/
/*
const accessToken = localStorage.getItem('accessToken');

fetch('http://188.225.36.233/users/me/hello', {
    method: 'GET',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },

})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
        */


/*------------------  РАБОТАЕТ  ------------------------------*/
/*
fetch('http://188.225.36.233/users/me/login', {
    method: 'POST',
    body: JSON.stringify({
        "username": "lalal",
        "password": "123"
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
    },
    
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
    })
*/