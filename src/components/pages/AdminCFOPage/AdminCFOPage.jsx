import React, { useEffect, useState } from 'react';
import styles from './AdminCFOPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import CFOAccount from '../../molecules/CFOAccount/CFOAccount';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";

import CreateIcon from '@mui/icons-material/Create';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteCFOModal from '../../molecules/DeleteCFOModal/DeleteCFOModal';
import { useOutletContext } from 'react-router-dom';



export default function AdminCFOPage() {
    const [modifTitle, setModifTitle] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const navigate = useNavigate();
    let { cfo_id } = useParams();


    /*----- Здесь нужно получить всю необходимую инфу и положить в outlet context !!!-----*/
    const mock_cfo_data = {
        cfo_title: 'Тестовое название',
        cfo_number: '888888888888',
        cfo_balance: '8800',
        cfo_owner: 'Тестовый Владелец ЦФО',
        cfo_id: cfo_id,
    };
    const [data, setData] = useOutletContext();

    useEffect(() => {
        setData(mock_cfo_data);
    }, [])



    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: mock_cfo_data.cfo_title,
            owner: mock_cfo_data.cfo_owner,
            cfo_number: mock_cfo_data.cfo_number,
            cfo_balance: mock_cfo_data.cfo_balance,
        }
    })

    const onSubmit = (data) => {
        setModifTitle(false);
        console.log('New CFO title: ', data);
        setData(data);
    }




    return (
        <div className={styles.container}>
            <DeleteCFOModal
                cfo_id={cfo_id}
                cfo_title={getValues('title')}
                open={deleteModalOpen}
                handleClose={handleClose}
            />


            <div className={styles.header}>
                <GrayButtonBack />
                <button className={styles.delete_btn} onClick={handleOpen}>Удалить ЦФО</button>
            </div>

            <div className={styles.content}>
                <CFOAccount
                    cfo_balance={mock_cfo_data.cfo_balance}
                    cfo_number={mock_cfo_data.cfo_number}
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

                        <p className={styles.identif}>Телефон: </p>
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
