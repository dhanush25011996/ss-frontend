import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  FormatQuote as QuoteIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const QuoteCard = ({
  quote,
  author,
  category,
  isFavorite = false,
  onFavoriteToggle,
  onShare,
  ...props
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare({ quote, author });
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: 'Motivational Quote',
          text: `"${quote}" - ${author}`,
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(`"${quote}" - ${author}`);
      }
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        position: 'relative',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
        border: '1px solid',
        borderColor: 'divider',
      }}
      {...props}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <QuoteIcon
            sx={{
              fontSize: 32,
              color: 'primary.main',
              opacity: 0.7,
              mt: -0.5,
            }}
          />
          <Box flex={1}>
            <Typography
              variant="h6"
              component="blockquote"
              sx={{
                fontStyle: 'italic',
                lineHeight: 1.6,
                mb: 2,
                color: 'text.primary',
                fontWeight: 400,
              }}
            >
              "{quote}"
            </Typography>
            
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                  }}
                >
                  — {author}
                </Typography>
                {category && (
                  <Chip
                    label={category}
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Box>
              
              <Box display="flex" gap={0.5}>
                <Tooltip title={favorite ? 'Remove from favorites' : 'Add to favorites'}>
                  <IconButton
                    size="small"
                    onClick={handleFavoriteClick}
                    sx={{
                      color: favorite ? 'error.main' : 'text.secondary',
                    }}
                  >
                    {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Share quote">
                  <IconButton
                    size="small"
                    onClick={handleShareClick}
                    sx={{ color: 'text.secondary' }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
  onShare: PropTypes.func,
};

export default QuoteCard;
