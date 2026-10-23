import { useState } from "react";
import { BrowserRouter as Router, NavLink, Route, Routes, Navigate } from "react-router";
import { Box, Button, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ActivityDetail from "./components/ActivityDetail";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";

const sidebarWidth = 248;

function Sidebar({ mobileOpen, onClose }) {
  const theme = useTheme();
  const links = [{ label: "Activities", to: "/activities", mark: "↗" }];
  return (
    <Drawer
      variant={mobileOpen ? "temporary" : "permanent"}
      open={mobileOpen}
      onClose={onClose}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #E5EAE5",
          background: "#FFFFFF",
          padding: "24px 16px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1.5, mb: 5 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: "12px", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800 }}>F</Box>
        <Box>
          <Typography sx={{ fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1.2 }}>Form & Flow</Typography>
          <Typography variant="caption" color="text.secondary">PERSONAL FITNESS</Typography>
        </Box>
      </Box>
      <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1, fontWeight: 700, letterSpacing: "0.08em" }}>WORKSPACE</Typography>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={onClose} style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 1.25, mb: 0.5,
              borderRadius: "10px", color: isActive ? "primary.dark" : "text.secondary",
              bgcolor: isActive ? "primary.light" : "transparent",
              fontWeight: isActive ? 650 : 500, fontSize: "0.875rem",
              transition: "background 120ms ease",
              "&:hover": { bgcolor: isActive ? "primary.light" : "#F5F7F5" },
            }}>
              <Box sx={{ width: 20, textAlign: "center", fontSize: "1rem" }}>{link.mark}</Box>
              {link.label}
            </Box>
          )}
        </NavLink>
      ))}
      <Box sx={{ mt: "auto", p: 1.5, borderRadius: 3, bgcolor: "#F5F7F5" }}>
        <Typography variant="body2" sx={{ fontWeight: 650, mb: 0.5 }}>Keep showing up.</Typography>
        <Typography variant="caption" color="text.secondary">Small steps add up to meaningful progress.</Typography>
      </Box>
    </Drawer>
  );
}

function ActivitiesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const handleActivityAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    setFormOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, mb: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <Box>
          <Typography variant="h1" sx={{ mb: 0.75 }}>Activities</Typography>
          <Typography color="text.secondary">Your movement, collected in one place.</Typography>
        </Box>
        <Button variant="contained" onClick={() => setFormOpen((open) => !open)}>{formOpen ? "Close form" : "+ Log activity"}</Button>
      </Box>
      {formOpen && (
        <Box sx={{ mb: 3 }}>
          <ActivityForm onActivityAdded={handleActivityAdded} />
        </Box>
      )}
      <ActivityList refreshTrigger={refreshTrigger} />
    </Box>
  );
}

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0, px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 2.5, md: 4 } }}>
          {isMobile && (
            <Button variant="text" onClick={() => setMobileOpen(true)} sx={{ mb: 2, px: 0, color: "text.secondary" }}>☰ Menu</Button>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
