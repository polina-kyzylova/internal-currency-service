export const USER_TAGS = [
	{ id: 'coffee', name: '☕️ За кофе' },
	{ id: 'gratitude', name: '🤝 Спасибо' },
	{ id: 'review', name: '💻 За код-ревью' },
	{ id: 'birthday', name: '🎁 С Днем Рождения!' },
	{ id: 'lunch', name: '🥗 За обед' },
]

export const CFO_TAGS = [
	{ id: 'team', name: '🤝 За командный дух' },
	{ id: 'lead', name: '🏆 За лидерство' },
	{ id: 'target', name: '🎯 За достижение целей' },
	{ id: 'ideas', name: '🚀 За новаторские идеи' },
]

export const USER_INCOME = [
	{ id: 'transactions', value: 250, label: 'Переводы' },
	{ id: 'encouragement', value: 150, label: 'Начисления из бюджета' },
	{ id: 'gifts', value: 100, label: 'Подарки' },
	{ id: 'activity', value: 100, label: 'Активности' },
]

export const USER_EXPENSES = [
	{ id: 'market', value: 10, label: 'Магазин' },
	{ id: 'activity', value: 20, label: 'Активности' },
	{ id: 'gifts', value: 30, label: 'Подарки' },
	{ id: 'transactions', value: 40, label: 'Переводы' },
]

/* ----------- История операций ----------- */
export const USER_PURPOSES = {
	encouragement: 'Начисление из бюджета',
	market: 'Покупка в маркете',
	transactions: 'Перевод пользователю',
	activity: 'Участие в активностях',
	gifts: 'Подарок',
}

export const USER_HISTORY = [
	{
		operation_type: 'expense',
		purpose_id: 'transactions',
		from_account_number: '1000000000',
		to_account_number: '1000000001',
		amount: 40,
		payment_comment: '👾 За релиз без багов',
		datetime: '2025-11-19T18:47:56+05:00',
	},
	{
		operation_type: 'income',
		purpose_id: 'transactions',
		from_account_number: '1000000000',
		to_account_number: '1000000004',
		amount: 250,
		payment_comment: '💻 Крутому разработчику :)',
		datetime: '2025-05-05T15:45:30+05:00',
	},
	{
		operation_type: 'expense',
		purpose_id: 'market',
		from_account_number: '1000000000',
		amount: 10,
		payment_comment: 'Футболка с логотипом Т1',
		datetime: '2025-04-25T18:47:56+05:00',
	},
	{
		operation_type: 'expense',
		purpose_id: 'gifts',
		from_account_number: '1000000000',
		to_account_number: '1000000002',
		amount: 30,
		payment_comment: '🌺 Поздравляю с 8 марта!',
		datetime: '2025-03-08T12:40:50+05:00',
	},
	{
		operation_type: 'income',
		purpose_id: 'encouragement',
		from_account_number: '1000000000',
		to_account_number: '1000000001',
		amount: 150,
		payment_comment: '🚀 За выдающиеся результаты работы!',
		datetime: '2024-12-27T16:30:12+05:00',
	},
	{
		operation_type: 'expense',
		purpose_id: 'activity',
		from_account_number: '1000000000',
		amount: 20,
		payment_comment: 'Участие в квизе',
		datetime: '2024-11-20T15:40:56+05:00',
	},
	{
		operation_type: 'income',
		purpose_id: 'gifts',
		from_account_number: '1000000000',
		to_account_number: '1000000005',
		amount: 100,
		payment_comment: '🎁 С Днем Рождения!',
		datetime: '2024-10-25T11:50:09+05:00',
	},
	{
		operation_type: 'income',
		purpose_id: 'activity',
		from_account_number: '1000000000',
		to_account_number: '1000000002',
		amount: 100,
		payment_comment: 'Участие в ИТ-лагере Т1 2024',
		datetime: '2024-08-31T18:40:07+05:00',
	},
]

export const CFO_HISTORY = [
	// 8 команд - распределение средств
	{
		operation_type: 'expense',
		purpose_id: 'transactions',
		from_account_number: '2000000000',
		to_account_number: '1000000001',
		amount: 40,
		payment_comment: 'За высокие показатели работы!',
		datetime: '2025-11-19T12:50:56+05:00',
	},
	{
		operation_type: 'income',
		purpose_id: 'encouragement',
		from_account_number: '3000000000',
		to_account_number: '2000000000',
		amount: 15600,
		payment_comment: 'Пополнение ЦФО администратором',
		datetime: '2025-07-01T09:12:56+05:00',
	},
]

export const ADMIN_HISTORY = []

/* ----------- Список получаталей ----------- */
export const EMPLOYEE_LIST = [
	{
		id: 1,
		username: 'PIvanov',
		surname: 'Иванов',
		name: 'Петр',
		lastname: 'Сергеевич',
		account_number: '1000000001',
	},
	{
		id: 2,
		username: 'MPopova',
		surname: 'Попова',
		name: 'Мария',
		lastname: 'Александровна',
		account_number: '1000000002',
	},
	{
		id: 3,
		username: 'IBerezin',
		surname: 'Березин',
		name: 'Иван',
		lastname: 'Алексеевич',
		account_number: '1000000003',
	},
	{
		id: 4,
		username: 'AVoronin',
		surname: 'Воронин',
		name: 'Александр',
		lastname: 'Сергеевич',
		account_number: '1000000004',
	},
	{
		id: 5,
		username: 'EVetrova',
		surname: 'Ветрова',
		name: 'Екатерина',
		lastname: 'Александровна',
		account_number: '1000000005',
	},
]

export const CFO_LIST = [
	{
		id: 1,
		name: 'Стрим 1',
		owner_full_name: 'Краснов Сергей Петрович',
		account_number: '2000000001',
	},
	{
		id: 2,
		name: 'Стрим 2',
		owner_full_name: 'Сидоров Иван Алексеевич',
		account_number: '2000000002',
	},
	{
		id: 3,
		name: 'Стрим 3',
		owner_full_name: 'Воробьева Анна Игоревна',
		account_number: '2000000003',
	},
	{
		id: 4,
		name: 'Стрим 4',
		owner_full_name: 'Золотова Ирина Павловна',
		account_number: '2000000004',
	},
	{
		id: 5,
		name: 'Стрим 5',
		owner_full_name: 'Грачев Александр Владимирович',
		account_number: '2000000005',
	},
]

/* ----------- Аналитика ----------- */
export const CFO_TEAM_LIST = [
	{
		id: '1',
		name: 'Кузнецов Д.М.',
		position: 'Lead QA Engineer',
		teamId: 'team_qa',
		team: 'Команда QA',
		expenses: 160,
	},
	{
		id: '2',
		name: 'Захарова К.А.',
		position: 'Head of Product',
		teamId: 'team_product',
		team: 'Команда Product',
		expenses: 210,
	},
	{
		id: '3',
		name: 'Петров И.И.',
		position: 'Senior Frontend Developer',
		teamId: 'team_frontend',
		team: 'Команда Frontend',
		expenses: 180,
	},
	{
		id: '4',
		name: 'Орлов Д.С.',
		position: 'Data Science Lead',
		teamId: 'team_data',
		team: 'Команда Data',
		expenses: 360,
	},
	{
		id: '5',
		name: 'Воробьева О.Л.',
		position: 'Senior iOS Developer',
		teamId: 'team_mobile',
		team: 'Команда Mobile',
		expenses: 115,
	},
	{
		id: '6',
		name: 'Морозова И.Г.',
		position: 'Senior QA Engineer',
		teamId: 'team_qa',
		team: 'Команда QA',
		expenses: 140,
	},
	{
		id: '7',
		name: 'Федорова А.С.',
		position: 'Lead UX/UI Designer',
		teamId: 'team_design',
		team: 'Команда Design',
		expenses: 155,
	},
	{
		id: '8',
		name: 'Иванова Е.С.',
		position: 'Senior Backend Developer',
		teamId: 'team_backend',
		team: 'Команда Backend',
		expenses: 190,
	},
	{
		id: '9',
		name: 'Сидоров А.А.',
		position: 'Middle Frontend Developer',
		teamId: 'team_frontend',
		team: 'Команда Frontend',
		expenses: 140,
	},
	{
		id: '10',
		name: 'Филиппова Н.В.',
		position: 'Senior DevOps Engineer',
		teamId: 'team_devops',
		team: 'Команда DevOps',
		expenses: 165,
	},
	{
		id: '11',
		name: 'Новиков Р.П.',
		position: 'Senior Android Developer',
		teamId: 'team_mobile',
		team: 'Команда Mobile',
		expenses: 180,
	},
	{
		id: '12',
		name: 'Белов А.Н.',
		position: 'Senior Product Manager',
		teamId: 'team_product',
		team: 'Команда Product',
		expenses: 175,
	},
	{
		id: '13',
		name: 'Краснова П.А.',
		position: 'Junior Frontend Developer',
		teamId: 'team_frontend',
		team: 'Команда Frontend',
		expenses: 190,
	},
	{
		id: '14',
		name: 'Григорьев М.П.',
		position: 'Senior ML Engineer',
		teamId: 'team_data',
		team: 'Команда Data',
		expenses: 235,
	},
	{
		id: '15',
		name: 'Лебедева Т.К.',
		position: 'Middle Mobile Developer',
		teamId: 'team_mobile',
		team: 'Команда Mobile',
		expenses: 135,
	},
	{
		id: '16',
		name: 'Павлова Л.М.',
		position: 'Senior Data Analyst',
		teamId: 'team_data',
		team: 'Команда Data',
		expenses: 260,
	},
	{
		id: '17',
		name: 'Волков С.Д.',
		position: 'Automation QA',
		teamId: 'team_qa',
		team: 'Команда QA',
		expenses: 130,
	},
	{
		id: '18',
		name: 'Сидоров А.Н.',
		position: 'Frontend Tech Lead',
		teamId: 'team_frontend',
		team: 'Команда Frontend',
		expenses: 110,
	},
	{
		id: '19',
		name: 'Васильев В.В.',
		position: 'Middle Backend Developer',
		teamId: 'team_backend',
		team: 'Команда Backend',
		expenses: 150,
	},
	{
		id: '20',
		name: 'Данилов П.О.',
		position: 'Data Scientist',
		teamId: 'team_data',
		team: 'Команда Data',
		expenses: 220,
	},
]
