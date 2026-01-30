export const formatSum = (value) => {
	if (!value) return

	let rawValue = value
	if (typeof value === 'string') rawValue = parseInt(value)

	return rawValue ? rawValue?.toLocaleString('ru-RU', { maximumFractionDigits: 2 }) : ''
}
