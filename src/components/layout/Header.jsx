import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const Header = ({
  title = 'Semen Sage',
  user,
  onMenuClick,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  notificationCount = 0,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleProfileMenuClose();
    if (action) action();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: 'text.primary',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      {...props}
    >
      <Toolbar sx={{ p: 2, minHeight: 64, justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={onNotificationClick}
            >
              <Badge 
                badgeContent={notificationCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.avatar ? (
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: 'primary.main',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || <AccountCircle />}
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 2,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
              '& .MuiMenuItem-root': {
                borderRadius: 1,
                mx: 0.5,
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
              '& .MuiAvatar-root': {
                width: 36,
                height: 36,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user && (
            <MenuItem onClick={() => handleMenuItemClick(onProfileClick)}>
              <Avatar src={user.avatar} sx={{ bgcolor: 'primary.main' }}>
                {user.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </MenuItem>
          )}
          
          <MenuItem onClick={() => handleMenuItemClick(onSettingsClick)}>
            <SettingsIcon sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuItemClick(onLogoutClick)}>
            <LogoutIcon sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onMenuClick: PropTypes.func,
  onNotificationClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  notificationCount: PropTypes.number,
};

export default Header;
