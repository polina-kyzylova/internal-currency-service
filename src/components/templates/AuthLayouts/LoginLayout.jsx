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
import AlertTitle from '@mui/material/AlertTitle';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { base64Decoding } from '../../../hooks/base64Decoding';
import { initUser, setUserRole } from '../../../store/slices/userSlice';
import { initAdmin } from '../../../store/slices/adminSlice';


export default function LoginLayout() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginEP = useSelector((state) => state.endpoints.login);
    const userDataEP = useSelector((state) => state.endpoints.user_data);

    const [loginUser, { isLoading: loginLoading }] = usePostQueryMutation();
    const [setupSession, { isLoading: setupLoading }] = useGetQueryMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


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



    const masterEP = useSelector((state) => state.endpoints.master_data);
    const [getMaster] = useGetQueryMutation();

    const setupAdmin = async () => {
        const result = await getMaster(masterEP);

        if (!!result) {
            dispatch(setUserRole({
                user_type: 'ROLE_ADMIN',
            }))
            dispatch(initAdmin({
                master_acc_number: result.account_number,
                master_acc_balance: result.amount,
            }))
            navigate('/admin')
        }
    }

    const setupOwner = () => {
        dispatch(setUserRole({
            user_type: 'ROLE_OWNER',
        }))
        navigate('/owner')
    }



    /*----- submit data -----*/
    const onSubmit = async (formData) => {
        const loginResponse = await loginUser({ endpoint: loginEP, body: formData });

        if (!!loginResponse.data) {
            localStorage.setItem("accessToken", loginResponse.data.accessToken);
            localStorage.setItem("refreshToken", loginResponse.data.refreshToken);

            const setupResponse = await setupSession(userDataEP);
            const token = loginResponse.data.accessToken;
            const decodedToken = base64Decoding(token);

            if (!!setupResponse.data) {
                dispatch(initUser({
                    user_id: setupResponse.data.user_id,
                    username: formData.username,
                    surname: setupResponse.data.surname,
                    name: setupResponse.data.name,
                    last_name: setupResponse.data.lastname,
                    email: setupResponse.data.email,
                    personal_acc_number: setupResponse.data.account_number,
                    personal_acc_balance: setupResponse.data.account_balance,
                }))

                if (decodedToken.role === 'ROLE_USER') {
                    dispatch(setUserRole({
                        user_type: 'ROLE_USER',
                    }))
                    navigate('/user')
                }
                else if (decodedToken.role === 'ROLE_OWNER') {
                    setupOwner();
                }
                else if (decodedToken.role === 'ROLE_ADMIN') {
                    setupAdmin();
                }
            }
        } else {
            handleClick(loginResponse.error.data.description);
        }
    }



    if (loginLoading || setupLoading) return <Loader />
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
