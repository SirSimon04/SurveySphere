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

function ResultCard({question}) {

  function buildChartData(question) {
    
    const labels = question.answerOptions.map((option, index) => '' + (index + 1).toString() + ".");
    const data = question.answerOptions.map((option) => option.answers.length);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: '#6A63F6',
          borderColor: '#6A63F6',
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  }
  
  const chartData = buildChartData(question);

    const chartOptions = {
        plugins: {
          legend: {
            display: false, // Legende ausblenden
          },
        },
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
    };

  return (
    <BasicCard>
      <h2>{question.question}</h2>
      <Bar data={chartData} options={chartOptions}/>
      <ol>
          {question.answerOptions.map(option => (
            <li>{option.text}</li>
          ))}
      </ol>
    </BasicCard>
  )
}

export default ResultCard