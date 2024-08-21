import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import ownerReducer from './slices/ownerSlice';
import adminStandartCFOReducer from './slices/adminStandartCFOSlice';
import adminServiceCFOReducer from './slices/adminServiceCFOSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    admin: adminReducer,
    adminCFO: adminStandartCFOReducer,
    adminServCFO: adminServiceCFOReducer,
  },
})