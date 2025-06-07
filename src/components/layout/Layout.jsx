import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({
  children,
  user,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  notificationCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Sidebar
          variant="permanent"
          open={true}
        />
      )}

      {/* Sidebar for mobile */}
      {isMobile && (
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile. 
          }}
        />
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Header
          user={user}
          onMenuClick={handleDrawerToggle}
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onLogoutClick={onLogoutClick}
          notificationCount={notificationCount}
        />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflow: 'auto',
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
