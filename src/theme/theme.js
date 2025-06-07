import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a3d62', // Steel Navy
      light: '#3d5a80',
      dark: '#06223c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Burnt Orange
      light: '#ff9640',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32', // Dark Green
      light: '#60ad5e',
      dark: '#005005',
    },
    warning: {
      main: '#f9a825', // Goldenrod
      light: '#ffd95a',
      dark: '#c17900',
    },
    error: {
      main: '#c62828', // Crimson Red
      light: '#ef5350',
      dark: '#8e0000',
    },
    info: {
      main: '#0277bd', // Steel Blue
      light: '#58a5f0',
      dark: '#004c8c',
    },
    background: {
      default: '#f4f4f6', // Cool Gray Background
      paper: '#ffffff',
    },
    text: {
      primary: '#1c1f26', // Almost Black
      secondary: '#5c6370', // Gunmetal Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        contained: {
          background: 'linear-gradient(135deg, #0a3d62 0%, #ff6f00 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
