import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ drawerWidth, mobileOpen, onDrawerToggle }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
  ];

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        disableGutters
        sx={{
          px: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 64,
        }}
      >
        <Box
          component="img"
          src="/images/indico.png"
          alt="Indico Logo"
          sx={{
            height: 70,
            width: "auto",
            objectFit: "contain",
          }}
        />

        {/* Tombol close — hanya tampil di mobile */}
        <IconButton onClick={onDrawerToggle} sx={{ display: { md: "none" } }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <List sx={{ flex: 1, mt: 2, px: 1.5 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mb: 1,
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: (theme) =>
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "#fff",
                "& .MuiListItemIcon-root": { color: "#fff" },
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path
                    ? "inherit"
                    : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box
        sx={{
          p: 2,
          textAlign: "center",
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        © {new Date().getFullYear()} Indico
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#fff",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
