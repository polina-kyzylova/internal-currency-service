import React from 'react';
import './ConfirmItemStyles.css';


export default function UserInfoTable({ title, user_acc, user_name, user_phone}) {
    return (
        <div className='confirm-form-box'>
            <h3 className='confirm-form-label'>{title}</h3>

            <table className='confirm-form-table'>
                <tbody>
                    <tr>
                        <td className='confirm-form-table-mark'>ФИО:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{user_name}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Персональный счет:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{user_acc}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Телефон:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>+{user_phone}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
