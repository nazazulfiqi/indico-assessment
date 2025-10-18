import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

interface BarChartCardProps {
  data: any;
  options: any;
}

const BarChartCard = ({ data, options }: BarChartCardProps) => (
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
        <Bar data={data} options={options} />
      </div>
    </CardContent>
  </Card>
);

export default BarChartCard;
