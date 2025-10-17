import { Box, Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Welcome to Dashboard 👋
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          mt: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          This is your main dashboard page. You can manage users, view
          analytics, or customize content here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
