import React, { useState } from 'react';
import styles from './ChangeOwnerUnit.module.css';
import '../GeneralOperations.css';
import { useForm } from "react-hook-form";
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import { useSelector } from 'react-redux';
import ChangeOwnerModal from '../../molecules/ChangeOwnerModal/ChangeOwnerModal';


export default function ChangeOwnerUnit() {
    const cfo = useSelector(state => state.admin);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm()

    const onSubmit = () => {
        handleOpen();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ChangeOwnerModal
                username={getValues('target_user_username')}
                name={getValues('target_user_name')}
                surname={getValues('target_user_surname')}
                lastname={getValues('target_user_lastname')}
                open={deleteModalOpen}
                handleClose={handleClose}
            />

            <div className={styles.container}>
                <div className={styles.card}>
                    <GrayButtonBack />

                    <div className={styles.content}>
                        <h1>Смена владельца ЦФО</h1>

                        <CFOInfoTable
                            title='Информация о ЦФО'
                            acc_number={parseInt(cfo.current_cfo_number).toLocaleString()}
                            acc_owner={cfo.current_owner_surname + ' ' + cfo.current_owner_name + ' ' + cfo.current_owner_lastname}
                            acc_title={cfo.current_cfo_title}
                        />

                        <UsersAutoList
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            title='Новый владелец:'
                            getValues={getValues}
                        />
                    </div>

                    <input type="submit" value='Сменить' className='operations-next-btn' />
                </div>
            </div>
        </form>
    )
}
