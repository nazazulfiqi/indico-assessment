import React from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useUsers } from "../../hooks/useUsers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const { usersQuery } = useUsers();
  const users = usersQuery.data || [];

  const totalUsers = users.length;
  const activeUsers = Math.floor(totalUsers * 0.7);
  const inactiveUsers = totalUsers - activeUsers;

  // Chart Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [5, 12, 9, 15, 8, 20],
        backgroundColor: theme.palette.primary.main,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f0f0f0" }, beginAtZero: true },
    },
  };

  const doughnutData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ["#4CAF50", "#FF7043"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: { legend: { position: "bottom" as const } },
  };

  return (
    <div className="max-w-7xl mx-auto  space-y-6">
      {/* Welcome Card */}
      <Card className="rounded-2xl">
        <CardContent>
          <Typography variant="h5" fontWeight={600}>
            👋 Welcome back, Admin!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here’s an overview of your system activity.
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total Users
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              color={theme.palette.primary.main}
            >
              {totalUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Active Users
            </Typography>
            <Typography variant="h4" fontWeight={700} color="#4CAF50">
              {activeUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Inactive Users
            </Typography>
            <Typography variant="h4" fontWeight={700} color="#FF7043">
              {inactiveUsers}
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl h-[360px]">
          <CardContent className="h-full flex flex-col">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              mb={2}
              fontWeight={500}
            >
              User Growth (Last 6 Months)
            </Typography>
            <div className="flex-1 min-h-[220px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl h-[360px]">
          <CardContent className="h-full flex flex-col">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              mb={2}
              fontWeight={500}
            >
              User Status Distribution
            </Typography>
            <div className="flex-1 flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
