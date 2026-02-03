import Chart from 'react-apexcharts';

const VerticalBarChart = () => {
  const listData = [
    { id: 1, unit: 120, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BCA' },
    { id: 2, unit: 120, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BNI' },
    { id: 3, unit: 130, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BRI' },
  ];

  // eslint-disable-next-line array-callback-return
  const dataBankName = listData.map((item) => {
    // eslint-disable-next-line no-unused-expressions
    item?.bank_desc;
  });

  // eslint-disable-next-line array-callback-return
  const dataBankUnit = listData.map((item) => {
    // eslint-disable-next-line no-unused-expressions
    item?.unit;
  });

  const unit = [120, 120, 130];

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['BCA', 'BNI', 'BRI'],
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: 'Implementasi Unit Mesin',
      data: unit,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default VerticalBarChart;
