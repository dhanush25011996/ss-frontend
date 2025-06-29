import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6b21a8", // Vivid Purple
      light: "#a855f7",
      dark: "#4a1a75",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f43f5e", // Radiant Pink
      light: "#fb7185",
      dark: "#be123c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#15803d", // Emerald Green
      light: "#4ade80",
      dark: "#14532d",
    },
    warning: {
      main: "#f59e0b", // Amber Glow
      light: "#facc15",
      dark: "#b45309",
    },
    error: {
      main: "#dc2626", // Fiery Red
      light: "#f87171",
      dark: "#991b1b",
    },
    info: {
      main: "#0284c7", // Sapphire Blue
      light: "#38bdf8",
      dark: "#075985",
    },
    background: {
      default: "#f0f9ff", // Light Sky Blue
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b", // Deep Slate
      secondary: "#64748b", // Cool Slate
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
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
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
        },
        contained: {
          background: "linear-gradient(135deg, #6b21a8 0%, #f43f5e 100%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.08)",
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
          "& .MuiOutlinedInput-root": {
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
