import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import cfoReducer from './slices/cfoSlice';
import adminStandartCFOReducer from './slices/adminStandartCFOSlice';
import adminServiceCFOReducer from './slices/adminServiceCFOSlice';


const rootReducer = combineReducers({
  user: userReducer,
  cfo: cfoReducer,
  admin: adminReducer,
  adminCFO: adminStandartCFOReducer,
  adminServCFO: adminServiceCFOReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;