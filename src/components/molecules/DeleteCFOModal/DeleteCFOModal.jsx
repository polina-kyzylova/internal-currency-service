import React from 'react';
import styles from './DeleteCFOModal.module.css';
import Modal from '@mui/material/Modal';


export default function DeleteCFOModal({ cfo_id, cfo_title, open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.container}>
                <div className={styles.modal_info}>
                    <h2 className={styles.modal_title}>Вы уверены, что хотите удалить ЦФО?</h2>

                    <div className={styles.modal_data}>
                        <p>Название: <span>{cfo_title}</span></p>
                        <p>ID: <span>{cfo_id}</span></p>
                    </div>
                </div>

                <div className={styles.manage}>
                    <button className={styles.back_btn} onClick={handleClose}>Нет</button>
                    <button className={styles.delete_btn} >Да</button>
                </div>
            </div>
        </Modal>
    )
}
