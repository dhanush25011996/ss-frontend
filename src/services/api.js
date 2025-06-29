// src/services/api.js
import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add interceptor to attach Firebase ID token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const checkIn = async () => {
  const response = await api.post("/streak/check-in");
  return response.data;
};

export const getStreak = async (uid) => {
  const response = await api.get(`/streak/${uid}`);
  return response.data;
};

export const getDailyQuote = async () => {
  const response = await api.get(`/quote/fetch-daily-quote`);
  return response.data;
};

export const markQuoteAsFavorite = async (payload) => {
  const response = await api.post(`quote/create-favorite-quote`, payload);
  return response.data;
};

export const removeFavoriteQuote = async (payload) => {
  const response = await api.post(`quote/remove-favorite-quote`, payload);
  return response.data;
};

export default api;
