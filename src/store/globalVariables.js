export const EMAIL_REGEXP =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/

export const RoleTypes = {
	User: 'ROLE_USER',
	Owner: 'ROLE_FSC_OWNER',
	Admin: 'ROLE_ADMIN',
}

export const globalPalette = [
	'#2FB3FF',
	'#141414',
	'#C4C4C4',
	'#91FF59',
	'#8000FF',
	'#F8ACFF',
	'#FF6C2E',
	'#F20089',
	'#1A00B3',
	'#00FF8A',
	'#FF4F60',
	'#FFFF3F',
	'#FFCAB1',
	'#874000',
	'#cf5c36',
	'#698f3f',
]

/*----- Mock data -----*/
export const globalServCFO = [
	{
		cfo_acc_number: 333333333331,
		cfo_acc_balance: 6700,
		cfo_id: 331,
		owner_id: 441,
		title: 'Активности',
		owner_name: 'Петренко И.И.',
	},
	{
		cfo_acc_number: 333333333332,
		cfo_acc_balance: 9900,
		cfo_id: 332,
		owner_id: 442,
		title: 'Магазин товаров',
		owner_name: 'Никитенко И.И.',
	},
	{
		cfo_acc_number: 333333333333,
		cfo_acc_balance: 5300,
		cfo_id: 333,
		owner_id: 443,
		title: 'Сервис 1',
		owner_name: 'Сидоренко И.И.',
	},
	{
		cfo_acc_number: 333333333334,
		cfo_acc_balance: 8100,
		cfo_id: 334,
		owner_id: 444,
		title: 'Сервис 2',
		owner_name: 'Иваненко И.И.',
	},
]

export const globalCFO = [
	{
		cfo_acc_number: 222222222221,
		cfo_acc_balance: 1590,
		cfo_id: 221,
		owner_id: 111,
		title: 'Название 1',
		owner_name: 'Васильев В.П.',
	},
	{
		cfo_acc_number: 222222222222,
		cfo_acc_balance: 3300,
		cfo_id: 222,
		owner_id: 112,
		title: 'Название 2',
		owner_name: 'Сидоров И.И.',
	},
	{
		cfo_acc_number: 222222222223,
		cfo_acc_balance: 2550,
		cfo_id: 223,
		owner_id: 113,
		title: 'Название 3',
		owner_name: 'Петров Е.В.',
	},
	{
		cfo_acc_number: 222222222224,
		cfo_acc_balance: 4100,
		cfo_id: 224,
		owner_id: 114,
		title: 'Название 4',
		owner_name: 'Иванов И.В.',
	},
]
