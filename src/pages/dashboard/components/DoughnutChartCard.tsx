import { Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartCardProps {
  data: any;
  options: any;
}

const DoughnutChartCard = ({ data, options }: DoughnutChartCardProps) => (
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
        <Doughnut data={data} options={options} />
      </div>
    </CardContent>
  </Card>
);

export default DoughnutChartCard;
