import React from 'react';
import './ConfirmItemStyles.css';


export default function CFOInfoTable({title, acc_number, acc_title, acc_owner}) {
    return (
        <div className='confirm-form-box'>
            <h3 className='confirm-form-label'>{title}</h3>

            <table className='confirm-form-table'>
                <tbody>
                    <tr>
                        <td className='confirm-form-table-mark'>Название ЦФО:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{acc_title}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Счет ЦФО:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{acc_number}</th>
                    </tr>
                    <tr>
                        <td className='confirm-form-table-mark'>Владелец:</td>
                        <td className='confirm-form-space'></td>
                        <th className='confirm-form-table-description'>{acc_owner}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
