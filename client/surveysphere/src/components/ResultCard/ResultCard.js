import React from 'react'
import BasicCard from '../BasicCard/BasicCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResultCard() {

  const chartData = {
        labels: ['1', '2', '3', '4'],
        datasets: [
        {
            label: '', // Setze das Label der Datenreihe auf eine leere Zeichenkette
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        ],
    };

    const chartOptions = {
        plugins: {
        legend: {
            display: false, // Legende ausblenden
        },
        },
    };

  return (
    <BasicCard>
      <h2>Also das hier ist die erste Frage?</h2>
      <Bar data={chartData} options={chartOptions}/>
      <ol>
          <li>Das hier ist die erste Antwortmöglichkeit</li>
          <li>Das hier ist die erste Antwortmöglichkeit</li>
          <li>Das hier ist die erste Antwortmöglichkeit</li>
          <li>Das hier ist die erste Antwortmöglichkeit</li>
      </ol>
    </BasicCard>
  )
}

export default ResultCard