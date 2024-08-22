import React from 'react';
import './TransactionItemStyles.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';


export default function CFOAutoList({ errors, register, title }) {
    const cfo = [
        { label: 'Название 1', owner: 'ФИО' },
        { label: 'Название 2', owner: 'ФИО' },
        { label: 'Название 3', owner: 'ФИО' },
        { label: 'Название 4', owner: 'ФИО' },
        { label: 'Название 5', owner: 'ФИО' },
        { label: 'Название 6', owner: 'ФИО' },
        { label: 'Название 7', owner: 'ФИО' },
        { label: 'Название 8', owner: 'ФИО' },
        { label: 'Название 9', owner: 'ФИО' },
        { label: 'Название 10', owner: 'ФИО' },
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
                        error={errors.recipient ? true : false}
                        {...register("recipient", { required: true, })}
                    />
                )}
            />
        </div>
    )
}
