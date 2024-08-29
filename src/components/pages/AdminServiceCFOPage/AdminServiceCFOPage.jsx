import React from 'react';
import './AdminServiceCFOPage.module.css';
import GrayButton from '../../atoms/GrayButton/GrayButton';


export default function AdminServiceCFOPage() {
    return (
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

                        <div className={styles.buttons_box}>
                            <button className={styles.manage_btn} onClick={() => navigate('change-owner')}>Сменить владельца</button>
                            <button className={styles.manage_btn} onClick={() => navigate('replenish-cfo')}>Пополнить</button>
                        </div>
                    </div>
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
