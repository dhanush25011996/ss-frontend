import React from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Tooltip,
  Button,
} from "@mui/material";
import { LocalFireDepartment as FireIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const StreakCounter = ({
  currentStreak = 0,
  bestStreak = 0,
  progress = 0,
  nextMilestone = 0,
  onCheckIn,
  ...props
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        background: (theme) =>
          `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: "white",
      }}
      {...props}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FireIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {currentStreak}
          </Typography>
          <Typography variant="subtitle2">
            Day{currentStreak !== 1 ? "s" : ""} Streak
          </Typography>
        </Box>
      </Box>

      <Box mb={2}>
        <Typography variant="body2" mb={1}>
          Progress to next milestone
        </Typography>
        <Tooltip title={`${Math.round(progress)}% to ${nextMilestone} days`}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white",
              },
            }}
          />
        </Tooltip>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          p: 2,
          borderRadius: 1,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            Current Streak
          </Typography>
          <Typography variant="h6">
            {currentStreak} day{currentStreak <= 1 ? "" : "s"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            Best Streak
          </Typography>
          <Typography variant="h6">
            {bestStreak} day{currentStreak <= 1 ? "" : "s"}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: "white", color: "primary.contrastText" }}
        onClick={onCheckIn}
      >
        Check In
      </Button>
    </Paper>
  );
};

StreakCounter.propTypes = {
  currentStreak: PropTypes.number,
  bestStreak: PropTypes.number,
  progress: PropTypes.number,
  nextMilestone: PropTypes.number,
  onCheckIn: PropTypes.func,
};

export default StreakCounter;
