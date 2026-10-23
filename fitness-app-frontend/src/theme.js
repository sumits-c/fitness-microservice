import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#176B4D", dark: "#10543C", light: "#E5F1EA" },
    background: { default: "#F3F5F2", paper: "#FFFFFF" },
    text: { primary: "#18352B", secondary: "#718078" },
    divider: "#E5EAE5",
    success: { main: "#287A56" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.04em" },
    h2: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em" },
    h3: { fontSize: "1.125rem", fontWeight: 650, letterSpacing: "-0.02em" },
    subtitle1: { fontSize: "0.95rem", fontWeight: 600 },
    body1: { fontSize: "0.9rem", lineHeight: 1.6 },
    body2: { fontSize: "0.82rem", lineHeight: 1.55 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#F3F5F2", minWidth: 320 },
        "*": { boxSizing: "border-box" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: "1px solid #E7EBE7", boxShadow: "0 2px 10px rgba(24,53,43,0.025)", borderRadius: 16 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 16, minHeight: 42 },
        containedPrimary: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
    MuiTextField: { defaultProps: { size: "small" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10, backgroundColor: "#FFFFFF" },
        notchedOutline: { borderColor: "#DDE4DE" },
      },
    },
  },
});

export default theme;
