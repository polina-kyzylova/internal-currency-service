import React, { useState } from 'react'
import styles from './CFOAccount.module.css'
import cover from '../../../assets/cfo-acc.png'
import coin from '../../../assets/white_coin.svg'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { hideAccNumber } from '../../../hooks/hideAccNumber'

export default function CFOAccount({ cfo_balance, cfo_number }) {
	const [visible, setVisible] = useState(false)
	const hideNumber = cfo_number ? hideAccNumber(cfo_number) : ''

	return (
		<div className={styles.container}>
			<div className={styles.data}>
				<p className={styles.balance}>Баланс</p>

				<div className={styles.coin}>
					<p className={styles.amount}>{parseInt(cfo_balance).toLocaleString()}</p>
					<img src={coin} alt='coin' />
				</div>

				<div className={styles.acc_number}>
					<p>Счет ЦФО</p>

					<div className={styles.acc_nmbr}>
						<p>{visible ? parseInt(cfo_number).toLocaleString() : hideNumber}</p>
						{visible ? (
							<VisibilityIcon
								sx={{ fontSize: 30, cursor: 'pointer' }}
								onClick={() => setVisible(false)}
							/>
						) : (
							<VisibilityOffIcon
								sx={{ fontSize: 30, cursor: 'pointer' }}
								onClick={() => setVisible(true)}
							/>
						)}
					</div>
				</div>
			</div>

			<img src={cover} alt='CFO money account cover' className={styles.card_cover} />
		</div>
	)
}
