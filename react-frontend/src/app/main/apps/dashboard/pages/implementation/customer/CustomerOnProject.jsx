/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
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
import { Card, Typography } from '@mui/material';
// import { Navigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.contrastText,
  },
  cardRoot: {
    padding: '0px',
    minWidth: '100%',
  },
}));
// const navigate = useNavigate();

const CustomerOnProject = props => {
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
      .then(res => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data?.data);
      })
      .catch(err => {
        setData([]);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
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

  // menampilkan data nama yang sama dihitung satu
  const countUniqueNames = () => {
    const uniqueNames = new Set(data.map(item => item?.customer?.bank_desc));
    return uniqueNames.size;
  };

  const uniqueNameCount = countUniqueNames();

  return (
    <div>
      <Card>
        <Typography
          className="w-auto m-20 mdtext-17 text-10 text-center"
          color="textSecondary"
        >
          <b>Customer on Project</b>
        </Typography>
        <Typography className="m-20 text-32 font-semibold text-center text-blue-600">
          <b>{uniqueNameCount}</b>
        </Typography>
        <Typography className="m-20 text-12 text-center" color="textSecondary">
          <b>Bank</b>
        </Typography>
      </Card>
    </div>
  );
};

export default CustomerOnProject;
