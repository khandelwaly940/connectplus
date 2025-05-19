import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roadmapReducer from './slices/roadmapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roadmap: roadmapReducer,
  },
}); 