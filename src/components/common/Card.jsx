import React from 'react';
import { 
  Card as MuiCard, 
  CardContent, 
  CardActions, 
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Card = ({ 
  title,
  subtitle,
  avatar,
  headerAction,
  children,
  actions,
  variant = 'elevation',
  elevation = 1,
  sx = {},
  ...props 
}) => {
  return (
    <MuiCard 
      variant={variant} 
      elevation={elevation}
      sx={{
        borderRadius: 2,
        ...sx
      }}
      {...props}
    >
      {(title || subtitle || avatar || headerAction) && (
        <CardHeader
          avatar={avatar && (
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {typeof avatar === 'string' ? avatar.charAt(0).toUpperCase() : avatar}
            </Avatar>
          )}
          action={
            headerAction || (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={title && (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          )}
          subheader={subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        />
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {actions && (
        <CardActions>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {actions}
          </Box>
        </CardActions>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  headerAction: PropTypes.node,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['elevation', 'outlined']),
  elevation: PropTypes.number,
  sx: PropTypes.object,
};

export default Card;
