import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  LinearProgress,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AchievementBadge } from '../components/features';
import { Loading } from '../components/common';
import {
  selectAchievements,
  selectAchievementStats,
  selectAchievementCategories,
  selectAchievementLoading
} from '../store/slices/achievementSlice';

const Achievements = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const achievements = useSelector(selectAchievements);
  const stats = useSelector(selectAchievementStats);
  const categories = useSelector(selectAchievementCategories);
  const loading = useSelector(selectAchievementLoading);

  // Mock data for demonstration
  const mockAchievements = [
    {
      id: 1,
      title: "First Week",
      description: "Complete your first 7-day streak",
      icon: "fire",
      isUnlocked: true,
      rarity: "common",
      unlockedAt: "2024-01-15T10:30:00Z",
      category: "streak"
    },
    {
      id: 2,
      title: "Community Member",
      description: "Join the Semen Sage community",
      icon: "group",
      isUnlocked: true,
      rarity: "common",
      unlockedAt: "2024-01-10T14:20:00Z",
      category: "community"
    },
    {
      id: 3,
      title: "Two Week Warrior",
      description: "Maintain a 14-day streak",
      icon: "fire",
      isUnlocked: false,
      progress: 8,
      maxProgress: 14,
      rarity: "uncommon",
      category: "streak"
    },
    {
      id: 4,
      title: "Helpful Guide",
      description: "Get 50 likes on your posts",
      icon: "heart",
      isUnlocked: false,
      progress: 37,
      maxProgress: 50,
      rarity: "rare",
      category: "community"
    },
    {
      id: 5,
      title: "Month Master",
      description: "Complete a 30-day streak",
      icon: "trophy",
      isUnlocked: false,
      progress: 0,
      maxProgress: 30,
      rarity: "epic",
      category: "streak"
    },
    {
      id: 6,
      title: "Sage Status",
      description: "Maintain a 90-day streak",
      icon: "star",
      isUnlocked: false,
      progress: 0,
      maxProgress: 90,
      rarity: "legendary",
      category: "streak"
    }
  ];

  const mockStats = {
    totalAchievements: mockAchievements.length,
    unlockedCount: mockAchievements.filter(a => a.isUnlocked).length,
    completionPercentage: (mockAchievements.filter(a => a.isUnlocked).length / mockAchievements.length) * 100
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredAchievements = currentTab === 'all'
    ? mockAchievements
    : mockAchievements.filter(achievement => achievement.category === currentTab);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Achievements
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track your progress and unlock rewards on your journey.
        </Typography>

        {/* Progress Overview */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Overall Progress
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {mockStats.unlockedCount} of {mockStats.totalAchievements} Achievements
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(mockStats.completionPercentage)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mockStats.completionPercentage}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Paper sx={{ p: 2, flex: 1, minWidth: 120, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main" fontWeight={600}>
                    {mockStats.unlockedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unlocked
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, minWidth: 120, textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main" fontWeight={600}>
                    {mockStats.totalAchievements - mockStats.unlockedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Remaining
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Category Tabs */}
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          <Tab label="All" value="all" />
          <Tab label="Streak" value="streak" />
          <Tab label="Community" value="community" />
          <Tab label="Milestone" value="milestone" />
          <Tab label="Special" value="special" />
        </Tabs>

        {/* Achievements Grid */}
        {loading ? (
          <Loading type="card-skeleton" />
        ) : (
          <Grid container spacing={3}>
            {filteredAchievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.id}>
                <AchievementBadge
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  progress={achievement.progress}
                  maxProgress={achievement.maxProgress}
                  isUnlocked={achievement.isUnlocked}
                  rarity={achievement.rarity}
                  unlockedAt={achievement.unlockedAt}
                  category={achievement.category}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Achievements;
