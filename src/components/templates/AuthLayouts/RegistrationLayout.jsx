import React, { useState } from 'react';
import styles from './AuthLayout.module.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';
import { useGetQueryMutation } from '../../../store/slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Loader from '../../atoms/Loader';
import { base64Decoding } from '../../../hooks/base64Decoding';
import { initUser } from '../../../store/slices/userSlice';
import AlertTitle from '@mui/material/AlertTitle';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';



export default function RegistrationLayout() {
    const [showPassword, setShowPassword] = useState(false);
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    const registEP = useSelector((state) => state.endpoints.registration);
    const userDataEP = useSelector((state) => state.endpoints.user_data);

    const [registUser, { isLoading: registLoading }] = usePostQueryMutation();
    const [setupSession, { isLoading: setupLoading }] = useGetQueryMutation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState('');
    const handleClick = (reason) => {
        setOpen(reason);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen('');
    };


    /*----- submit data -----*/
    const onSubmit = async (formData) => {
        const registResponse = await registUser({ endpoint: registEP, body: formData });

        if (!!registResponse.data) {
            localStorage.setItem("accessToken", registResponse.data.accessToken);
            localStorage.setItem("refreshToken", registResponse.data.refreshToken);

            const setupResponse = await setupSession(userDataEP);
            const token = registResponse.data.accessToken;
            const decodedToken = base64Decoding(token);

            if (!!setupResponse.data) {
                switch (decodedToken.role) {
                    case 'ROLE_USER':
                        dispatch(initUser({
                            user_type: 'ROLE_USER',
                            user_id: setupResponse.data.user_id,
                            username: formData.username,
                            surname: setupResponse.data.surname,
                            name: setupResponse.data.name,
                            last_name: setupResponse.data.lastname,
                            email: setupResponse.data.email,
                            personal_acc_number: setupResponse.data.account_number,
                            personal_acc_balance: setupResponse.data.account_balance,
                        }))
                        navigate('/user')
                        break;

                    case 'ROLE_OWNER':
                        break;
                    case 'ROLE_ADMIN':
                        break;
                }
            }
        } else {
            handleClick(registResponse.error.data.description);
        }
    }



    if (registLoading || setupLoading) return <Loader />
    else return (
        <form className={styles.onboard_form} onSubmit={handleSubmit(onSubmit)}>
            <Snackbar
                open={!!open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>Error</AlertTitle>
                    {open}
                </Alert>
            </Snackbar>

            <h1>Регистрация</h1>

            <div className={styles.content}>
                <div className={styles.inpt_box}>
                    <label htmlFor='surname'>Фамилия</label>
                    <TextField
                        id="surname"
                        fullWidth
                        variant="standard"
                        error={errors.surname ? true : false}
                        helperText={errors.surname ? 'Некорректная длина строки' : null}
                        {...register("surname", { required: true, minLength: 2 })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='name'>Имя</label>
                    <TextField
                        id="name"
                        fullWidth
                        variant="standard"
                        error={errors.name ? true : false}
                        helperText={errors.name ? 'Некорректная длина строки' : null}
                        {...register("name", { required: true, minLength: 2 })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='lastname'>Отчество</label>
                    <TextField
                        id="lastname"
                        fullWidth
                        variant="standard"
                        error={errors.lastname ? true : false}
                        helperText={errors.lastname ? 'Некорректная длина строки' : null}
                        {...register("lastname", { required: true, minLength: 2 })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='email'>Email</label>
                    <TextField
                        id="email"
                        fullWidth
                        variant="standard"
                        error={errors.email ? true : false}
                        helperText={errors.email ? 'Некорректный email' : null}
                        {...register("email", { required: true, pattern: EMAIL_REGEXP })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='username'>Придумайте логин</label>
                    <TextField
                        id="username"
                        fullWidth
                        variant="standard"
                        error={errors.username ? true : false}
                        helperText={errors.username ? 'Некорректная длина строки' : null}
                        {...register("username", { required: true, minLength: 2 })}
                    />
                </div>

                <div className={styles.inpt_box}>
                    <label htmlFor='password'>Придумайте пароль</label>
                    <TextField
                        id="password"
                        fullWidth
                        variant="standard"
                        error={errors.password ? true : false}
                        helperText={errors.password ? 'Ненадежный пароль' : null}
                        {...register("password", { required: true, minLength: 8, pattern: PASS_REGEXP })}
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
                <input type="submit" value='Зарегистрироваться' className={styles.login_btn} />
                <p>
                    Уже есть аккаунт?&nbsp;
                    <Link to={'/'}>Войти</Link>
                </p>
            </div>
        </form >
    )
}




