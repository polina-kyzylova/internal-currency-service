import React, { useEffect, useState } from 'react';
import styles from './AdminCFOPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

import CreateIcon from '@mui/icons-material/Create';
import WestIcon from '@mui/icons-material/West';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteCFOModal from '../../molecules/DeleteCFOModal/DeleteCFOModal';

import { useDispatch } from 'react-redux';
import { initCFO } from '../../../store/slices/cfoSlice';
import { updateCFO } from '../../../store/slices/cfoSlice';
import { removeCFO } from '../../../store/slices/cfoSlice';




export default function AdminCFOPage() {
    const [modifTitle, setModifTitle] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const navigate = useNavigate();
    let { cfo_id } = useParams();
    const dispatch = useDispatch();


    /*----- Здесь нужно получить всю инфу ЦФО и положить в redux !!!-----*/
    const data_from_backend = {
        cfo_number: '333333333333',
        cfo_balance: '9000',
        cfo_title: 'Тестовое название',
        cfo_owner: 'Тестов Тест Тестович',
        cfo_id: cfo_id,
        owner_phone: '79992223344',
    }

    /*----- При первом обращении к карточке запрашиваем все данные ЦФО и сохраняем в redux -----*/
    useEffect(() => {
        dispatch(initCFO({
            cfo_number: data_from_backend.cfo_number,
            cfo_balance: data_from_backend.cfo_balance,
            cfo_title: data_from_backend.cfo_title,
            cfo_owner: data_from_backend.cfo_owner,
            cfo_id: cfo_id,
        }))
    }, [])

    function leaveCFO() {
        dispatch(removeCFO());
        navigate(-1);
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: data_from_backend.cfo_title,
            owner: data_from_backend.cfo_owner,
            cfo_number: data_from_backend.cfo_number,
            cfo_balance: data_from_backend.cfo_balance,
        }
    })

    const onSubmit = (data) => {
        setModifTitle(false);
        dispatch(updateCFO({
            item: 'cfo_title',
            new_value: data.title,
        }))
        /*----- + update title on server -----*/
    }


    return (
        <div className={styles.container}>
            <DeleteCFOModal
                cfo_id={cfo_id}
                cfo_title={data_from_backend.cfo_title}
                open={deleteModalOpen}
                handleClose={handleClose}
            />


            <div className={styles.header}>
                <button className='operations-prev-btn' onClick={() => leaveCFO()}>
                    <WestIcon sx={{ color: '#fff', fontSize: 35 }} />
                </button>

                <button className={styles.delete_btn} onClick={handleOpen}>Удалить ЦФО</button>
            </div>

            <div className={styles.content}>
                <CFOAccount
                    cfo_balance={data_from_backend.cfo_balance}
                    cfo_number={data_from_backend.cfo_number}
                />

                <div className={styles.buttons_box}>
                    <button className={styles.manage_btn} onClick={() => navigate('change-owner')}>Сменить владельца</button>
                    <button className={styles.manage_btn} onClick={() => navigate('transfer-cfo')}>Перевести</button>
                    <button className={styles.manage_btn} onClick={() => navigate('replenish-cfo')}>Пополнить</button>
                </div>

                <div className={styles.box}>
                    <div className={styles.card}>
                        <div className={styles.info}>
                            <p className={styles.identif}>Владелец:</p>
                            <p className={styles.titl}>{getValues('owner')}</p>
                        </div>

                        <p className={styles.identif}>Телефон: +{data_from_backend.owner_phone}</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.info}>
                            <label htmlFor='title' className={styles.identif}>Название:</label>
                            {modifTitle ?
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={styles.modif_item}>
                                        <TextField
                                            id="title"
                                            fullWidth
                                            variant="standard"
                                            error={errors.title ? true : false}
                                            {...register("title", { required: true })}
                                        />
                                        <button type='submit'>
                                            <CheckCircleIcon />
                                        </button>
                                    </div>
                                </form>
                                :
                                <div className={styles.modif_item}>
                                    <p className={styles.titl}>{getValues('title')}</p>
                                    <button onClick={() => setModifTitle(true)}>
                                        <CreateIcon />
                                    </button>
                                </div>
                            }
                        </div>

                        <p className={styles.identif}>ЦФО ID: {cfo_id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
