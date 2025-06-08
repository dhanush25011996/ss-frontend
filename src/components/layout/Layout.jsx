import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../store/slices/authSlice';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({
  children,
  user,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  notificationCount,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        background: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            border: 'none',
            background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Sidebar />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: { sm: `calc(100% - 280px)` },
        }}
      >
        <Header
          user={user}
          onMenuClick={handleDrawerToggle}
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onLogoutClick={handleLogout}
          notificationCount={notificationCount}
        />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflow: 'auto',
            borderRadius: '16px',
            m: 3,
            background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onNotificationClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  notificationCount: PropTypes.number,
};

export default Layout;
