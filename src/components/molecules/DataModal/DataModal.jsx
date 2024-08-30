import React, { useState } from 'react';
import styles from './DataModal.module.css';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import AmountInput from '../../molecules/TransactionForm/AmountInput';
import { useSelector } from 'react-redux';
import { usePostQueryMutation } from '../../../store/slices/apiSlice';


export default function DataModal({ open, handleClose }) {
    const [isTopUp, setIsTopUp] = useState(true);
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const masterEP = useSelector((state) => state.endpoints.master_data);
    const [topUp] = usePostQueryMutation();

    const topMaster = async (x) => {
        const result = await topUp({ endpoint: masterEP, body: x });

        if (!!result) {
            setSuccess(true)
            setIsTopUp(false);
        }
        else {
            setSuccess(false);
            setIsTopUp(false);
        }
    }

    const onSubmit = (data) => {
        let x = {
            amount: data.amount
        }
        topMaster(x)
    }

    function showResult() {
        if (success) {
            return (
                <div className={styles.container}>
                    <p>Операция выполнена успешно!</p>
                    <button
                        className={styles.delete_btn}
                        onClick={() => {
                            handleClose();
                            setIsTopUp(true);
                            setValue('amount', '');
                        }}
                    >
                        Ок
                    </button>
                </div>
            )
        } else {
            <div className={styles.container}>
                <p>Ошибка, попробуйте позже</p>
                <button
                    className={styles.delete_btn}
                    onClick={() => {
                        handleClose();
                        setIsTopUp(true);
                        setValue('amount', '');
                    }}
                >
                    Ок
                </button>
            </div>
        }
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {isTopUp ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.container}>
                        <div className={styles.modal_info}>
                            <h2 className={styles.modal_title}>Введите сумму пополнения</h2>
                            <AmountInput
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div className={styles.manage}>
                            <button className={styles.back_btn} onClick={() => handleClose()}>Отменить</button>
                            <input type="submit" className={styles.delete_btn} value='Пополнить' />
                        </div>
                    </div>
                </form>
                : showResult()}
        </Modal>
    )
}
