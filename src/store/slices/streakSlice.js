import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStreak: 0,
  bestStreak: 0,
  streakHistory: [],
  milestones: [7, 14, 30, 60, 90, 180, 365],
  nextMilestone: 7,
  progress: 0,
  loading: false,
  error: null,
  lastCheckIn: null,
};

const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    setStreakData: (state, action) => {
      const { currentStreak, bestStreak, streakHistory, lastCheckIn } = action.payload;
      state.currentStreak = currentStreak;
      state.bestStreak = bestStreak;
      state.streakHistory = streakHistory;
      state.lastCheckIn = lastCheckIn;
      
      // Calculate next milestone and progress
      const nextMilestone = state.milestones.find(m => m > currentStreak) || state.milestones[state.milestones.length - 1];
      state.nextMilestone = nextMilestone;
      state.progress = (currentStreak / nextMilestone) * 100;
    },
    incrementStreak: (state) => {
      state.currentStreak += 1;
      if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
      }
      state.lastCheckIn = new Date().toISOString();
      
      // Update progress
      const nextMilestone = state.milestones.find(m => m > state.currentStreak) || state.milestones[state.milestones.length - 1];
      state.nextMilestone = nextMilestone;
      state.progress = (state.currentStreak / nextMilestone) * 100;
    },
    resetStreak: (state) => {
      state.currentStreak = 0;
      state.nextMilestone = state.milestones[0];
      state.progress = 0;
    },
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
    addStreakEntry: (state, action) => {
      state.streakHistory.push(action.payload);
    },
  },
});

export const {
  setStreakData,
  incrementStreak,
  resetStreak,
  setLoading,
  setError,
  clearError,
  addStreakEntry,
} = streakSlice.actions;

// Selectors
export const selectCurrentStreak = (state) => state.streak.currentStreak;
export const selectBestStreak = (state) => state.streak.bestStreak;
export const selectStreakHistory = (state) => state.streak.streakHistory;
export const selectNextMilestone = (state) => state.streak.nextMilestone;
export const selectStreakProgress = (state) => state.streak.progress;
export const selectStreakLoading = (state) => state.streak.loading;
export const selectStreakError = (state) => state.streak.error;
export const selectLastCheckIn = (state) => state.streak.lastCheckIn;

export default streakSlice.reducer;
