/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import _ from '@lodash';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
/* eslint-disable import/prefer-default-export */
export const DemandGoodsCard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const datas = {
    id: 'widget5',
    series: {
      today: [
        {
          name: 'Visitors',
          data: [1210, 1380, 1520, 1290, 490, 1390, 1050, 680, 1300, 2140, 1520, 1890],
        },
        {
          name: 'Page Views',
          data: [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
        },
      ],
      yesterday: [
        {
          name: 'Visitors',
          data: [1190, 1300, 2340, 1220, 1590, 1990, 1250, 1080, 2000, 2380, 2420, 2190],
        },
        {
          name: 'Page views',
          data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
        },
      ],
    },
    options: {
      chart: {
        type: 'area',
        height: '100%',
        stacked: true,
        foreColor: '#999',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        strokeColor: '#fff',
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6,
        },
      },
      xaxis: {
        categories: [
          '12am',
          '2am',
          '4am',
          '6am',
          '8am',
          '10am',
          '12pm',
          '2pm',
          '4pm',
          '6pm',
          '8pm',
          '10pm',
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      grid: {
        position: 'back',
      },
      legend: {
        show: false,
      },
      fill: {
        type: 'solid',
        opacity: 0.7,
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
  };
  const data = _.merge({}, datas);
  const series = data.series[Object.keys(data.series)[tabValue]];

  _.setWith(data, 'options.colors', [theme.palette.secondary.main, theme.palette.primary.main]);

  return (
    <div>
      <Card className="w-full h-full rounded-20 shadow">
        <div className="relative p-20 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Typography className="h3 sm:h2 font-medium">Visitors & Page views</Typography>
          </div>
        </div>

        <div className="relative h-200 sm:h-320 sm:pb-16 ">
          <ReactApexChart
            options={data.options}
            series={series}
            type={data.options.chart.type}
            height={data.options.chart.height}
          />
        </div>
      </Card>
      <div className="flex justify-center">
        <Typography variant="h6">Timeline</Typography>
      </div>
    </div>
  );
};
