import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store.js'
import { Provider } from 'react-redux'

// Асинхронно загружаем и запускаем MSW
const startMocks = async () => {
	try {
		// 1. Импортируем MSW
		const { worker } = await import('./mocks/browser.js')

		// 2. Запускаем
		await worker.start({
			onUnhandledRequest: 'bypass',
			serviceWorker: {
				url: '/mockServiceWorker.js',
			},
		})

		console.log('✅ MSW включен')
	} catch (error) {
		console.warn('⚠️ Не удалось запустить MSW:', error)
	}
}

// Запускаем немедленно
startMocks()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</PersistGate>
	</Provider>
)

reportWebVitals()
