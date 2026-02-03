import { useState } from 'react';
import Chart from 'react-apexcharts';

function ProgressPercentageBarChart() {
  const [state, setState] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'South Korea',
          'Canada',
          'United Kingdom',
          'Netherlands',
          'Italy',
          'France',
          'Japan',
          'United States',
          'China',
          'Germany',
        ],
      },
    },
  });

  return (
    <div className="bar">
      <Chart options={state.options} series={state.series} type="bar" width="80%" />
    </div>
  );
}

export default ProgressPercentageBarChart;
