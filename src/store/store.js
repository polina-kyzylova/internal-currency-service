import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adminStandartCFOReducer from './slices/adminStandartCFOSlice';
import adminServiceCFOReducer from './slices/adminServiceCFOSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    adminCFO: adminStandartCFOReducer,
    adminServCFO: adminServiceCFOReducer,
  },
})