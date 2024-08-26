import React, { useEffect, useState } from 'react';
import styles from './AdminCFOPage.module.css';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

import CreateIcon from '@mui/icons-material/Create';
import WestIcon from '@mui/icons-material/West';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteCFOModal from '../../molecules/DeleteCFOModal/DeleteCFOModal';
import ServiceCFOCard from '../../molecules/ServiceCFOCard/ServiceCFOCard';

import { useDispatch } from 'react-redux';
import { initCurrentCFO } from '../../../store/slices/adminSlice';
import { removeCurrentCFO } from '../../../store/slices/adminSlice';
import { updateCurrentCFO } from '../../../store/slices/adminSlice';




export default function AdminCFOPage() {
    const [modifTitle, setModifTitle] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [data, setData] = useOutletContext();
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const navigate = useNavigate();
    let { cfo_id } = useParams();
    const dispatch = useDispatch();


    /*----- Здесь нужно получить всю инфу ЦФО и положить в redux !!!-----*/
    const mock = {
        current_cfo_number: '121212121212',
        current_cfo_balance: 5000,
        current_cfo_title: 'Мое админское ЦФО',
        current_owner_username: 'alex',
        current_owner_name: 'Алексей',
        current_owner_surname: 'Щербаков',
        current_owner_lastname: 'Дмитриевич',
        cfo_id: cfo_id,
        current_cfo_type: 'personal',
        service_id: '123',
    }

    /*----- При первом обращении к карточке запрашиваем все данные ЦФО и сохраняем в redux -----*/
    useEffect(() => {
        dispatch(initCurrentCFO({
            current_cfo_number: mock.current_cfo_number,
            current_cfo_balance: mock.current_cfo_balance,
            current_cfo_title: mock.current_cfo_title,
            current_owner_username: mock.current_owner_username,
            current_owner_name: mock.current_owner_name,
            current_owner_surname: mock.current_owner_surname,
            current_owner_lastname: mock.current_owner_lastname,
            current_cfo_id: cfo_id,
            current_cfo_type: mock.current_cfo_type,
            service_id: mock.service_id
        }))
    }, [])

    function leaveCFO() {
        dispatch(removeCurrentCFO());
        navigate(-1);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setData(data);
        setModifTitle(false);
        dispatch(updateCurrentCFO({
            item: 'current_cfo_title',
            new_value: data.title,
        }))
        /*----- + update title on server -----*/
    }


    function cfoRender() {
        if (mock.cfo_type === 'service') {
            return (
                <div className={styles.cfo_variant}>
                    <ServiceCFOCard
                        status='ok'
                        service_title='Lalala'
                        service_id='123'
                    />

                    <div className={styles.cfo_service_card}>
                        <CFOAccount
                            cfo_balance={mock.current_cfo_balance}
                            cfo_number={mock.current_cfo_number}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <CFOAccount
                    cfo_balance={mock.current_cfo_balance}
                    cfo_number={mock.current_cfo_number}
                />
            )
        }

    }




    return (
        <div className={styles.container}>
            <DeleteCFOModal
                cfo_id={cfo_id}
                cfo_title={mock.current_cfo_title}
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
                {cfoRender()}

                <div className={styles.buttons_box}>
                    <button className={styles.manage_btn} onClick={() => navigate('change-owner')}>Сменить владельца</button>
                    <button className={styles.manage_btn} onClick={() => navigate('transfer-cfo')}>Перевести</button>
                    <button className={styles.manage_btn} onClick={() => navigate('replenish-cfo')}>Пополнить</button>
                </div>

                <div className={styles.box}>
                    <div className={styles.card}>
                        <div className={styles.info}>
                            <p className={styles.identif}>Владелец:</p>
                            <p className={styles.titl}>
                                {mock.current_owner_surname + ' ' + mock.current_owner_name + ' ' + mock.current_owner_lastname}
                            </p>
                        </div>

                        <p className={styles.identif}>Username: {mock.current_owner_username}</p>
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
                                    <p className={styles.titl}>{mock.current_cfo_title}</p>
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
