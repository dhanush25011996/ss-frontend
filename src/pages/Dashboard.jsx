import React, { useEffect } from "react";
import { Box, Grid, Typography, Paper, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  StreakCounter,
  QuoteCard,
  AchievementBadge,
} from "../components/features";
import { Loading } from "../components/common";
import {
  selectCurrentStreak,
  selectBestStreak,
  selectStreakProgress,
  selectNextMilestone,
  selectStreakLoading,
  selectStreakError,
  setStreakData,
  setLoading,
  setError,
} from "../store/slices/streakSlice";
import { selectDailyQuote } from "../store/slices/quoteSlice";
import { selectUnlockedAchievements } from "../store/slices/achievementSlice";
import { getStreak, checkIn } from "../services/api";
import { auth } from "../firebase";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Selectors
  const currentStreak = useSelector(selectCurrentStreak);
  const bestStreak = useSelector(selectBestStreak);
  const streakProgress = useSelector(selectStreakProgress);
  const nextMilestone = useSelector(selectNextMilestone);
  const loading = useSelector(selectStreakLoading);
  const error = useSelector(selectStreakError);
  const dailyQuote = useSelector(selectDailyQuote);
  const recentAchievements = useSelector(selectUnlockedAchievements);

  // Mock data for demonstration (quotes and achievements)
  const mockDailyQuote = {
    id: 1,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    isFavorite: false,
  };

  const mockRecentAchievements = [
    {
      id: 1,
      title: "First Week",
      description: "Complete your first 7-day streak",
      icon: "fire",
      isUnlocked: true,
      rarity: "common",
      unlockedAt: "2024-01-15T10:30:00Z",
      category: "streak",
    },
    {
      id: 2,
      title: "Community Member",
      description: "Join the Semen Sage community",
      icon: "group",
      isUnlocked: true,
      rarity: "common",
      unlockedAt: "2024-01-10T14:20:00Z",
      category: "community",
    },
  ];

  // Fetch streak data on mount
  useEffect(() => {
    const fetchStreak = async () => {
      if (!auth.currentUser) return;
      dispatch(setLoading(true));
      try {
        const uid = auth.currentUser.uid;
        const streakData = await getStreak(uid);
        dispatch(setStreakData(streakData));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchStreak();

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchStreak();
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Handle check-in
  const handleCheckIn = async () => {
    if (!auth.currentUser) {
      dispatch(setError("Please sign in to check in."));
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await checkIn();
      dispatch(setStreakData(response.streak));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Here's your progress overview for today.
        </Typography>

        <Grid container spacing={3}>
          {/* Streak Counter */}
          <Grid item xs={12} md={6} lg={4}>
            <StreakCounter
              currentStreak={currentStreak}
              bestStreak={bestStreak}
              progress={streakProgress}
              nextMilestone={nextMilestone}
              onCheckIn={handleCheckIn}
            />
          </Grid>

          {/* Daily Quote */}
          <Grid item xs={12} md={6} lg={8}>
            <QuoteCard
              quote={dailyQuote?.quote || mockDailyQuote.quote}
              author={dailyQuote?.author || mockDailyQuote.author}
              category={dailyQuote?.category || mockDailyQuote.category}
              isFavorite={dailyQuote?.isFavorite || mockDailyQuote.isFavorite}
              onFavoriteToggle={(isFavorite) => {
                console.log("Toggle favorite:", isFavorite);
              }}
              onShare={(quote) => {
                console.log("Share quote:", quote);
              }}
            />
          </Grid>

          {/* Recent Achievements */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Achievements
              </Typography>
              <Grid container spacing={2}>
                {mockRecentAchievements.map((achievement) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.id}>
                    <AchievementBadge
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      isUnlocked={achievement.isUnlocked}
                      rarity={achievement.rarity}
                      unlockedAt={achievement.unlockedAt}
                      category={achievement.category}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography
                    variant="h4"
                    color="primary.main"
                    fontWeight={600}
                  >
                    {currentStreak || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Streak
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography
                    variant="h4"
                    color="secondary.main"
                    fontWeight={600}
                  >
                    {mockRecentAchievements.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Achievements
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="h4" color="info.main" fontWeight={600}>
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Blog Posts
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography
                    variant="h4"
                    color="warning.main"
                    fontWeight={600}
                  >
                    {Math.round(streakProgress) || 0}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
