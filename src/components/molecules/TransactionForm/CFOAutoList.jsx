import React from 'react';
import './TransactionItemStyles.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';


export default function CFOAutoList({ errors, register, title, setValue }) {
    const cfo = [
        { label: 'Название 1', owner: 'Сидоренко Сидор С.' },
        { label: 'Название 2', owner: 'Петренко Петр П.' },
        { label: 'Название 3', owner: 'Иваненко Иван И.' },
        { label: 'Название 4', owner: 'Быков Алексей А.' },
        { label: 'Название 5', owner: 'Волков Владимир В.' },
        { label: 'Название 6', owner: 'Зайцев Виктор В.' },
        { label: 'Название 7', owner: 'Щукин Игорь И.' },
        { label: 'Название 8', owner: 'Медведев Алексей А.' },
    ]


    return (
        <div className='transaction-form-input-box'>
            <label className='transaction-form-label' htmlFor='recipient'>{title}</label>

            <Autocomplete
                id="recipient"
                fullWidth
                options={cfo}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                    if (newValue) setValue('recip_cfo_owner', newValue.owner)
                }}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            {option.label}, Владелец: {option.owner}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputProps={{ ...params.inputProps }}
                        variant="standard"
                        error={errors.recip_cfo_title ? true : false}
                        {...register("recip_cfo_title", { required: true, })}
                    />
                )}
            />
        </div>
    )
}
