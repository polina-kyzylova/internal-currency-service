import { http, HttpResponse, delay } from 'msw'
import { url } from '../store/slices/apiSlice'
import { EMPLOYEE_LIST } from './mockData'

// mock-обработчики эндпоинтов
export const handlers = [
	http.get(`${url}/users`, async () => {
		await delay(400)
		return HttpResponse.json({
			success: true,
			users: EMPLOYEE_LIST,
		})
	}),

	// /users/me/transactions
	// random - success/error

	http.get(`${url}/users/me`, async () => {
		return HttpResponse.json({
			account_balance: 120,
			account_number: '11111',
			balance: '333',
			name: 'hi',
			id: '29857298v3',
			owner_full_name: 'Ggygy',
			fsc_type: '',
		})
	}),

	http.get(`${url}/fsc/me`, async () => {
		return HttpResponse.json({
			account_number: '2000000000',
			balance: 12000,
			name: 'Стрим 20',
			id: 222,
			owner_full_name: 'См???',
			fsc_type: 'null',
		})
	}),
]

/*
	http.get('/api/fsc/:id', async ({ params }) => {
		const { id } = params
		await delay(400)

		return HttpResponse.json({
			success: true,
			data: {
				id: id,
				name: `CFO Project ${id}`,
				status: Math.random() > 0.5 ? 'active' : 'pending',
				created: new Date().toISOString(),
				// ... другие поля вашего CFO
			},
		})
	}),
    */

/*
	// Пример с ошибкой для тестирования
	http.get('/api/error-test', async () => {
		await delay(200)
		return HttpResponse.json(
			{
				success: false,
				error: 'Network error',
				details: 'Mock server is simulating an error',
			},
			{ status: 500 }
		)
	})
	*/

// Функция для генерации тестовых данных
function generateMockData(endpoint, method, body = null) {
	// В зависимости от эндпоинта возвращаем разные данные
	if (endpoint.includes('/users')) {
		return {
			users: Array.from({ length: 10 }, (_, i) => ({
				id: i + 1,
				name: `User ${i + 1}`,
				email: `user${i + 1}@example.com`,
				role: i === 0 ? 'admin' : 'user',
			})),
			total: 10,
			page: 1,
		}
	}

	if (endpoint.includes('/products')) {
		return {
			items: Array.from({ length: 5 }, (_, i) => ({
				id: i + 1,
				name: `Product ${i + 1}`,
				price: (i + 1) * 100,
				inStock: true,
			})),
		}
	}

	// Дефолтный ответ
	return {
		endpoint,
		method,
		body,
		message: 'Mock response from MSW',
		mockData: true,
	}
}
