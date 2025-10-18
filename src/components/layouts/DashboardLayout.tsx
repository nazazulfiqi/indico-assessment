import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          minWidth: 0, // ✅ PENTING: mencegah overflow
          ml: { md: `${drawerWidth}px` }, // ✅ margin-left di desktop untuk sidebar
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#E5E7EB",
        }}
      >
        <Topbar onMenuClick={handleDrawerToggle} />

        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
