import React, { useEffect, useState } from 'react';
import './TransactionItemStyles.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useGetCFOListMutation } from '../../../store/slices/apiSlice';
import { CircularProgress } from '@mui/material';


export default function CFOAutoList({ errors, register, title, setValue, getValues, current_cfo_number }) {
    const [getCFO] = useGetCFOListMutation();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            let x = await getCFO({ name: getValues("recip_cfo_title"), page: '1', size: '100' });
            if (active) {
                let result = x.data.data.filter((item) => item.account_number !== current_cfo_number);
                setOptions([...result])
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
                options={options}
                autoHighlight
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setValue('recip_cfo_owner', newValue.owner_full_name)
                        setValue('recip_cfo_number', newValue.account_number)
                        setValue('cfo_id', newValue.id)
                    }
                }}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            {option.name}, Владелец: {option.owner_full_name}
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
