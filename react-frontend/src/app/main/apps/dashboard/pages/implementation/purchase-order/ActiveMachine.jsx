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

const ActiveMachine = (props) => {
  // const dispatch = useDispatch();
  // const formatDateTahun = moment().format('YYYY');
  // const formatDate = moment().format('YYYY-DD-MM');
  // const getAccessToken = localStorage.getItem('access_token');
  // const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  // const classes = useStyles();

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState();

  // useEffect(() => {
  //   if (getAccessToken) {
  //     setToken(getAccessToken);
  //   }
  // }, [token]);

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${getAccessToken}`,
  //   },
  // };

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

  // const getData = async () => {
  //   setLoading(true);
  //   const response = await axios
  //     .get(`${api}bacth`, {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       setData(res?.data?.data);
  //       setLoading(false);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       setData([]);
  //       const errStatus = err.response.status;
  //       const errMessage = err.response.data.message;
  //       let messages = '';
  //       if (errStatus === 401) {
  //         messages = "Unauthorized!!";
  // window.location.href = '/login';
  // handleLogout();
  //       } else if (errStatus === 500) {
  //         messages = 'Server Error!!';
  //       } else if (errStatus === 404) {
  //         messages = 'Not Found Error!!!';
  //       } else if (errStatus === 408) {
  //         messages = 'TimeOut Error!!';
  //       } else if (errStatus === 400) {
  //         messages = errMessage;
  //       } else {
  //         messages = 'Something Wrong!!';
  //       }
  //       dispatch(
  //         showMessage({
  //           message: messages,
  //           autoHideDuration: 2000,
  //           anchorOrigin: {
  //             vertical: 'top',
  //             horizontal: 'center',
  //           },
  //           variant: 'error',
  //         })
  //       );
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   let isUnmout = false;
  //   if (!isUnmout) {
  //     getData();
  //   }
  //   return () => {
  //     isUnmout = true;
  //   };
  // }, []);

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
      labels: ['New Machine', 'Old Machine'],
    },
  });

  return (
    <div className="donut text-sm">
      <Chart options={state.options} series={state.series} type="donut" width="70%" height="300" />
    </div>
  );
};

export default ActiveMachine;
