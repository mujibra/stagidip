/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { useState } from 'react';
import Chart from 'react-apexcharts';

function DonutChartDummy() {
  //   const [state, setState] = useState({
  //     series: [70000, 17500, 52500, 105000, 52500, 52500],
  //     options: {
  //       chart: {
  //         type: 'donut',
  //       },
  //       dataLabels: {
  //         enabled: true,
  //       },
  //       labels: [
  //         'Warranty',
  //         'In Maintenance',
  //         'On Call',
  //         'No Maintenance',
  //         'Out Of Warranty',
  //         'Leasing',
  //       ],
  //     },
  //   });

  const [state, setState] = useState({
    series: [700, 175],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
        // formatter: function (val) {
        //   return val.toString();
        // },
      },
      labels: ['Masin Baru', 'Masin Lama'],
    },
  });

  return (
    <div className="donut text-sm">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        //   width="80%"
        width="70%"
        height="300"
      />
    </div>
  );
}

export default DonutChartDummy;
