import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  LocalFireDepartment as FireIcon,
  Favorite as HeartIcon,
  Group as GroupIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const iconMap = {
  trophy: TrophyIcon,
  star: StarIcon,
  fire: FireIcon,
  heart: HeartIcon,
  group: GroupIcon,
  trending: TrendingIcon,
};

const AchievementBadge = ({
  title,
  description,
  icon = 'trophy',
  progress = 100,
  maxProgress = 100,
  isUnlocked = false,
  rarity = 'common',
  unlockedAt,
  category,
  ...props
}) => {
  const IconComponent = iconMap[icon] || TrophyIcon;

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700'; // Gold
      case 'epic':
        return '#9C27B0'; // Purple
      case 'rare':
        return '#2196F3'; // Blue
      case 'uncommon':
        return '#4CAF50'; // Green
      default:
        return '#757575'; // Grey
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      elevation={isUnlocked ? 3 : 1}
      sx={{
        borderRadius: 2,
        position: 'relative',
        opacity: isUnlocked ? 1 : 0.6,
        background: isUnlocked 
          ? `linear-gradient(135deg, ${getRarityColor(rarity)}20 0%, transparent 100%)`
          : 'background.paper',
        border: isUnlocked ? `2px solid ${getRarityColor(rarity)}` : '1px solid',
        borderColor: isUnlocked ? getRarityColor(rarity) : 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isUnlocked ? 'translateY(-2px)' : 'none',
          boxShadow: isUnlocked ? 4 : 1,
        },
      }}
      {...props}
    >
      <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isUnlocked ? getRarityColor(rarity) : 'grey.300',
              color: 'white',
              position: 'relative',
            }}
          >
            <IconComponent sx={{ fontSize: 32 }} />
            {!isUnlocked && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="white">
                  🔒
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: isUnlocked ? 'text.primary' : 'text.secondary',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: 40 }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip
              label={rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              size="small"
              sx={{
                backgroundColor: getRarityColor(rarity),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
            {category && (
              <Chip
                label={category}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>

          {!isUnlocked && progress < maxProgress && (
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {progress}/{maxProgress}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(progress / maxProgress) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getRarityColor(rarity),
                  },
                }}
              />
            </Box>
          )}

          {isUnlocked && unlockedAt && (
            <Tooltip title={`Unlocked on ${formatDate(unlockedAt)}`}>
              <Typography variant="caption" color="text.secondary">
                Unlocked {formatDate(unlockedAt)}
              </Typography>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

AchievementBadge.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['trophy', 'star', 'fire', 'heart', 'group', 'trending']),
  progress: PropTypes.number,
  maxProgress: PropTypes.number,
  isUnlocked: PropTypes.bool,
  rarity: PropTypes.oneOf(['common', 'uncommon', 'rare', 'epic', 'legendary']),
  unlockedAt: PropTypes.string,
  category: PropTypes.string,
};

export default AchievementBadge;
