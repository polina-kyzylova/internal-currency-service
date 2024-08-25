import React, { useEffect, useState } from 'react';
import './TransactionItemStyles.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useGetQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';


function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}




export default function UsersAutoList({ errors, register, title, setValue }) {
    const users = [
        { label: 'Петров Петр П.', phone: '79999999999' },
        { label: 'Петров Петр П.', phone: '79999999998' },
        { label: 'Петров Петр П.', phone: '79999999997' },
        { label: 'Петров Петр П.', phone: '79999999996' },
        { label: 'Петров Петр П.', phone: '79999999995' },
        { label: 'Петров Петр П.', phone: '79999999994' },
        { label: 'Петров Петр П.', phone: '79999999993' },
        { label: 'Петров Петр П.', phone: '79999999992' },
        { label: 'Петров Петр П.', phone: '79999999991' },
    ]



    const transHistEP = useSelector((state) => state.endpoints.transactions_hist);
    const [getUsers] = useGetQueryMutation();



    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await getUsers(transHistEP);

            if (active) {
                setOptions([...users]);
            }
        })();

        return () => {
            active = false;
        };

    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);









    return (
        <div className='transaction-form-input-box'>
            <label className='transaction-form-label' htmlFor='recipient'>{title}</label>

            <Autocomplete
                id="recipient"
                fullWidth
                options={users}
                autoHighlight
                getOptionLabel={(option) => option.phone}
                onChange={(event, newValue) => {
                    if (newValue) setValue('user_name', newValue.label)
                }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                loading={loading}



                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            <Avatar sx={{ backgroundColor: 'var(--dark-gray)', marginRight: '1rem' }}>
                                <PersonIcon sx={{ color: '#fff', fontSize: 20 }} />
                            </Avatar>
                            {option.label} +{option.phone}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputProps={{ ...params.inputProps }}
                        variant="standard"
                        error={errors.user_phone ? true : false}
                        {...register("user_phone", { required: true, })}

                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}
