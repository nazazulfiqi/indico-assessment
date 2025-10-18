import { Card, CardContent, Typography, useTheme, Box } from "@mui/material";
import { PeopleAlt, CheckCircle, RemoveCircle } from "@mui/icons-material";

interface StatsCardsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

const StatsCards = ({
  totalUsers,
  activeUsers,
  inactiveUsers,
}: StatsCardsProps) => {
  const theme = useTheme();

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      color: theme.palette.primary.main,
      icon: (
        <PeopleAlt sx={{ fontSize: 36, color: theme.palette.primary.main }} />
      ),
    },
    {
      title: "Active Users",
      value: activeUsers,
      color: "#4CAF50",
      icon: <CheckCircle sx={{ fontSize: 36, color: "#4CAF50" }} />,
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      color: "#FF7043",
      icon: <RemoveCircle sx={{ fontSize: 36, color: "#FF7043" }} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((item, index) => (
        <Card
          key={index}
          className="rounded-2xl"
          sx={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: { xs: 2.5, sm: 3 },
            }}
          >
            {/* Text Section */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "1.6rem", sm: "2rem" },
                  color: item.color,
                }}
              >
                {item.value}
              </Typography>
            </Box>

            {/* Icon Section */}
            <Box
              sx={{
                bgcolor: `${item.color}1A`,
                borderRadius: "50%",
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
