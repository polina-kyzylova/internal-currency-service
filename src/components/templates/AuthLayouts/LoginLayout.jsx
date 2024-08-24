import React, { useState } from 'react';
import styles from './AuthLayout.module.css';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';

import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Loader from '../../atoms/Loader';
import Error from '../../atoms/Error';


export default function LoginLayout() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginEP = useSelector((state) => state.endpoints.login);
    const [loginUser, { isLoading: loginLoading, error: loginError }] = usePostQueryMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const response = await loginUser({ endpoint: loginEP, body: data });
        console.log('POST response:', response)
    }


    if (loginLoading) return <Loader />
    else if (loginError) return <Error />
    else return (
        <form className={styles.onboard_form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Вход в Личный кабинет</h1>

            <div className={styles.content}>
                <div className={styles.inpt_box}>
                    <label htmlFor='username'>Логин</label>
                    <TextField
                        id="username"
                        fullWidth
                        variant="standard"
                        error={errors.username ? true : false}
                        helperText={errors.username ? 'Неверный логин' : null}
                        {...register("username", { required: true, minLength: 2 })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='password'>Пароль</label>
                    <TextField
                        id="password"
                        fullWidth
                        variant="standard"
                        error={errors.password ? true : false}
                        helperText={errors.password ? 'Неверный пароль' : null}
                        {...register("password", { required: true, minLength: 8 })}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }}
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