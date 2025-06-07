import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  achievements: [],
  unlockedAchievements: [],
  loading: false,
  error: null,
  categories: ['streak', 'community', 'milestone', 'special'],
  stats: {
    totalAchievements: 0,
    unlockedCount: 0,
    completionPercentage: 0,
  },
};

const achievementSlice = createSlice({
  name: 'achievement',
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
    setAchievements: (state, action) => {
      state.achievements = action.payload;
      state.stats.totalAchievements = action.payload.length;
      state.loading = false;
    },
    setUnlockedAchievements: (state, action) => {
      state.unlockedAchievements = action.payload;
      state.stats.unlockedCount = action.payload.length;
      state.stats.completionPercentage = state.stats.totalAchievements > 0 
        ? (action.payload.length / state.stats.totalAchievements) * 100 
        : 0;
    },
    unlockAchievement: (state, action) => {
      const achievement = action.payload;
      const existingIndex = state.unlockedAchievements.findIndex(a => a.id === achievement.id);
      
      if (existingIndex === -1) {
        state.unlockedAchievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString(),
        });
        
        // Update the achievement in the main list
        const achievementIndex = state.achievements.findIndex(a => a.id === achievement.id);
        if (achievementIndex !== -1) {
          state.achievements[achievementIndex].isUnlocked = true;
          state.achievements[achievementIndex].unlockedAt = new Date().toISOString();
        }
        
        // Update stats
        state.stats.unlockedCount = state.unlockedAchievements.length;
        state.stats.completionPercentage = state.stats.totalAchievements > 0 
          ? (state.unlockedAchievements.length / state.stats.totalAchievements) * 100 
          : 0;
      }
    },
    updateAchievementProgress: (state, action) => {
      const { achievementId, progress } = action.payload;
      const achievement = state.achievements.find(a => a.id === achievementId);
      
      if (achievement && !achievement.isUnlocked) {
        achievement.progress = progress;
        
        // Check if achievement should be unlocked
        if (progress >= achievement.maxProgress) {
          achievement.isUnlocked = true;
          achievement.unlockedAt = new Date().toISOString();
          
          // Add to unlocked achievements
          const existingIndex = state.unlockedAchievements.findIndex(a => a.id === achievementId);
          if (existingIndex === -1) {
            state.unlockedAchievements.push({
              ...achievement,
              unlockedAt: achievement.unlockedAt,
            });
            
            // Update stats
            state.stats.unlockedCount = state.unlockedAchievements.length;
            state.stats.completionPercentage = state.stats.totalAchievements > 0 
              ? (state.unlockedAchievements.length / state.stats.totalAchievements) * 100 
              : 0;
          }
        }
      }
    },
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
      state.stats.totalAchievements = state.achievements.length;
      state.stats.completionPercentage = state.stats.totalAchievements > 0 
        ? (state.stats.unlockedCount / state.stats.totalAchievements) * 100 
        : 0;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setAchievements,
  setUnlockedAchievements,
  unlockAchievement,
  updateAchievementProgress,
  addAchievement,
} = achievementSlice.actions;

// Selectors
export const selectAchievements = (state) => state.achievement.achievements;
export const selectUnlockedAchievements = (state) => state.achievement.unlockedAchievements;
export const selectAchievementLoading = (state) => state.achievement.loading;
export const selectAchievementError = (state) => state.achievement.error;
export const selectAchievementStats = (state) => state.achievement.stats;
export const selectAchievementCategories = (state) => state.achievement.categories;

// Filtered selectors
export const selectAchievementsByCategory = (category) => (state) => 
  state.achievement.achievements.filter(achievement => achievement.category === category);

export const selectUnlockedAchievementsByCategory = (category) => (state) => 
  state.achievement.unlockedAchievements.filter(achievement => achievement.category === category);

export default achievementSlice.reducer;
