export const getUserName = (data, variant) => {
	if (typeof data === 'string') {
		const splitData = data?.split(' ')
		return `${splitData?.[0] || ''} ${splitData?.[1][0] || ''}.${splitData?.[2][0] || ''}.`
	}

	if (variant === 'short') {
		return `${data?.target_user_surname} ${data?.target_user_name?.[0]}.${data?.target_user_lastname?.[0]}.`
	}

	return `${data?.target_user_surname} ${data?.target_user_name} ${data?.target_user_lastname}`
}
