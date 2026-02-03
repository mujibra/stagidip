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
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { showMessage } from 'app/store/fuse/messageSlice';
import Chart from 'react-apexcharts';
// import { Navigate } from 'react-router-dom';

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

const MesinStatus = (props) => {
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
    setLoading(true);
    const response = await axios
      .get(`${api}getDataMachineStatus`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
        params: {
          month: props.month,
          year: props.year,
        },
      })
      .then((res) => {
        setData(res?.data?.data_range);
        setLoading(false);
        // console.log(res.data.data_range);
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
    getData();
  }, [props.month, props.year]);

  const chartData = {
    options: {
      chart: {
        id: 'area',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: data?.new_machine?.map((item) => moment(item?.tanggal).format('D MMM')),
      },
      yaxis: {
        seriesName: 'Machine',
      },
    },
    series: [
      {
        name: 'New Machine',
        data: data?.new_machine?.map((item) => item?.jumlah),
      },
      {
        name: 'Old Machine',
        data: data?.old_machine?.map((item) => item?.jumlah),
      },
    ],
  };  

  return (
    <div>
      {loading ? (
        <Box sx={{ width: '50%' }} className='p-44'>
          <LinearProgress />
        </Box>
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={400}
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
      )}
    </div>
  );
};

export default MesinStatus;
