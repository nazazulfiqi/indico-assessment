import { Card, CardContent, Typography } from "@mui/material";

const WelcomeCard = () => (
  <Card
    className="rounded-2xl"
    sx={{
      width: "100%",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}
  >
    <CardContent
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          mb: 0.5,
        }}
      >
        👋 Welcome back, Admin!
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: { xs: "0.85rem", sm: "0.9rem" },
        }}
      >
        Here’s an overview of your system activity.
      </Typography>
    </CardContent>
  </Card>
);

export default WelcomeCard;
