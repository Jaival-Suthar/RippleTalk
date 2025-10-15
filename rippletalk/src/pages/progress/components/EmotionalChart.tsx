import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import type { ChartDataPoint } from '../../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const EmotionalChart = ({ data }: { data: ChartDataPoint[] }) => {
  const chartData = {
    labels: data.map((d: ChartDataPoint) => d.date),
    datasets: [
      {
        label: 'Mood Score',
        data: data.map((d) => d.mood),
        borderColor: '#FB8500',
        backgroundColor: 'rgba(251,133,0,0.08)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FB8500',
        pointBorderColor: '#111',
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderRadius: 10,
        titleFont: { size: 13, weight: 'bold' as const },
        bodyFont: { size: 12 },
        padding: 10,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: { color: '#e5e5e5', font: { size: 11 }, stepSize: 2 },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      x: {
        ticks: { color: '#e5e5e5', font: { size: 11 }, maxRotation: 0 },
        grid: { display: false },
      },
    },
  };
  return (
    <div className="bg-gray-900 rounded-xl shadow-md px-3 pt-3 pb-1 mb-1" style={{ height: 260 }}>
      <Line data={chartData} options={options} height={240} />
    </div>
  );
};