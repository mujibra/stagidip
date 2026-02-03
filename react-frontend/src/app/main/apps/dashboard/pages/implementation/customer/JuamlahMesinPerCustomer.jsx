/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));

export const JuamlahMesinPerCustomer = () => {
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken}`,
    },
  };

  const getData = async () => {
    const getUser = JSON.parse(localStorage.getItem('user_profile'));
    let userRoles;
    if (getUser) {
      userRoles = getUser[0]?.roles;
    }
    setLoading(true);
    const response = await axios
      .get(
        `${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}getJumlahMesinPerbulan/${null}/${null}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      )
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
  const [getGruping, setGetGruping] = useState({
    getBank: [],
    getBulan: [],
    getPeriode: [],
    totalMesin: [],
  });
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      if (data?.length !== 0) {
        data.forEach((items, index) => {
          getGruping?.getBank.push(items?.bank);
          getGruping?.getBulan.push(items?.bulan);
          getGruping?.getPeriode.push(items?.periode);
          getGruping?.totalMesin.push(items?.total_mesin);
        });
      }
      //   let results = orgs.reduce(function(results, org) {
      //     (results[org.id] = results[org.id] || []).push(org);
      //     return results;
      // }, {})
      setGetGruping({
        getBank: getGruping?.getBank.filter((c, index) => {
          return getGruping?.getBank.indexOf(c) === index;
        }),
        getBulan: getGruping?.getBulan.filter((c, index) => {
          return getGruping?.getBulan.indexOf(c) === index;
        }),
        getPeriode: getGruping?.getPeriode.filter((c, index) => {
          return getGruping?.getPeriode.indexOf(c) === index;
        }),
        totalMesin: getGruping?.totalMesin.filter((c, index) => {
          return getGruping?.totalMesin.indexOf(c) === index;
        }),
      });
    }
    return () => {
      isUnmout = true;
    };
  }, [data]);
  // console.log(getGruping, 'getGruping');
  const options = {
    xaxis: {
      categories: getGruping?.getBulan,
    },
  };
  const series = [
    {
      name: 'Bank Syariah Indonesia"',
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: 'Arta Jasa"',
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
    {
      name: 'series-3',
      data: getGruping?.totalMesin,
    },
    {
      name: 'series-3',
      data: getGruping?.totalMesin,
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="80%"
        height="400"
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
    </div>
  );
};
