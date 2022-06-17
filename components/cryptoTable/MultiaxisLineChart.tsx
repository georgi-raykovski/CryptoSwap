import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface IMultiaxisLineChartProps {
  coinPriceData: number[];
  interval: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
  },
};

const possibleLabels = {
  daily: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  hourly: Array.from(Array(24).keys()).map((key: number) => key.toString()),
};

const MultiaxisLineChart = ({ coinPriceData, interval }: IMultiaxisLineChartProps) => {
  const labels = possibleLabels[interval as keyof typeof possibleLabels];  
  
  const chartLabels = coinPriceData.map((_, index) => {
    return labels[index % labels.length];
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price History",
        data: chartLabels.map((_, index) => coinPriceData[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default MultiaxisLineChart;
