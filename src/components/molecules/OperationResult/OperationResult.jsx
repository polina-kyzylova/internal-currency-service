import React from 'react'
import styles from './OperationResult.module.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import happy from '../../../assets/happy.png'
import sad from '../../../assets/sad.png'

export default function OperationResult() {
	let { status } = useParams()
	const navigate = useNavigate()

	if (status === 'ok') {
		return (
			<div className={styles.container}>
				<img src={happy} alt='Success transaction' />
				<h2>Операция успешно выполнена!</h2>

				<button className={styles.return_btn} onClick={() => navigate(-2)}>
					На главную
				</button>
			</div>
		)
	} else {
		return (
			<div className={styles.container_error}>
				<img src={sad} alt='Error transaction' />
				<h2>Ошибка! Повторите операцию позже</h2>

				<button className={styles.return_btn} onClick={() => navigate(-2)}>
					На главную
				</button>
			</div>
		)
	}
}
