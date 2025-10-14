import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import type { ChartDataPoint } from '../../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const EmotionalChart = ({ data }: { data: ChartDataPoint[] }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'Mood Score',
      data: data.map(d => d.mood),
      borderColor: '#FB8500',
      backgroundColor: 'rgba(251, 133, 0, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#FB8500',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      fill: true,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          font: {
            size: 12,
          },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: '#6B7280',
          maxRotation: 0,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Mood Trends</h3>
        <p className="text-sm text-gray-500">Track your emotional journey over time</p>
      </div>
      <div className="w-full" style={{ maxHeight: '350px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};