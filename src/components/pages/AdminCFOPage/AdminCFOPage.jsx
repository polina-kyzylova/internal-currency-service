import React, { useEffect, useState } from 'react';
import styles from './AdminCFOPage.module.css';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

import CreateIcon from '@mui/icons-material/Create';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GrayButton from '../../atoms/GrayButton/GrayButton';

import { useDispatch, useSelector } from 'react-redux';
import { initCurrentCFO } from '../../../store/slices/adminSlice';
import { removeCurrentCFO } from '../../../store/slices/adminSlice';
import { updateCurrentCFO } from '../../../store/slices/adminSlice';
import { useGetCFOInfoMutation } from '../../../store/slices/apiSlice';
import Loader from '../../atoms/Loader';
import UniversalModal from '../../molecules/UniversalModal/UniversalModal';

import AdminCFOLayout from '../../templates/AdminCFOLayout/AdminCFOLayout';
import AdminServiceCFOLayout from '../../templates/AdminServiceCFOLayout/AdminServiceCFOLayout';



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


    function showCFO() {
        if (admin.current_cfo_type === 'TEAM') {
            return (
                <AdminCFOLayout
                    cfo_balance={admin.current_cfo_balance}
                    cfo_number={admin.current_cfo_number}
                />
            )
        } else {
            return (
                <AdminServiceCFOLayout
                    cfo_balance={admin.current_cfo_balance}
                    cfo_number={admin.current_cfo_number}
                />
            )
        }
    }



    if (infoLoading) return <Loader />
    else return (
        <div className={styles.container}>
            <UniversalModal
                open={deleteModalOpen}
                handleClose={handleClose}
                targetOption={handleClose}
                title='Вы уверены, что хотите удалить ЦФО?'
                subtitle={`Название: ${admin.current_cfo_title}`}
            />

            <div className={styles.header}>
                <GrayButton
                    direction='west'
                    onClick={() => leaveCFO()}
                />
                <button className={styles.delete_btn} onClick={handleOpen}>Удалить ЦФО</button>
            </div>


            <div className={styles.content}>
                {showCFO()}

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

