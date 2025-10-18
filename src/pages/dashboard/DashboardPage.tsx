import React from "react";
import { useTheme } from "@mui/material";
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
import WelcomeCard from "./components/WelcomeCard";
import StatsCards from "./components/StatsCards";
import BarChartCard from "./components/BarChartCard";
import DoughnutChartCard from "./components/DoughnutChartCard";

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
    <div className="max-w-7xl mx-auto space-y-6">
      <WelcomeCard />
      <StatsCards
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarChartCard data={barData} options={barOptions} />
        <DoughnutChartCard data={doughnutData} options={doughnutOptions} />
      </div>
    </div>
  );
};

export default DashboardPage;
