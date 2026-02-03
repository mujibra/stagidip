/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import FileOpenIcon from '@mui/icons-material/FileOpen';
import SearchIcon from '@mui/icons-material/Search';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Navigate } from 'react-router-dom';
import HandleAddDetail from './action/HandleAddDetail';
import TableUserManagements from './TableUserManagements';

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

const UserManagenetsParents = (props) => {
  const user_info = JSON.parse(localStorage.getItem('user_profile'));
  const dispatch = useDispatch();
  const formatDateTahun = moment().format('YYYY');
  const formatDate = moment().format('YYYY-DD-MM');
  const getAccessToken = localStorage.getItem('access_token');
  const api = process.env.REACT_APP_API_URL_API_DATINDO_LOCAL;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpens = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // setOpen(true);

  const [data, setData] = useState([]);
  const [dataForm, setdataForm] = useState([]);

  // eslint-disable-next-line camelcase
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [roles, setroles] = useState('');
  const [status, setstatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [DataCustomer, setDataCustomer] = useState([]);
  const [loadingCustomer, setloadingCustomer] = useState(true);
  const [DataGudang, setDataGudang] = useState([]);
  const [loadingGudang, setloadingGudang] = useState(true);
  const [customer, setcustomer] = useState({
    id: null,
    name: '',
  });
  const [gudang, setgudang] = useState({
    id: null,
    name: '',
  });
  // console.log(customer, 'customer')

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

  const body = {
    name,
    password,
    email,
    roles,
    id_customer: customer?.name === '' ? null : customer,
    id_gudang: gudang?.name === '' ? null : gudang,
    status,
  };
  // console.log(body, 'body');
  const setBody = {
    setname,
    setpassword,
    setemail,
    setroles,
    setcustomer,
    setstatus,
    setgudang,
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-user/`, {
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
  // console.log(data, 'data');

  const HandleSubmit = async (event) => {
    setLoading(true);
    const isUnmout = false;
    event.preventDefault();
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}register/`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        // console.log('respnse', res);
        // handleLogout();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'User Successfully Added', // text or html
            autoHideDuration: 6000, // ms
            anchorOrigin: {
              vertical: 'top', // top bottom
              horizontal: 'center', // left center right
            },
            variant: 'success', // success error info warning null
          })
        );
        getData();
        setname('');
        setpassword('');
        setemail('');
        setroles('');
        // setstatus('');
        handleClose();
        <Navigate to="/apps/registration/warehouse" replace />;
        // navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
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
        console.log(err, 'err');
      });
  };

  const getDataListGudang = async () => {
    setloadingGudang(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-gudang`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setDataGudang(res?.data?.data);
        setloadingGudang(false);
      })
      .catch((err) => {
        setloadingGudang(false);
        setDataGudang([]);
        console.log(err);
        const errStatus = err.response.status;
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
          messages = 'Bad Request!!';
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
      });
  };
  const getDataListCustomer = async () => {
    setloadingCustomer(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_DATINDO_LOCAL}master-customer`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then((res) => {
        setDataCustomer(res?.data?.data);
        setloadingCustomer(false);
      })
      .catch((err) => {
        setloadingCustomer(false);
        setDataCustomer([]);
        console.log(err);
        const errStatus = err.response.status;
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
          messages = 'Bad Request!!';
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
      });
  };

  useEffect(() => {
    getDataListCustomer();
    getDataListGudang();
  }, []);

  // console.log('dataxx', data);
  return (
    <div>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-72 sm:min-h-72',
        }}
        header={
          <div>
            <div className="flex pt-10 flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="flex items-left mt-20 sm:mb-12 flex-col" color="inherit">
                    <Typography className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xl" variant="h3">
                      REGISTRATION - User Managements
                    </Typography>
                    <Typography className="sm:font-xl sm:flex mx-0 sm:mx-12 text-xs" variant="h5">
                      User List
                    </Typography>
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        }
        contentToolbar={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
              {user_info[0].roles === 'SUPER_ADMIN' ||
              user_info[0].roles === 'ADMIN' ||
              user_info[0].roles === 'SUPERVISOR' ? (
                <div>
                  <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                    <Button variant="contained" onClick={handleClickOpens}>
                      <AddCircleOutlineIcon className="mr-2" />
                      <div className="hidden md:contents">Add New User</div>
                    </Button>
                  </FuseAnimate>
                </div>
              ) : (
                ''
              )}
              <div className="ml-10 hidden">
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <TextField
                    className="mb-10"
                    id="standard-textarea"
                    // label="Seacrh Machine"
                    placeholder="Search..."
                    // multiline
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FuseAnimate>
              </div>
            </div>
            <Dialog
              maxWidth="xl"
              // maxWidth="lg"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Add New User Login</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <HandleAddDetail
                    loading={loading}
                    body={body}
                    DataCustomer={DataCustomer}
                    loadingCustomer={loadingCustomer}
                    DataGudang={DataGudang}
                    loadingGudang={loadingGudang}
                    setBody={setBody}
                    HandleSubmit={HandleSubmit}
                    handleClose={handleClose}
                  />
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideLeftIn" delay={100}>
            <div className="p-16 sm:p-24 max-w-full items-left">
              <div>
                <TableUserManagements
                  body={body}
                  setBody={setBody}
                  setLoading={setLoading}
                  loading={loading}
                  data={data}
                  setData={setData}
                  getData={getData}
                  handleClose={handleClose}
                  DataGudang={DataGudang}
                  loadingGudang={loadingGudang}
                />
              </div>
            </div>
          </FuseAnimate>
        }
        // innerScroll
      />
    </div>
  );
};

export default UserManagenetsParents;
