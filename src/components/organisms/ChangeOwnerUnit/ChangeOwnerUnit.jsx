import React, { useEffect, useState } from 'react';
import styles from './ChangeOwnerUnit.module.css';
import '../GeneralOperations.css';
import { useForm } from "react-hook-form";
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import CFOInfoTable from '../../molecules/ConfirmForm/CFOInfoTable';
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import { useSelector } from 'react-redux';
import ChangeOwnerModal from '../../molecules/ChangeOwnerModal/ChangeOwnerModal';


export default function ChangeOwnerUnit() {
    const cfo = useSelector(state => state.cfo);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpen = () => setDeleteModalOpen(true);
    const handleClose = () => setDeleteModalOpen(false);

    const [recipName, setRecipName] = useState('');
    const [recipPhone, setRecipPhone] = useState('');

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        handleOpen();
    }


    useEffect(() => {
        const x = getValues('recipient');
        const l = x.split(' ');
        setRecipName(`${l[0]} ${l[1]} ${l[2]}`);
        setRecipPhone(l[3]);

    }, [getValues('recipient')])



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ChangeOwnerModal
                new_owner_phone={recipPhone}
                new_owner_name={recipName}
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
                            acc_number={parseInt(cfo.cfo_number).toLocaleString()}
                            acc_owner={cfo.cfo_owner}
                            acc_title={cfo.cfo_title}
                        />

                        <UsersAutoList
                            errors={errors}
                            register={register}
                            title='Новый владелец:'
                        />
                    </div>

                    <input type="submit" value='Сменить' className='operations-next-btn' />
                </div>
            </div>
        </form>
    )
}
