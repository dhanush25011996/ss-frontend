import React from 'react';
import {
  CircularProgress,
  Box,
  Typography,
  Skeleton,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';

const Loading = ({
  type = 'spinner',
  size = 40,
  message,
  fullScreen = false,
  color = 'primary',
  variant = 'indeterminate',
  ...props
}) => {
  if (type === 'skeleton') {
    return (
      <Stack spacing={1} {...props}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    );
  }

  if (type === 'card-skeleton') {
    return (
      <Box sx={{ width: '100%', ...props.sx }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
    );
  }

  if (type === 'text-skeleton') {
    return (
      <Stack spacing={1} {...props}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
      </Stack>
    );
  }

  const LoadingContent = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      {...(fullScreen && {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      })}
      {...props}
    >
      <CircularProgress
        size={size}
        color={color}
        variant={variant}
      />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  return LoadingContent;
};

Loading.propTypes = {
  type: PropTypes.oneOf(['spinner', 'skeleton', 'card-skeleton', 'text-skeleton']),
  size: PropTypes.number,
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit']),
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default Loading;
