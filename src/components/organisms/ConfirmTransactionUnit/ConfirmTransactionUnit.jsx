import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ConfirmTransactionUnit() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Подтверждение действия</h1>
      <button onClick={() => navigate('../result')}>Перевести</button>
    </div>
  )
}
