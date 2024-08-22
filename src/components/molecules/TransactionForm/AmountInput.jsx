import React from 'react';
import './TransactionItemStyles.css';
import TextField from '@mui/material/TextField';


export default function AmountInput({ register, errors }) {
    return (
        <div className='transaction-form-input-box '>
            <label className='transaction-form-label' htmlFor='amount'>Сумма</label>

            <TextField
                id="amount"
                fullWidth
                variant="standard"
                error={errors.amount ? true : false}
                helperText={errors.amount ? errors.amount.message : null}
                type='number'
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                        e.preventDefault()
                    }
                    if (e.key === "ArrowDown" && e.target.value <= 0) {
                        e.preventDefault()
                    }
                }}
                {...register("amount", { required: true })}
            />
        </div>
    )
}
