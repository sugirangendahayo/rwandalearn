import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  // Data for the chart
  const data = {
    labels: ['Electronics', 'Groceries', 'Clothing', 'Home Decor', 'Books'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Red
          'rgba(54, 162, 235, 0.6)',  // Blue
          'rgba(255, 206, 86, 0.6)',  // Yellow
          'rgba(75, 192, 192, 0.6)',  // Green
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow height adjustments
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Distribution by Category',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="donut-chart-container relative w-full h-64 sm:h-96 col-span-4">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
