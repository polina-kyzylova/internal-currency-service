import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import adminStandartCFOReducer from './slices/adminStandartCFOSlice';
import adminServiceCFOReducer from './slices/adminServiceCFOSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    adminCFO: adminStandartCFOReducer,
    adminServCFO: adminServiceCFOReducer,
  },
})