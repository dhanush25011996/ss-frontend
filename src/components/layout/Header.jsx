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
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 0,
        borderRadius: 0,
        justifyContent: 'flex-end',
      }}
      {...props}
    >
      <Toolbar sx={{ p: 2, minHeight: 64, justifyContent:"flex-end" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ 
            mr: 1,
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={onNotificationClick}
            >
              <Badge badgeContent={notificationCount} color="error">
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
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
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
