import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
  Collapse
} from '@mui/material';
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

const DRAWER_WIDTH = 280;

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

const Sidebar = ({
  open,
  onClose,
  variant = 'permanent',
  ...props
}) => {
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
                color: 'primary.main',
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
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          height: "80px",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Semen Sage
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {menuItems.map(renderMenuItem)}
      </List>
    </>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: 'background.paper',
          backgroundImage: 'none',
        },
      }}
      {...props}
    >
      {drawerContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default Sidebar;
