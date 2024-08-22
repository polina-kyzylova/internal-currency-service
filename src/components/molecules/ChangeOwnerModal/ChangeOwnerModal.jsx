import React from 'react';
import styles from './ChangeOwnerModal.module.css';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import {updateCFO} from '../../../store/slices/cfoSlice';
import { useNavigate } from 'react-router-dom';


export default function ChangeOwnerModal({ handleClose, open, new_owner_name, new_owner_phone }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function cancelChanging() {
        handleClose();
    }

    function changeOwner() {
        handleClose();
        navigate(-1);
        /*----- Запрос на смену владельца -----*/
        dispatch(updateCFO({
            item: 'cfo_owner',
            new_value: 'new owner',
        }));
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.container}>
                <div className={styles.modal_info}>
                    <h2 className={styles.modal_title}>Вы уверены, что хотите сменить владельца ЦФО?</h2>

                    <div className={styles.modal_data}>
                        <p>Новый владелец: <span>{new_owner_name}</span></p>
                        <p>Телефон: <span>+{new_owner_phone}</span></p>
                    </div>
                </div>

                <div className={styles.manage}>
                    <button className={styles.back_btn} onClick={() => cancelChanging()}>Нет</button>
                    <button className={styles.delete_btn} onClick={() => changeOwner()}>Да</button>
                </div>
            </div>
        </Modal>
    )
}
