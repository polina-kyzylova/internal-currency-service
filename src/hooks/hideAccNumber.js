export const hideAccNumber = (accNumber) => {
	if (!accNumber) return ''

	const hiddenNumber = accNumber?.replace(
		accNumber?.slice(0, accNumber?.length - 4),
		'*'.repeat(accNumber?.length - 4)
	)

	return hiddenNumber
}
