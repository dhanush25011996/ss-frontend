import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import streakReducer from './slices/streakSlice';
import blogReducer from './slices/blogSlice';
import achievementReducer from './slices/achievementSlice';
import quoteReducer from './slices/quoteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    streak: streakReducer,
    blog: blogReducer,
    achievement: achievementReducer,
    quote: quoteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
