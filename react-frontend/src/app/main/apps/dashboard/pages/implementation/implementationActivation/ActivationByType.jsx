/* eslint-disable use-isnan */
/* eslint-disable radix */
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
import Chart from 'react-apexcharts';
import { Card, Typography } from '@mui/material';
// import { Navigate } from 'react-router-dom';
import ColorsForData from '../../../ColorsForData';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));
// const navigate = useNavigate();

const ActivationByType = (props) => {
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();

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

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}logout`, {}, config)
      .then((res) => {
        // console.log(res, 'res logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      })
      .catch((err) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        console.log(err);
      });
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${api}implement-summary/null/null/null/null/null`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setData([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
          handleLogout();
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
      if (combinedDatas.hasOwnProperty(item?.type_mesin)) {
        combinedDatas[item?.type_mesin].total_activated += item?.total_activated;
      } else {
        combinedDatas[item?.type_mesin] = { ...item };
      }
    });

    // Mengubah objek menjadi array
    const combinedDatasArray = Object.values(combinedDatas);

    return combinedDatasArray;
  };

  const combinedDatasUnfilter = combineDuplicateDatas();
  const combinedDatas = combinedDatasUnfilter.filter((item) => {
    return item?.total_activated !== 0;
  });

  const dataLabel = combinedDatas.map((item) => item?.type_mesin);
  const dataTotalActivated = combinedDatas.map((item) => parseInt(item?.total_activated));

  const options = {
    colors: ColorsForData,
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
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dataLabel,
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
      name: 'Total Activation by Type',
      data: dataTotalActivated,
    },
  ];

  return (
    <div className="w-full flex gap-10 flex-col mb-20">
      <Card className="gap-20 ml-10 mr-10 mt-20">
        <Typography className="m-20 text-17" color="textSecondary">
          <b>Activation by Machine Type</b>
        </Typography>
        <center>
          <Chart
            options={options}
            series={series}
            type="bar"
            height={300}
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
        </center>
      </Card>
    </div>
  );
};

export default ActivationByType;
