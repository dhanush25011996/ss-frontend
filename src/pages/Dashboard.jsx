import React, { useEffect } from "react";
import { Box, Grid, Typography, Paper, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { StreakCounter, QuoteCard, AchievementBadge } from "../components/features";
import { Loading } from '../components/common'
import {
  selectCurrentStreak, selectBestStreak, selectStreakProgress, selectNextMilestone,
  selectStreakLoading, selectStreakError, setStreakData, setLoading, setError
} from "../store/slices/streakSlice";
import { selectDailyQuote, setDailyQuote } from "../store/slices/quoteSlice";
import { selectUnlockedAchievements } from "../store/slices/achievementSlice";
import { getStreak, checkIn, getDailyQuote } from "../services/api";
import { auth } from "../firebase";

const mockAchievements = [
  { id: 1, title: "First Week", description: "7-day streak", icon: "fire", isUnlocked: true, rarity: "common", unlockedAt: "2024-01-15", category: "streak" },
  { id: 2, title: "Community Member", description: "Joined community", icon: "group", isUnlocked: true, rarity: "common", unlockedAt: "2024-01-10", category: "community" }
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentStreak = useSelector(selectCurrentStreak);
  const bestStreak = useSelector(selectBestStreak);
  const streakProgress = useSelector(selectStreakProgress);
  const nextMilestone = useSelector(selectNextMilestone);
  const loading = useSelector(selectStreakLoading);
  const error = useSelector(selectStreakError);
  const quote = useSelector(selectDailyQuote);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;
      dispatch(setLoading(true));
      try {
        const uid = auth.currentUser.uid;
        const [streakData, quoteData] = await Promise.all([getStreak(uid), getDailyQuote()]);
        dispatch(setStreakData(streakData));
        dispatch(setDailyQuote(quoteData.data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
    const unsubscribe = auth.onAuthStateChanged((user) => user && fetchData());
    return () => unsubscribe();
  }, [dispatch]);

  const handleCheckIn = async () => {
    if (!auth.currentUser) return dispatch(setError("Please sign in."));
    dispatch(setLoading(true));
    try {
      const { data } = await checkIn();
      dispatch(setStreakData(data.streak));
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
        <Typography variant="h4" fontWeight={600}>Welcome back! 👋</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Today's progress overview.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <StreakCounter
              currentStreak={currentStreak}
              bestStreak={bestStreak}
              progress={streakProgress}
              nextMilestone={nextMilestone}
              onCheckIn={handleCheckIn}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <QuoteCard
              quoteId={quote?.id}
              quote={quote?.quote}
              author={quote?.author}
              category={quote?.category}
              isFavorite={quote?.isFavorite}
              onFavoriteToggle={(isFavorite) => console.log("Toggle favorite:", isFavorite)}
              onShare={(quote) => console.log("Share quote:", quote)}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600}>Recent Achievements</Typography>
              <Grid container spacing={2}>
                {mockAchievements.map((achievement) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.id}>
                    <AchievementBadge {...achievement} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[
                { value: currentStreak || 0, label: "Current Streak", color: "primary.main" },
                { value: mockAchievements.length, label: "Achievements", color: "secondary.main" },
                { value: 12, label: "Blog Posts", color: "info.main" },
                { value: `${Math.round(streakProgress) || 0}%`, label: "Progress", color: "warning.main" }
              ].map(({ value, label, color }) => (
                <Grid item xs={12} sm={6} md={3} key={label}>
                  <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                    <Typography variant="h4" color={color} fontWeight={600}>{value}</Typography>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;