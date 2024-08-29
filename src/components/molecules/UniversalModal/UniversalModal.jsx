import React from 'react';
import styles from './UniversalModal.module.css';
import Modal from '@mui/material/Modal';


export default function UniversalModal({
    handleClose,
    targetOption,
    open,
    title,
    subtitle}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.container}>
                <div className={styles.modal_info}>
                    <h2 className={styles.modal_title}>{title}</h2>
                    <p>{subtitle}</p>
                </div>

                <div className={styles.manage}>
                    <button className={styles.back_btn} onClick={() => handleClose()}>Нет</button>
                    <button className={styles.delete_btn} onClick={() => targetOption()}>Да</button>
                </div>
            </div>
        </Modal>
    )
}
