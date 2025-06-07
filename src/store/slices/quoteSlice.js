import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  dailyQuote: null,
  favoriteQuotes: [],
  loading: false,
  error: null,
  categories: [
    'motivation',
    'discipline',
    'success',
    'mindfulness',
    'growth',
    'wisdom'
  ],
  filters: {
    category: 'all',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: true,
  },
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setQuotes: (state, action) => {
      state.quotes = action.payload;
      state.loading = false;
    },
    addQuotes: (state, action) => {
      state.quotes = [...state.quotes, ...action.payload];
      state.loading = false;
    },
    setDailyQuote: (state, action) => {
      state.dailyQuote = action.payload;
    },
    addToFavorites: (state, action) => {
      const quote = action.payload;
      const existingIndex = state.favoriteQuotes.findIndex(q => q.id === quote.id);
      if (existingIndex === -1) {
        state.favoriteQuotes.push({
          ...quote,
          addedAt: new Date().toISOString(),
        });
      }
      
      // Update the quote in the main list
      const quoteIndex = state.quotes.findIndex(q => q.id === quote.id);
      if (quoteIndex !== -1) {
        state.quotes[quoteIndex].isFavorite = true;
      }
      
      // Update daily quote if it's the same
      if (state.dailyQuote && state.dailyQuote.id === quote.id) {
        state.dailyQuote.isFavorite = true;
      }
    },
    removeFromFavorites: (state, action) => {
      const quoteId = action.payload;
      state.favoriteQuotes = state.favoriteQuotes.filter(quote => quote.id !== quoteId);
      
      // Update the quote in the main list
      const quoteIndex = state.quotes.findIndex(q => q.id === quoteId);
      if (quoteIndex !== -1) {
        state.quotes[quoteIndex].isFavorite = false;
      }
      
      // Update daily quote if it's the same
      if (state.dailyQuote && state.dailyQuote.id === quoteId) {
        state.dailyQuote.isFavorite = false;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetQuotes: (state) => {
      state.quotes = [];
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        hasMore: true,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setQuotes,
  addQuotes,
  setDailyQuote,
  addToFavorites,
  removeFromFavorites,
  setFilters,
  setPagination,
  resetQuotes,
} = quoteSlice.actions;

// Selectors
export const selectQuotes = (state) => state.quote.quotes;
export const selectDailyQuote = (state) => state.quote.dailyQuote;
export const selectFavoriteQuotes = (state) => state.quote.favoriteQuotes;
export const selectQuoteLoading = (state) => state.quote.loading;
export const selectQuoteError = (state) => state.quote.error;
export const selectQuoteCategories = (state) => state.quote.categories;
export const selectQuoteFilters = (state) => state.quote.filters;
export const selectQuotePagination = (state) => state.quote.pagination;

// Filtered selectors
export const selectQuotesByCategory = (category) => (state) =>
  category === 'all'
    ? state.quote.quotes
    : state.quote.quotes.filter(quote => quote.category === category);

export const selectFavoriteQuotesByCategory = (category) => (state) =>
  category === 'all'
    ? state.quote.favoriteQuotes
    : state.quote.favoriteQuotes.filter(quote => quote.category === category);

export default quoteSlice.reducer;
