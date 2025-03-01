import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const LineGraph = () => {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales in USD",
        data: [100, 200, 150, 300, 250, 400],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Curved line
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow height adjustments
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Line Chart",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales ($)",
        },
      },
    },
  };

  return (
    <div className="line-graph-container relative w-full h-64 sm:h-96 col-span-8 rounded shadow-md p-2">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
