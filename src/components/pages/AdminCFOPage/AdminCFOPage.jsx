import React, { useState } from 'react';
import styles from './AdminCFOPage.module.css';
import { useParams } from 'react-router-dom';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

import CreateIcon from '@mui/icons-material/Create';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import DeleteCFOModal from '../../molecules/DeleteCFOModal/DeleteCFOModal';



export default function AdminCFOPage() {
    const [modifTitle, setModifTitle] = useState(false);
    const [modifOwner, setModifOwner] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);



    let { cfo_id } = useParams();

    const users = [
        { label: 'Петров Петр Петрович', phone: '79999999999' },
        { label: 'Петров Петр Петрович', phone: '79999999998' },
        { label: 'Петров Петр Петрович', phone: '79999999997' },
        { label: 'Петров Петр Петрович', phone: '79999999996' },
        { label: 'Петров Петр Петрович', phone: '79999999995' },
        { label: 'Петров Петр Петрович', phone: '79999999994' },
        { label: 'Петров Петр Петрович', phone: '79999999993' },
        { label: 'Петров Петр Петрович', phone: '79999999992' },
        { label: 'Петров Петр Петрович', phone: '79999999991' },
    ]

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: 'Название',
            owner: 'ФИО',
        }
    })

    const onSubmit = (data) => { console.log(data) }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DeleteCFOModal
                cfo_id={cfo_id}
                cfo_title={getValues('title')}
                open={deleteModalOpen}
                handleClose={handleClose}
            />




            <div className={styles.container}>
                <div className={styles.header}>
                    <GrayButtonBack />
                    <button className={styles.delete_btn} onClick={handleOpen}>Удалить ЦФО</button>
                </div>


                <div className={styles.content}>
                    <CFOAccount />

                    <div className={styles.buttons_box}>
                        <button className={styles.manage_btn}>Сменить владельца</button>
                        <button className={styles.manage_btn}>Перевести</button>
                        <button className={styles.manage_btn}>Пополнить</button>
                    </div>

                    <div className={styles.box}>
                        <div className={styles.card}>
                            <div className={styles.info}>
                                <p className={styles.identif}>Владелец:</p>
                                <p className={styles.titl}>{getValues('owner')}</p>
                            </div>

                            <p className={styles.identif}>Телефон: </p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.info}>
                                <label htmlFor='title' className={styles.identif}>Название:</label>
                                {modifTitle ?
                                    <div className={styles.modif_item}>
                                        <TextField
                                            id="title"
                                            fullWidth
                                            variant="standard"
                                            error={errors.title ? true : false}
                                            {...register("title", { required: true })}
                                        />
                                        <button onClick={() => setModifTitle(false)}>
                                            <CheckCircleIcon />
                                        </button>
                                    </div>
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
        </form>
    )
}
