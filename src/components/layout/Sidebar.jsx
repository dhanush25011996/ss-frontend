import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
  Collapse,
  Avatar,
  useTheme
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import {
  Dashboard as DashboardIcon,
  TrendingUp as StreakIcon,
  Forum as BlogIcon,
  EmojiEvents as AchievementsIcon,
  Group as CommunityIcon,
  FormatQuote as QuotesIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    title: 'Streak Tracker',
    path: '/streak',
    icon: <StreakIcon />
  },
  {
    title: 'Community',
    icon: <CommunityIcon />,
    children: [
      {
        title: 'Blog Posts',
        path: '/blog',
        icon: <BlogIcon />
      },
      {
        title: 'Daily Quotes',
        path: '/quotes',
        icon: <QuotesIcon />
      }
    ]
  },
  {
    title: 'Achievements',
    path: '/achievements',
    icon: <AchievementsIcon />
  }
];

const Sidebar = ({ onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = React.useState('');

  const handleNavigate = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleSubMenuClick = (title) => {
    setOpenSubMenu(openSubMenu === title ? '' : title);
  };

  const renderMenuItem = (item) => {
    const isSelected = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isSubMenuOpen = openSubMenu === item.title;

    return (
      <React.Fragment key={item.title}>
        <ListItem disablePadding>
          <ListItemButton
            selected={isSelected}
            onClick={() => hasChildren ? handleSubMenuClick(item.title) : handleNavigate(item.path)}
            sx={{
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {hasChildren && (
              isSubMenuOpen ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.title} disablePadding>
                  <ListItemButton
                    selected={location.pathname === child.path}
                    onClick={() => handleNavigate(child.path)}
                    sx={{
                      pl: 4,
                      borderRadius: 1,
                      mx: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={user?.avatar}
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            fontSize: '2rem',
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '1.1rem',
            }}
          >
            {user?.name || 'Semen Sage'}
          </Typography>
          {user?.email && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              {user.email}
            </Typography>
          )}
        </Box>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {menuItems.map(renderMenuItem)}
      </List>
    </>
  );

  return (
    <>{drawerContent}</>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default Sidebar;
