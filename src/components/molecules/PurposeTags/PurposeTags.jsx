import React from 'react';
import styles from './PurposeTags.module.css';
import TextField from '@mui/material/TextField';


export default function PurposeTags({ register, errors, setValue, purposeTags }) {
    return (
        <div className={styles.mess}>
            <div className={styles.inpt_box}>
                <label htmlFor='purpose_message'>Сообщение</label>
                <TextField
                    id="purpose_message"
                    fullWidth
                    variant="standard"
                    error={errors.purpose_message ? true : false}
                    {...register("purpose_message", { required: true })}
                    onKeyDown={(e) => {
                        setValue('purpose_message', `${e.target.value}`)
                        setValue('purpose_id', `${purposeTags.filter((item) => item.name === 'Другое').map(item => item.id)}`)
                    }}
                />
            </div>

            <div className={styles.tags}>
                {!!purposeTags ?
                    purposeTags.filter((item) => item.name !== 'Другое').map((item) => {
                        return (
                            <span
                                key={item.id}
                                className={styles.message_tag}
                                onClick={() => {
                                    setValue('purpose_message', `${item.name}`)
                                    setValue('purpose_id', `${item.id}`)
                                }}
                            >
                                {item.name}
                            </span>
                        )
                    }) : null}
            </div>
        </div>
    )
}
