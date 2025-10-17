import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      sx={{ p: 4 }}
    >
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Welcome {user?.email ?? "User"} 🎉
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        You have successfully logged in to the dashboard.
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{ textTransform: "none" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
