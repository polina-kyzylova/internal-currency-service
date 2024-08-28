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

import { useDispatch, useSelector } from 'react-redux';
import { initCurrentCFO } from '../../../store/slices/adminSlice';
import { removeCurrentCFO } from '../../../store/slices/adminSlice';
import { updateCurrentCFO } from '../../../store/slices/adminSlice';
import { useGetCFOInfoMutation } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';



export default function AdminCFOPage() {
    const [modifTitle, setModifTitle] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [data, setData] = useOutletContext();
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const admin = useSelector(state => state.admin);
    const navigate = useNavigate();
    let { cfo_id } = useParams();
    const dispatch = useDispatch();


    /*----- get all CFO info by id and init store -----*/
    const [getCFOInfo, { isLoading: infoLoading }] = useGetCFOInfoMutation();

    const getMe = async () => {
        const result = await getCFOInfo({ cfo_id: cfo_id });
        if (!!result.data) {
            dispatch(initCurrentCFO({
                current_cfo_number: result.data.account_number,
                current_cfo_balance: result.data.balance,
                current_cfo_title: result.data.name,
                current_owner_username: result.data.owner_email,
                current_owner_name: null,
                current_owner_surname: null,
                current_owner_lastname: null,
                current_cfo_id: cfo_id,
                current_cfo_type: result.data.fsc_type,
                service_id: null,
                current_owner_fullname: result.data.owner_full_name,
            }))
        }
    }

    useEffect(() => {
        getMe()
    }, [])


    /*----- remove current CFO data from store -----*/
    function leaveCFO() {
        dispatch(removeCurrentCFO());
        navigate(-1);
    }


    /*----- change CFO title form -----*/
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


    /*----- render CFO card by type ------*/
    function cfoRender() {
        if (admin.current_cfo_type !== 'TEAM') {
            return (
                <div className={styles.cfo_variant}>
                    <ServiceCFOCard
                        status='ok'
                        service_title='Lalala'
                        service_id='123'
                    />

                    <div className={styles.cfo_service_card}>
                        <CFOAccount
                            cfo_balance={admin.current_cfo_balance}
                            cfo_number={admin.current_cfo_number}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <CFOAccount
                    cfo_balance={admin.current_cfo_balance}
                    cfo_number={admin.current_cfo_number}
                />
            )
        }

    }



    if (infoLoading) return <Loader />
    else return (
        <div className={styles.container}>
            <DeleteCFOModal
                cfo_id={cfo_id}
                cfo_title={admin.current_cfo_title}
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
                                {admin.current_owner_fullname}
                            </p>
                        </div>

                        <p className={styles.identif}>Email: {admin.current_owner_username}</p>
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
                                    <p className={styles.titl}>{admin.current_cfo_title}</p>
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
