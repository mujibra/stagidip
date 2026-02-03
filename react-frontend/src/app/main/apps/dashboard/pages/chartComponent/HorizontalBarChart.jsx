import Chart from 'react-apexcharts';

const HorizontalBarChart = () => {
  const listData = [
    { id: 1, unit: 120, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BCA' },
    { id: 2, unit: 120, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BNI' },
    { id: 3, unit: 130, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BRI' },
    { id: 4, unit: 100, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'MANDIRI ' },
    { id: 5, unit: 200, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BANK JATENG' },
    { id: 6, unit: 100, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'OCBC NISP' },
    { id: 7, unit: 130, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BJB' },
    { id: 8, unit: 100, description: 'Jumlah Unit', imgUrl: '#', bank_desc: 'BTN' },
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

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dataBankName,
      labels: {
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: 'Jumlah Implementasi Mesin',
      data: dataBankUnit,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default HorizontalBarChart;
