import React from 'react';
import './ConfirmItemStyles.css';


export default function OperationTypeTable({ operation_type, amount, message }) {
    return (
        <div className='confirm-form-box'>
            <h3 className='confirm-form-label'>Операция</h3>

            <table className='confirm-form-table'>
                <tbody>
                    <tr>
                        <td className='confirm-form-table-mark'>Тип операции:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{operation_type}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Сумма:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{amount} коинов</th>
                    </tr>
                    {message ?
                        <tr>
                            <td className='confirm-form-table-mark'>Сообщение:</td>
                            <td className='confirm-form-space'></td>
                            <th className='confirm-form-table-description'>{message}</th>
                        </tr>
                        : null
                    }
                </tbody>
            </table>
        </div>
    )
}
