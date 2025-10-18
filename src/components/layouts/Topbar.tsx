import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Logout } from "@mui/icons-material";

const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid #eee",
        bgcolor: "#fff",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{
              p: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 28,
                height: 28,
                fontSize: 14,
              }}
            >
              {user?.email?.[0]?.toUpperCase() ?? "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              sx: {
                py: 0,
                "& .MuiMenuItem-root": {
                  minHeight: 30,
                  px: 1.5,
                  fontSize: "0.85rem",
                },
              },
            }}
          >
            <MenuItem disabled sx={{ fontSize: "0.8rem", opacity: 0.7 }}>
              {user?.email}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
              sx={{ color: "primary.main" }}
            >
              <Logout sx={{ mr: 1, fontSize: 18, color: "inherit" }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
