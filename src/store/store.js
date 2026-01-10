import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'
import cfoReducer from './slices/cfoSlice'
import { apiSlice } from './slices/apiSlice.js'
import endpointsReducer from './slices/endpointsSlice.js'

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	endpoints: endpointsReducer,
	user: userReducer,
	cfo: cfoReducer,
	admin: adminReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [apiSlice.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
})

export const persistor = persistStore(store)
export default store
