import React, { useEffect, useState } from 'react';
import '../GeneralOperations.css';
import styles from './CreateTransferCFOUnit.module.css';
import GrayButtonBack from '../../atoms/GrayButtonBack/GrayButtonBack';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useGetQueryMutation } from '../../../store/slices/apiSlice';
import { useSelector } from 'react-redux';

import TransactionAccInfo from '../../molecules/TransactionAccInfo/TransactionAccInfo';
import UsersAutoList from '../../molecules/TransactionForm/UsersAutoList';
import CFOAutoList from '../../molecules/TransactionForm/CFOAutoList';
import AmountInput from '../../molecules/TransactionForm/AmountInput';
import PurposeTags from '../../molecules/PurposeTags/PurposeTags';



export default function CreateTransferCFOUnit({ setConfirmTransfer, current_user }) {
  const [data, setData] = useOutletContext();
  const admin = useSelector(state => state.admin);
  const owner = useSelector(state => state.cfo);
  const user = useSelector(state => state.user);

  const [recipType, setRecipType] = useState('personal');
  const [defValues, setDefValues] = useState();
  const [currentCFONumber, setCurrentCFOnumber] = useState();

  useEffect(() => {
    if (current_user === 'admin') {
      setDefValues({
        current_cfo_title: admin.current_cfo_title,
        current_cfo_number: admin.current_cfo_number,
        current_cfo_balance: admin.current_cfo_balance,
        current_cfo_owner: admin.current_owner_fullname,
        current_user: 'admin',
      })
      setCurrentCFOnumber(admin.current_cfo_number)
    }
    if (current_user === 'owner') {
      setDefValues({
        current_cfo_title: owner.cfo_title,
        current_cfo_number: owner.cfo_number,
        current_cfo_balance: owner.cfo_balance,
        current_cfo_owner: user.surname + ' ' + user.name + ' ' + user.last_name,
        current_user: 'owner',
      })
      setCurrentCFOnumber(owner.cfo_number)
    }
  }, [current_user])


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm()


  /*----- create user-to-user transaction -----*/
  const onSubmit = (d) => {
    if (parseInt(d.amount) === 0) {
      setError('amount', { type: 'custom', message: 'Некорректная сумма' });
    } else {
      if (current_user === 'owner' && parseInt(d.amount) > owner.cfo_balance) {
        setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
      }
      else if (current_user === 'admin' && parseInt(d.amount) > admin.current_cfo_balance) {
        setError('amount', { type: 'custom', message: 'Недостаточно средств для списания' });
      }
      else {
        setConfirmTransfer(true);
        setData({ ...defValues, ...d })
      }
    }
  }


  /*----- change recipient type -----*/
  function chooseRecipient() {
    if (recipType === 'personal') {
      return (
        <UsersAutoList
          title='Получатель'
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />)
    } else {
      return (
        <CFOAutoList
          title='Получатель'
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          current_cfo_number={currentCFONumber}
        />
      )
    }
  }


  /*----- get transaction purpose tags -----*/
  const [postReq] = useGetQueryMutation();
  const transCFOTagsEP = useSelector((state) => state.endpoints.cfo_purposes_tags);
  const [purposeTags, setPurposeTags] = useState();

  const getPaymentPurposes = async () => {
    const response = await postReq(transCFOTagsEP)
    if (!!response.data) setPurposeTags([...response.data.data])
  }

  useEffect(() => {
    getPaymentPurposes();
  }, [])



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <GrayButtonBack />

        <div className={styles.content}>
          <h1>Распределение средств ЦФО</h1>

          <TransactionAccInfo
            title='Счет списания'
            acc_type='Счет ЦФО'
            acc_number={current_user === 'owner' ? owner.cfo_number : admin.current_cfo_number}
            acc_balance={current_user === 'owner' ? owner.cfo_balance : admin.current_cfo_balance}
          />

          <div className={styles.inpt_box}>
            <label htmlFor='recipient_type'>Тип получателя</label>
            <select
              name="recipient_type"
              id="recipient_type"
              className={styles.select_type}
              {...register("recip_type", { required: true })}
              onChange={(e) => setRecipType(e.target.value)}
            >
              <option value="personal">Пользователь</option>
              <option value="cfo">Другой ЦФО</option>
            </select>
          </div>

          {chooseRecipient()}

          <AmountInput
            register={register}
            errors={errors}
          />

          <PurposeTags
            register={register}
            errors={errors}
            setValue={setValue}
            purposeTags={purposeTags}
          />
        </div>

        <input type="submit" value='Продолжить' className='operations-next-btn' />
      </div>
    </form>
  )
}
