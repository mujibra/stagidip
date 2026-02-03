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
// import { Navigate } from 'react-router-dom';
// const navigate = useNavigate();

const NumberCustomerOrders = props => {
  const useStyles = makeStyles(theme => ({
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
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = "Unauthorized!!";
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
    data.forEach(item => {
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

  const listData = [
    {
      id: 1,
      unit: 1200,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BCA',
    },
    {
      id: 2,
      unit: 1200,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BNI',
    },
    {
      id: 3,
      unit: 1300,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BRI',
    },
    {
      id: 4,
      unit: 1000,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'MANDIRI ',
    },
    {
      id: 5,
      unit: 1200,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BANK JATENG',
    },
    {
      id: 6,
      unit: 1200,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'OCBC NISP',
    },
    {
      id: 7,
      unit: 1300,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BJB',
    },
    {
      id: 8,
      unit: 1000,
      description: 'Jumlah Unit',
      imgUrl: '#',
      bank_desc: 'BTN',
    },
  ];

  return (
    <Card className={classes.root}>
      <Typography className="m-20 text-17 text-center" color="textSecondary">
        <b>Number Customer Orders</b>
      </Typography>
      {/* <Scrollbars autoHide className={clsx('w-full', classes.scrollbar)}> */}
      <CardContent>
        <List className="w-1 lg:w-auto mx-1">
          {combinedDatas.map(item => (
            <div key={item?.customer?.bank_desc}>
              <div className="flex flex-cols-2 justify-between  items-center mt-20">
                <div className="flex items-center justify-start">
                  <ListItemAvatar>
                    <Avatar alt={item?.customer?.bank_desc} />
                  </ListItemAvatar>
                  <p className="font-normal text-md">
                    {item?.customer?.bank_desc}
                  </p>
                </div>
                <div className="flex gap-6 items-center justify-end">
                  <p className="text-right flex font-semibold">
                    {item?.jumlah}
                  </p>
                  <p className="text-right flex">Machine</p>
                </div>
              </div>
            </div>
          ))}
        </List>
      </CardContent>
      {/* </Scrollbars> */}
    </Card>
  );
};

export default NumberCustomerOrders;
