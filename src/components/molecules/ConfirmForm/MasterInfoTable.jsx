import React from 'react';
import './ConfirmItemStyles.css';


export default function MasterInfoTable({ title, acc_number, admin }) {
    return (
        <div className='confirm-form-box'>
            <h3 className='confirm-form-label'>{title}</h3>

            <table className='confirm-form-table'>
                <tbody>
                    <tr>
                        <td className='confirm-form-table-mark'>Мастер-счет:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{acc_number}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Администратор:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{admin}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
