/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

// import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import {
  Card,
  CardContent,
  List,
  //   ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  //   ListItemText,
} from '@mui/material';
import ColorsForData from '../../../ColorsForData';
// import { Navigate } from 'react-router-dom';
// const navigate = useNavigate();

const NumberCustomer = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      overflow: 'auto', // atur overflow agar daftar dapat di-scroll
      maxHeight: '350px',
      backgroundColor: theme.palette.background.paper,
    },
    scrollbar: {
      '& .thumb-vertical': {
        backgroundColor: theme.palette.primary.main, // atur warna thumb scrollbar
        borderRadius: '4px',
      },
    },
    textList: {
      fontWeight: 'bold',
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    if (getAccessToken) {
      setToken(getAccessToken);
    }
  }, [token]);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  // const handleLogout = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
  //     .then((res) => {
  //       // console.log(res, 'res logout');
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('user_profile');
  //     })
  //     .catch((err) => {
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('user_profile');
  //       console.log(err);
  //     });
  // };

  const getData = async () => {
    const getUser = JSON.parse(localStorage.getItem('user_profile'));
    let userRoles;
    if (getUser) {
      userRoles = getUser[0]?.roles;
    }
    setLoading(true);
    const response = await axios
      .get(`${api}purchaseOrder/${getUser[0]?.id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data?.data);
      })
      .catch((err) => {
        setData([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          // handleLogout();
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const combineDuplicateDatas = () => {
    const combinedDatas = {};

    // Menggabungkan data produk dengan nama yang sama dan menjumlahkan jumlahnya
    data.forEach((item) => {
      // eslint-disable-next-line no-prototype-builtins
      if (combinedDatas.hasOwnProperty(item?.customer?.bank_desc)) {
        combinedDatas[item.customer?.bank_desc].jumlah += item.jumlah;
      } else {
        combinedDatas[item.customer?.bank_desc] = { ...item };
      }
    });

    // Mengubah objek menjadi array
    const combinedDatasArray = Object.values(combinedDatas);

    return combinedDatasArray;
  };

  const combinedDatas = combineDuplicateDatas();
  // console.log(
  //   combinedDatas?.map((item) => item?.customer?.bank_desc),
  //   'data bank'
  // );
  // console.log(
  //   combinedDatas?.map((item) => item?.jumlah),
  //   'data jumlah'
  // );

  const dataJumlah = [];
  const dataCustomer = [];
  combinedDatas?.map((item) => dataCustomer.push(item?.customer?.bank_desc));
  combinedDatas?.map((item) => dataJumlah.push(item?.jumlah));

  // console.log(dataJumlah, 'jumlah');

  const options = {
    chart: {
      type: 'bar',
      height: 380,
    },
    colors: ColorsForData,
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    //   colors: [
    //     '#33b2df',
    //     '#546E7A',
    //     '#d4526e',
    //     '#13d8aa',
    //     '#A5978B',
    //     '#2b908f',
    //     '#f9a3a4',
    //     '#90ee7e',
    //     '#f48024',
    //     '#69d2e7',
    //   ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      // style: {
      //   colors: ['#fff'],
      // },
      formatter(val, opt) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val}`;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    //   stroke: {
    //     width: 1,
    //     colors: ['#fff'],
    //   },
    xaxis: {
      categories: dataCustomer,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Total Machine Per Customer',
      align: 'center',
      floating: true,
    },
    //   subtitle: {
    //     text: 'Category Names as DataLabels inside bars',
    //     align: 'center',
    //   },
    // tooltip: {
    //   theme: 'dark',
    //   x: {
    //     show: false,
    //   },
    //   y: {
    //     title: {
    //       formatter() {
    //         return '';
    //       },
    //     },
    //   },
    // },
  };

  const series = [
    {
      name: 'Total Machine Per Customer',
      data: dataJumlah,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={380}
      noData={{
        text: 'No data available',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          color: '#000',
        },
      }}
    />
  );
};

export default NumberCustomer;
