import { setupWorker } from 'msw/browser'
import { handlers } from './handler'

// настройки MSW (Mock Service Worker) для браузера
export const worker = setupWorker(...handlers)
